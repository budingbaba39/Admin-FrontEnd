import { redirect } from 'next/navigation';
import { getAdminAuth } from '@/lib/auth';
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const staff = await getAdminAuth();

  if (!staff) {
    redirect('/login');
  }

  return <AdminDashboardLayout staff={staff}>{children}</AdminDashboardLayout>;
}
