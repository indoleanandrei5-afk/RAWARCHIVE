import AdminDashboard from "@/components/AdminDashboard";
import { requireAdmin } from "@/lib/adminAuth";

export default async function AdminPage() {
  await requireAdmin();
  return <AdminDashboard />;
}
