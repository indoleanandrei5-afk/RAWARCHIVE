import Link from "next/link";

type PolicySection = {
  title: string;
  paragraphs: string[];
};

type PolicyPageProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: PolicySection[];
};

export default function PolicyPage({ eyebrow, title, introduction, sections }: PolicyPageProps) {
  return (
    <main className="page-wrap relative overflow-hidden px-4 py-16 text-white sm:px-8 sm:py-24">
      <div className="page-overlay" />
      <article className="page-container max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-(--accent-strong)">{eyebrow}</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">{introduction}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gray-500">Last updated July 15, 2026</p>

        <div className="mt-12 divide-y divide-white/10 rounded-[32px] border border-white/10 bg-white/[0.045] px-5 sm:px-9">
          {sections.map((section) => (
            <section key={section.title} className="py-7 sm:py-9">
              <h2 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">{section.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-gray-300 sm:text-base">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-8">
          <p className="text-lg font-medium">Still unsure about something?</p>
          <p className="mt-2 leading-7 text-gray-400">Ask before you upload. I would rather answer a small question than hide it in small print.</p>
          <Link href="/contact" style={{ color: "#050505" }} className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-(--accent-soft)">Contact me</Link>
        </div>
      </article>
    </main>
  );
}
