"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { Field } from "@/content/site";

const EASE = [0.2, 0.8, 0.2, 1] as const;

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Card({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map(([question, answer], i) => (
        <Reveal key={question} className="faq-item" delay={i * 0.04}>
          <h3>
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
              {question}
              <motion.span className="faq-icon" aria-hidden="true" animate={{ rotate: open === i ? 45 : 0 }}>+</motion.span>
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div className="faq-answer" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.28 }}>
                <p>{answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      ))}
    </div>
  );
}

// Browser storage can be blocked, so a failed read or write never breaks the page.
function readList<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}

function addToList(key: string, item: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify([...readList(key), item]));
    return true;
  } catch {
    return false;
  }
}

const DEMO_NOTE = "Demo form: messages are saved in this browser only until the form is connected to One Sky’s email or database.";

export function LeadForm({ id, submit, fields }: { id: string; submit: string; fields: Field[] }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addToList(`one-sky-form-${id}`, { ...Object.fromEntries(new FormData(e.currentTarget)), at: new Date().toISOString() });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="form-card" role="status">
        <h2>Thank you!</h2>
        <p>Your details are saved in this browser. Nothing has been sent to One Sky yet, because this demo form isn’t connected to email or a database.</p>
        <button type="button" className="sec-btn" onClick={() => setSent(false)}>Send another</button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      {fields.map((f) => (
        <label key={f.name} className="field">
          <span>{f.label}{f.optional && <small> (optional)</small>}</span>
          {f.type === "select" ? (
            <select name={f.name} required={!f.optional} defaultValue="">
              <option value="" disabled={!f.optional}>Choose one</option>
              {f.options?.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : f.type === "textarea" ? (
            <textarea name={f.name} rows={4} required={!f.optional} />
          ) : (
            <input name={f.name} type={f.type ?? "text"} min={f.type === "number" ? 1 : undefined} required={!f.optional} />
          )}
          {f.hint && <small>{f.hint}</small>}
        </label>
      ))}
      <button type="submit" className="sec-btn">{submit}</button>
      <p className="fine">{DEMO_NOTE}</p>
    </form>
  );
}

type Review = { role: string; rating: number; name: string; text: string; at: string };
const REVIEWS_KEY = "one-sky-reviews";

export function ReviewsBoard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setReviews(readList<Review>(REVIEWS_KEY));
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const review: Review = {
      role: String(data.get("role")),
      rating: Number(data.get("rating")),
      name: String(data.get("name") ?? ""),
      text: String(data.get("text") ?? ""),
      at: new Date().toISOString(),
    };
    addToList(REVIEWS_KEY, review);
    setReviews((list) => [...list, review]);
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <>
      <Reveal className="review-list">
        <h2>What parents and teachers say</h2>
        {reviews.length === 0 ? (
          <p className="lead">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <article key={r.at} className="card">
              <p aria-label={`${r.rating} out of 5 stars`} className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
              <p>{r.text}</p>
              <p className="fine">{r.name || "Anonymous"} · {r.role} · Saved in this browser only</p>
            </article>
          ))
        )}
        <p className="fine">Demo: reviews are stored in this browser only. Connect a database before launch so every review reaches the One Sky team.</p>
      </Reveal>
      <form className="form-card" onSubmit={onSubmit}>
        <h2>Share your experience</h2>
        <fieldset className="field">
          <legend>I am a…</legend>
          {["Parent / guardian", "Teacher"].map((role) => (
            <label key={role} className="choice"><input type="radio" name="role" value={role} required />{role}</label>
          ))}
        </fieldset>
        <fieldset className="field">
          <legend>Your rating</legend>
          <div className="star-row">
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="choice"><input type="radio" name="rating" value={n} required />{n} ★</label>
            ))}
          </div>
        </fieldset>
        <label className="field">
          <span>Your first name <small>(optional, shown with your review)</small></span>
          <input name="name" maxLength={30} autoComplete="given-name" />
        </label>
        <label className="field">
          <span>Your feedback</span>
          <textarea name="text" rows={5} maxLength={1000} required />
          <small>Tell us what worked and what could be better. Please don’t include a child’s name, school, photo or contact details.</small>
        </label>
        <label className="choice"><input type="checkbox" required />My review does not include any child’s personal details.</label>
        <button type="submit" className="sec-btn">Submit review</button>
        {sent && <p className="fine" role="status">Thank you! Your review is saved in this browser.</p>}
      </form>
    </>
  );
}

type Order = { id: string; course: string; slug: string; learner: string; amount: number; at: string };
const ORDERS_KEY = "one-sky-orders";

export function EnrolForm({ slug, course, price }: { slug: string; course: string; price: number }) {
  const router = useRouter();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const order: Order = {
      id: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      course,
      slug,
      learner: String(new FormData(e.currentTarget).get("learner")),
      amount: price,
      at: new Date().toISOString(),
    };
    addToList(ORDERS_KEY, order);
    router.push("/dashboard");
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <label className="field">
        <span>Learner’s name</span>
        <input name="learner" required maxLength={60} />
        <small>Saved in this browser only, to show whose course it is.</small>
      </label>
      <label className="choice"><input type="checkbox" required />I am this child’s parent or guardian.</label>
      <p className="price">₹{price}</p>
      <button type="submit" className="sec-btn">Complete demo enrolment</button>
      <p className="fine">Demo: online payment is not live, so no money is taken.</p>
    </form>
  );
}

export function Dashboard() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    setOrders(readList<Order>(ORDERS_KEY));
  }, []);

  if (!orders) return <p className="lead">Loading…</p>;
  if (orders.length === 0) {
    return (
      <div className="form-card">
        <h2>No courses yet</h2>
        <p>Courses you enrol in on this device will appear here.</p>
        <Link className="sec-btn" href="/courses/ai-foundation">Explore the Course</Link>
      </div>
    );
  }

  return (
    <div className="card-grid">
      {orders.map((o) => (
        <Card key={o.id} className="card">
          <h3>{o.course}</h3>
          <p>Learner: {o.learner}</p>
          <p className="fine">Order {o.id} · ₹{o.amount} (demo) · {new Date(o.at).toLocaleDateString("en-IN")}</p>
          <Link className="text-link" href={`/courses/${o.slug}`}>View course details →</Link>
        </Card>
      ))}
    </div>
  );
}
