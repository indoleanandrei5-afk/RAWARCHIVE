import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about RAW ARCHIVE PHOTOS and the hand-refined editing approach behind every delivered image.",
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return (
    <main className="min-h-screen bg-black px-4 py-16 text-white sm:p-10">
      <h1 className="text-4xl font-bold sm:text-6xl">About RAW ARCHIVE PHOTOS</h1>
      <p className="mt-5 max-w-3xl text-gray-300">RAW ARCHIVE PHOTOS is a boutique photo editing studio focused on cinematic refinement, balanced tone, and quietly premium visual storytelling.</p>
    </main>
  );
}
