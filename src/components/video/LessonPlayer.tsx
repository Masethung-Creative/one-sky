"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./LessonPlayer.module.css";

/*
 * A video player for lesson previews.
 * It has play/pause, a seek bar, volume, captions (CC) with a language menu,
 * a settings menu for speed and quality, fullscreen and keyboard shortcuts.
 *
 * Keyboard: Space or K plays and pauses, the arrows skip 5 seconds,
 * M mutes, C turns English captions on and off, F goes fullscreen.
 */

export type VideoSource = { height: number; src: string };
export type CaptionTrack = { lang: string; label: string; src: string };

type Props = {
  title: string;
  poster: string;
  // Largest first, for example 1080p, 720p, 480p.
  sources: VideoSource[];
  captions: CaptionTrack[];
};

type Menu = null | "captions" | "settings" | "speed" | "quality";

const SPEEDS = [0.75, 1, 1.25, 1.5];
const HIDE_CONTROLS_AFTER = 2500;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

// Picks a size that suits the screen and the connection, so slow phones don't stutter.
function pickAutoHeight(sources: VideoSource[], playerWidth: number) {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  const smallest = sources[sources.length - 1].height;
  if (connection?.saveData || /2g|3g/.test(connection?.effectiveType ?? "")) return smallest;
  // The smallest video that is at least 1.5 times as wide as the player looks sharp without wasting data.
  const needed = playerWidth * Math.min(window.devicePixelRatio || 1, 2) * 1.5;
  const sharp = [...sources].reverse().find((source) => (source.height * 16) / 9 >= needed);
  return sharp ? sharp.height : sources[0].height;
}

