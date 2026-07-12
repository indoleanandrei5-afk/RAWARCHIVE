import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact RAW ARCHIVE PHOTOS for professional hand-edited photo retouching and fast turnaround.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact RAW ARCHIVE PHOTOS",
    url: "https://rawarchive.vercel.app/contact",
    mainEntity: {
      "@type": "ProfessionalService",
      name: "RAW ARCHIVE PHOTOS",
      email: "andreiindo@icloud.com",
      sameAs: ["https://instagram.com/rawarchivephotos"],
    },
  };

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.45em] text-gray-500">Contact</p>
        <h1 className="mt-6 text-5xl font-semibold">Let’s talk about your next edit.</h1>
        <p className="mt-6 text-lg text-gray-300">
          Got a shoot, a brand refresh, or a batch of raw captures? Tell me what you need and I’ll make it look sharp.
        </p>

        <div className="mt-12 grid gap-8 rounded-[40px] border border-white/10 bg-white/5 p-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Email</p>
              <a href="mailto:andreiindo@icloud.com" className="mt-3 block text-lg font-semibold text-white underline">
                andreiindo@icloud.com
              </a>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Instagram</p>
              <a href="https://instagram.com/rawarchivephotos" target="_blank" rel="noreferrer" className="mt-3 block text-lg font-semibold text-white underline">
                @rawarchivephotos
              </a>
            </div>
          </div>

          <div className="rounded-4xl border border-white/10 bg-black/30 p-8">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Need something fast?</p>
            <p className="mt-4 text-lg text-gray-300">
              Upload your photos, complete payment, and include clear notes for how you want each image edited.
            </p>
            <p className="mt-6 text-sm text-gray-500">
              Use the notes field during payment to share style, tone, retouch level, and delivery priorities.
            </p>
            <a
              href="/upload"
              className="mt-10 inline-flex rounded-full border border-white/10 bg-white/10 px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:border-white/20 hover:bg-white/15"
            >
              Send photos over
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
