import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "A clear refund policy for RAW ARCHIVE PHOTOS orders.",
  alternates: { canonical: "/refunds" },
};

export default function RefundsPage() {
  return <PolicyPage eyebrow="Refunds" title="Fair, clear, no scavenger hunt." introduction="Photo editing is a custom digital service, so refunds depend on whether the work has begun. If something has gone wrong, email me. A real conversation is usually faster than policy archaeology." sections={[
    { title: "Before editing begins", paragraphs: ["If you change your mind, contact me as soon as possible. If editing has not begun, I can normally cancel the order and issue a refund to the original payment method."] },
    { title: "After work begins", paragraphs: ["Once custom editing has started, the order is generally non-refundable because time has already been spent on your specific files. After finished files have been delivered, refunds are not normally available for a simple change of taste."] },
    { title: "If the result or delivery is wrong", paragraphs: ["If a finished file is missing, corrupted, technically incorrect, or clearly inconsistent with the written brief, contact me promptly with the order number and a short explanation. I will first correct or redeliver the work. If that is not reasonably possible, a partial or full refund may be offered."] },
    { title: "Duplicate or incorrect charges", paragraphs: ["Duplicate payments and confirmed billing errors are refunded in full. Please include the order number and the email used at checkout so I can find the payment without detective work."] },
    { title: "Refund timing", paragraphs: ["Approved refunds are sent to the original payment method through Stripe. Your bank or card provider controls how long the credit takes to appear, which is commonly several business days."] },
  ]} />;
}
