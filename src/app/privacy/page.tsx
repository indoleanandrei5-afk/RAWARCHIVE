import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How RAW ARCHIVE PHOTOS handles uploaded photographs and personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PolicyPage eyebrow="Privacy" title="Your photographs are not content inventory." introduction="I only collect what is needed to edit, deliver, and support your order. I do not sell personal information, and I never put a photograph in the portfolio without clear permission." sections={[
    { title: "What I collect", paragraphs: ["When you order, I receive your email address, uploaded photographs, filenames, editing notes, and your choice about social-media or portfolio use. Payment details are handled by Stripe; RAW ARCHIVE does not receive or store your full card number."] },
    { title: "What it is used for", paragraphs: ["Your information is used to process payment, edit the photographs, deliver the finished files, answer support questions, and keep a basic order record. Nothing more exciting—and that is a good thing.", "If you choose private use, the photographs are not shared publicly. If you grant permission, I may select finished work for the RAW ARCHIVE website or social channels; permission can be withdrawn by contacting me."] },
    { title: "Storage and deletion", paragraphs: ["Files and order details are kept only as long as reasonably needed to complete the work, deliver it, handle support, and meet payment or accounting obligations. Keep your own backup of both originals and finished files.", "You may ask for your personal information or uploaded files to be deleted. Some transaction records may need to remain where law or payment processing requires it."] },
    { title: "Services that help run the studio", paragraphs: ["RAW ARCHIVE uses service providers such as Stripe for payments, Cloudinary for file hosting, Resend for email, Vercel for hosting, and privacy-conscious site analytics or tag tools. Each provider processes only the information needed for its part of the service."] },
    { title: "Cookies and analytics", paragraphs: ["The site may use essential storage for the upload and order flow, plus analytics after consent where required. Analytics helps answer practical questions—such as which page confuses people—not who you are as a person."] },
  ]} />;
}
