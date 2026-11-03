import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { SITE_PAGES } from "@/components/SitePages";

type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SITE_PAGES).map((page) => ({ page }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return { title: `${SITE_PAGES[page]?.title ?? "Page"} | One Sky` };
}

export default async function SitePageRoute({ params }: Props) {
  const { page } = await params;
  const content = SITE_PAGES[page];
  if (!content) notFound();

  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} intro={content.intro}>
      {content.body}
    </PageShell>
  );
}
