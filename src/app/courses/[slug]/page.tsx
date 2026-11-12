import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, Reveal } from "@/components/pages/PageParts";
import PageShell from "@/components/layout/PageShell";
import { COURSES } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return COURSES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${COURSES.find((c) => c.slug === slug)?.title ?? "Course"} | One Sky` };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <PageShell eyebrow={course.tags} title={course.title} intro={course.intro}>
      <section className="sec">
        <div className="sec-inner course-grid">
          <div>
            <Reveal>
              <h2>What you’ll learn</h2>
              <ul className="outcomes spaced-block">
                {course.outcomes.map((text) => <li key={text}>{text}</li>)}
              </ul>
              <h2>What’s inside the course</h2>
              <p className="fine">{course.insideSummary}</p>
            </Reveal>
            <div className="card-stack">
              {course.parts.map(([icon, title, text, time], i) => (
                <Card key={title} className="card" delay={i * 0.04}>
                  <span className="card-icon" aria-hidden="true">{icon}</span>
                  <h3>{title} <small>{time}</small></h3>
                  <p>{text}</p>
                  {i === 0 && <ol className="ordered">{course.chapters.map((c) => <li key={c}>{c}</li>)}</ol>}
                </Card>
              ))}
            </div>
            <Reveal className="spaced-block">
              <h2>👨‍👩‍👧 For parents</h2>
              <p className="lead">{course.forParents}</p>
            </Reveal>
          </div>
          <Reveal className="course-card buy-card">
            <p className="price">₹{course.price}</p>
            <ul className="facts">
              {course.includes.map((text) => <li key={text}>{text}</li>)}
            </ul>
            <Link className="sec-btn" href={`/courses/${course.slug}/enrol`}>Enrol Now — ₹{course.price}</Link>
            <p className="fine">One-time payment. No sign-in needed.</p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
