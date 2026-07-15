import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/AdminLoginForm";
import { adminAuthIsConfigured, isAdminAuthenticated } from "@/lib/adminAuth";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");

  return (
    <main className="page-wrap relative flex min-h-screen items-center overflow-hidden px-4 py-20 text-white sm:px-8">
      <div className="page-overlay" />
      <div className="page-container w-full max-w-md">
        <div className="rounded-[32px] border border-white/12 bg-[#0d0d0d]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-9">
          <p className="eyebrow">Private studio</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">The quiet side of the archive.</h1>
          <p className="mt-4 text-sm leading-6 text-white/58">Orders, photographs and deliveries. Nicely out of public view.</p>
          <AdminLoginForm configured={adminAuthIsConfigured()} />
        </div>
      </div>
    </main>
  );
}
