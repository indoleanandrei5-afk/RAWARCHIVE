import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Plain-English terms for RAW ARCHIVE PHOTOS editing services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <PolicyPage eyebrow="Terms" title="The useful kind of small print." introduction="These terms explain what you are buying, what I need from you, and what happens when real life ignores the schedule. Plain English seemed more appropriate than seventeen pages of throat-clearing." sections={[
    { title: "The service", paragraphs: ["RAW ARCHIVE provides manual photo editing and retouching based on the selected package and the notes included with your order. Typical work includes colour, exposure, contrast, crop, cleanup, and natural retouching within the boundaries described on the Services page.", "RAW ARCHIVE does not use generative AI or AI retouching workflows. It also does not fabricate people, places, or details that were not in the photograph."] },
    { title: "What you send", paragraphs: ["You confirm that you own the photographs or have permission to upload them and request editing. Do not upload illegal material or anything that violates another person’s rights or reasonable expectation of privacy.", "Please send the best available originals and clear notes. A small or heavily compressed source cannot become a true high-resolution original through optimism alone."] },
    { title: "Timing and delivery", paragraphs: ["Most orders are delivered within 2–3 business days, depending on volume and complexity. This is a target, not a guarantee. If a delay becomes likely, I will contact you using the email supplied at checkout.", "Finished files are delivered through email download links. You are responsible for downloading and backing them up after delivery."] },
    { title: "Payment and revisions", paragraphs: ["Payment is due before work begins and is processed securely by Stripe. If the delivered edit clearly misses the written brief or contains a technical mistake, contact me promptly and I will review it fairly.", "A new creative direction after delivery may count as additional work. I will tell you before charging anything; surprise invoices are not a personality trait I am trying to develop."] },
    { title: "Responsibility", paragraphs: ["RAW ARCHIVE will handle files with reasonable care, but you should keep your own originals and backups. Liability is limited to the amount paid for the affected order to the extent permitted by law. Nothing here removes consumer rights that cannot legally be excluded."] },
  ]} />;
}