export default function LessonPlayer({ title, poster, sources, captions }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef(0);
  const shownHeight = useRef(0);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState<"auto" | number>("auto");
  const [autoHeight, setAutoHeight] = useState(0);
  const [captionLang, setCaptionLang] = useState<string | null>(null);
  const [cue, setCue] = useState("");
  const [menu, setMenu] = useState<Menu>(null);
  const [controlsShown, setControlsShown] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  // Loads the right size once the player knows how wide it is. Only a small header is fetched until play.
  useEffect(() => {
    const el = video.current;
    if (!el || !box.current) return;
    const height = pickAutoHeight(sources, box.current.offsetWidth);
    shownHeight.current = height;
    el.src = sources.find((source) => source.height === height)!.src;
    el.preload = "metadata";
  }, [sources]);

  // Captions are drawn by the player (not the browser) so they sit above the controls and match the site.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const tracks = Array.from(el.textTracks);
    const onCueChange = (event: Event) => {
      const track = event.target as TextTrack;
      if (track.mode !== "hidden") return;
      const active = Array.from(track.activeCues ?? []) as VTTCue[];
      setCue(active.map((c) => c.text).join("\n"));
    };
    tracks.forEach((track) => {
      track.mode = "disabled";
      track.addEventListener("cuechange", onCueChange);
    });
    // iPhone fullscreen uses the system player, so its own captions take over there.
    const onNativeFullscreen = (showing: boolean) => () => {
      tracks.forEach((track) => {
        if (track.mode !== "disabled") track.mode = showing ? "showing" : "hidden";
      });
    };
    const begin = onNativeFullscreen(true);
    const end = onNativeFullscreen(false);
    el.addEventListener("webkitbeginfullscreen", begin);
    el.addEventListener("webkitendfullscreen", end);
    return () => {
      tracks.forEach((track) => track.removeEventListener("cuechange", onCueChange));
      el.removeEventListener("webkitbeginfullscreen", begin);
      el.removeEventListener("webkitendfullscreen", end);
    };
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === box.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // The preview sits in a scrolling scene. Once the visitor scrolls on and it hides, the video pauses.
  useEffect(() => {
    const onScroll = () => {
      const el = video.current;
      if (el && !el.paused && box.current && getComputedStyle(box.current).visibility === "hidden") el.pause();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menus close on a click outside the player or on Escape.
  useEffect(() => {
    if (!menu) return;
    const onDown = (event: PointerEvent) => {
      if (!box.current?.contains(event.target as Node)) setMenu(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [menu]);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  function wakeControls() {
    setControlsShown(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (video.current && !video.current.paused) setControlsShown(false);
    }, HIDE_CONTROLS_AFTER);
  }

  function togglePlay() {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setStarted(true);
    } else {
      el.pause();
    }
    wakeControls();
  }

  function seekBy(seconds: number) {
    const el = video.current;
    if (!el) return;
    el.currentTime = Math.min(Math.max(el.currentTime + seconds, 0), el.duration || 0);
    wakeControls();
  }

  function toggleMute() {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    if (!el.muted && el.volume === 0) el.volume = 0.5;
  }

  function chooseCaptions(lang: string | null) {
    const el = video.current;
    if (!el) return;
    Array.from(el.textTracks).forEach((track) => {
      track.mode = track.language === lang ? "hidden" : "disabled";
    });
    setCaptionLang(lang);
    setCue("");
    setMenu(null);
  }

  function chooseSpeed(value: number) {
    if (video.current) video.current.playbackRate = value;
    setSpeed(value);
    setMenu("settings");
  }

  // Swaps to another size and carries on from the same moment.
  function chooseQuality(value: "auto" | number) {
    const el = video.current;
    setQuality(value);
    setMenu("settings");
    if (!el || !box.current) return;
    const height = value === "auto" ? pickAutoHeight(sources, box.current.offsetWidth) : value;
    if (height === shownHeight.current) return;
    shownHeight.current = height;
    const at = el.currentTime;
    const wasPlaying = !el.paused;
    el.src = sources.find((source) => source.height === height)!.src;
    el.addEventListener("loadedmetadata", () => {
      el.currentTime = at;
      el.playbackRate = speed;
      if (wasPlaying) el.play();
    }, { once: true });
  }

  function toggleFullscreen() {
    const el = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (box.current?.requestFullscreen) box.current.requestFullscreen();
    else el?.webkitEnterFullscreen?.();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if ((event.target as HTMLElement).closest("[role='menu']")) return;
    const key = event.key.toLowerCase();
    if (key === " " || key === "k") {
      if ((event.target as HTMLElement).tagName === "BUTTON" && key === " ") return;
      event.preventDefault();
      togglePlay();
    } else if (key === "arrowleft" && (event.target as HTMLElement).tagName !== "INPUT") seekBy(-5);
    else if (key === "arrowright" && (event.target as HTMLElement).tagName !== "INPUT") seekBy(5);
    else if (key === "m") toggleMute();
    else if (key === "c" && captions[0]) chooseCaptions(captionLang ? null : captions[0].lang);
    else if (key === "f") toggleFullscreen();
    else if (key === "escape") setMenu(null);
  }

  const qualityLabel = quality === "auto" ? `Auto${autoHeight ? ` (${autoHeight}p)` : ""}` : `${quality}p`;
  const played = duration ? (time / duration) * 100 : 0;
  const loaded = duration ? (buffered / duration) * 100 : 0;
  // Before the first play only the cover and the big play button show.
  const showControls = started && (controlsShown || !playing || menu !== null);

  return (
    <div
      ref={box}
      className={`${styles.player} ${showControls ? styles.awake : ""} ${fullscreen ? styles.isFullscreen : ""}`}
      onPointerMove={wakeControls}
      onKeyDown={onKeyDown}
    >
      <video
        ref={video}
        className={styles.video}
        poster={poster}
        preload="none"
        playsInline
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => { setPlaying(false); setControlsShown(true); }}
        onEnded={() => setControlsShown(true)}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onCanPlay={() => setWaiting(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => { setDuration(e.currentTarget.duration); setAutoHeight(shownHeight.current); }}
        onProgress={(e) => {
          const b = e.currentTarget.buffered;
          if (b.length) setBuffered(b.end(b.length - 1));
        }}
        onVolumeChange={(e) => { setMuted(e.currentTarget.muted); setVolume(e.currentTarget.volume); }}
      >
        {captions.map((track) => (
          <track key={track.lang} kind="subtitles" srcLang={track.lang} label={track.label} src={track.src} />
        ))}
      </video>

      {!started && (
        <div className={styles.cover} aria-hidden="true">
          <span className={styles.tag}>Free preview</span>
          <span className={styles.coverTitle}>{title}</span>
        </div>
      )}

      {(!playing || !started) && (
        <button type="button" className={styles.bigPlay} onClick={togglePlay} aria-label={`Play ${title}`}>
          <Icon name="play" />
        </button>
      )}

      {waiting && playing && <span className={styles.spinner} role="status" aria-label="Loading" />}

      {cue && <div className={styles.caption} aria-live="off"><span>{cue}</span></div>}

      <div className={styles.controls} translate="no">
        <input
          className={styles.seek}
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={time}
          aria-label="Seek"
          aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
          style={{ "--played": `${played}%`, "--loaded": `${loaded}%` } as React.CSSProperties}
          onChange={(e) => {
            if (video.current) video.current.currentTime = Number(e.target.value);
            setTime(Number(e.target.value));
            wakeControls();
          }}
        />

        <div className={styles.bar}>
          <button type="button" className={styles.button} onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
            <Icon name={playing ? "pause" : "play"} />
          </button>
          <button type="button" className={`${styles.button} ${styles.hideSmall}`} onClick={() => seekBy(-10)} aria-label="Back 10 seconds">
            <Icon name="back10" />
          </button>

          <div className={styles.volume}>
            <button type="button" className={styles.button} onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
              <Icon name={muted || volume === 0 ? "muted" : "volume"} />
            </button>
            <input
              className={styles.volumeSlider}
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              aria-label="Volume"
              style={{ "--played": `${(muted ? 0 : volume) * 100}%` } as React.CSSProperties}
              onChange={(e) => {
                const el = video.current;
                if (!el) return;
                el.volume = Number(e.target.value);
                el.muted = el.volume === 0;
              }}
            />
          </div>

          <span className={styles.time}>
            {formatTime(time)} / {formatTime(duration)}
          </span>

          <span className={styles.spacer} />

          {captions.length > 0 && (
            <div className={styles.menuWrap}>
              <button
                type="button"
                className={`${styles.button} ${captionLang ? styles.on : ""}`}
                onClick={() => setMenu(menu === "captions" ? null : "captions")}
                aria-label="Captions"
                aria-haspopup="menu"
                aria-expanded={menu === "captions"}
              >
                <Icon name="cc" />
              </button>
              {menu === "captions" && (
                <MenuPanel title="Captions">
                  <MenuOption checked={captionLang === null} onClick={() => chooseCaptions(null)}>Off</MenuOption>
                  {captions.map((track) => (
                    <MenuOption key={track.lang} checked={captionLang === track.lang} onClick={() => chooseCaptions(track.lang)}>
                      {track.label}
                    </MenuOption>
                  ))}
                </MenuPanel>
              )}
            </div>
          )}

          <div className={styles.menuWrap}>
            <button
              type="button"
              className={`${styles.button} ${menu && menu !== "captions" ? styles.turned : ""}`}
              onClick={() => setMenu(menu && menu !== "captions" ? null : "settings")}
              aria-label="Settings"
              aria-haspopup="menu"
              aria-expanded={menu !== null && menu !== "captions"}
            >
              <Icon name="settings" />
            </button>
            {menu === "settings" && (
              <MenuPanel title="Settings">
                <MenuLink label="Speed" value={speed === 1 ? "Normal" : `${speed}×`} onClick={() => setMenu("speed")} />
                <MenuLink label="Quality" value={qualityLabel} onClick={() => setMenu("quality")} />
                {captions.length > 0 && (
                  <MenuLink
                    label="Captions"
                    value={captions.find((t) => t.lang === captionLang)?.label ?? "Off"}
                    onClick={() => setMenu("captions")}
                  />
                )}
              </MenuPanel>
            )}
            {menu === "speed" && (
              <MenuPanel title="Speed" onBack={() => setMenu("settings")}>
                {SPEEDS.map((value) => (
                  <MenuOption key={value} checked={speed === value} onClick={() => chooseSpeed(value)}>
                    {value === 1 ? "Normal" : `${value}×`}
                  </MenuOption>
                ))}
              </MenuPanel>
            )}
            {menu === "quality" && (
              <MenuPanel title="Quality" onBack={() => setMenu("settings")}>
                <MenuOption checked={quality === "auto"} onClick={() => chooseQuality("auto")}>Auto</MenuOption>
                {sources.map((source) => (
                  <MenuOption key={source.height} checked={quality === source.height} onClick={() => chooseQuality(source.height)}>
                    {source.height}p{source.height >= 1080 ? " HD" : ""}
                  </MenuOption>
                ))}
              </MenuPanel>
            )}
          </div>

          <button type="button" className={styles.button} onClick={toggleFullscreen} aria-label={fullscreen ? "Exit full screen" : "Full screen"}>
            <Icon name={fullscreen ? "shrink" : "expand"} />
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuPanel({ title, onBack, children }: { title: string; onBack?: () => void; children: ReactNode }) {
  return (
    <div className={styles.menu} role="menu" aria-label={title}>
      <div className={styles.menuHead}>
        {onBack ? (
          <button type="button" className={styles.menuBack} onClick={onBack} aria-label="Back to settings">
            <Icon name="back" /> {title}
          </button>
        ) : (
          title
        )}
      </div>
      {children}
    </div>
  );
}

function MenuOption({ checked, onClick, children }: { checked: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" role="menuitemradio" aria-checked={checked} className={styles.menuItem} onClick={onClick}>
      <span className={styles.check}>{checked && <Icon name="check" />}</span>
      {children}
    </button>
  );
}

function MenuLink({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return (
    <button type="button" role="menuitem" className={styles.menuItem} onClick={onClick}>
      <span className={styles.menuLabel}>{label}</span>
      <span className={styles.menuValue}>{value}</span>
      <Icon name="next" />
    </button>
  );
}

const ICONS: Record<string, string> = {
  play: "M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z",
  pause: "M7 5h3.5v14H7zM13.5 5H17v14h-3.5z",
  back10: "M12 5V2L7 6l5 4V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z M10.6 16.5h-1.2v-3.6l-1 .3v-1l1.9-.6h.3z M15.4 14.6c0 1.3-.6 2-1.6 2s-1.6-.7-1.6-2v-.7c0-1.3.6-2 1.6-2s1.6.7 1.6 2zm-1.2-.8c0-.7-.2-1-.5-1s-.5.3-.5 1v.9c0 .7.2 1 .5 1s.5-.3.5-1z",
  volume: "M4 9v6h4l5 4V5L8 9zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z",
  muted: "M4 9v6h4l5 4V5L8 9zm16.6 3 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4z",
  cc: "M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1zm7 0h-1.5v-.5h-2v3h2V13H18v1a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1z",
  settings: "M19.4 13a7.6 7.6 0 0 0 0-2l2.1-1.6a.5.5 0 0 0 .1-.6l-2-3.5a.5.5 0 0 0-.6-.2l-2.5 1a7.4 7.4 0 0 0-1.7-1l-.4-2.6a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.4l-.4 2.7a7.4 7.4 0 0 0-1.7 1l-2.5-1a.5.5 0 0 0-.6.2l-2 3.5a.5.5 0 0 0 .1.6L4.6 11a7.6 7.6 0 0 0 0 2l-2.1 1.6a.5.5 0 0 0-.1.6l2 3.5a.5.5 0 0 0 .6.2l2.5-1a7.4 7.4 0 0 0 1.7 1l.4 2.7a.5.5 0 0 0 .5.4h4a.5.5 0 0 0 .5-.4l.4-2.7a7.4 7.4 0 0 0 1.7-1l2.5 1a.5.5 0 0 0 .6-.2l2-3.5a.5.5 0 0 0-.1-.6zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z",
  expand: "M4 4h6v2H6v4H4zm10 0h6v6h-2V6h-4zM4 14h2v4h4v2H4zm14 0h2v6h-6v-2h4z",
  shrink: "M8 4h2v6H4V8h4zm6 0h2v4h4v2h-6zM4 14h6v6H8v-4H4zm10 0h6v2h-4v4h-2z",
  check: "M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L21 7.5l-1.4-1.4z",
  next: "M9.3 6.7 10.7 5.3l6.7 6.7-6.7 6.7-1.4-1.4 5.3-5.3z",
  back: "M14.7 6.7 13.3 5.3 6.6 12l6.7 6.7 1.4-1.4L9.4 12z",
};

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor" fillRule="evenodd">
      <path d={ICONS[name]} />
    </svg>
  );
}
