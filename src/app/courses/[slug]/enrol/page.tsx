import { notFound } from "next/navigation";
import { EnrolForm } from "@/components/pages/PageParts";
import PageShell from "@/components/layout/PageShell";
import { COURSES } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return COURSES.map(({ slug }) => ({ slug }));
}

export default async function EnrolPage({ params }: Props) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <PageShell eyebrow="Enrol" title={course.title} intro="A parent or guardian completes the enrolment.">
      <section className="sec">
        <div className="sec-inner narrow">
          <EnrolForm slug={course.slug} course={course.title} price={course.price} />
        </div>
      </section>
    </PageShell>
  );
}
