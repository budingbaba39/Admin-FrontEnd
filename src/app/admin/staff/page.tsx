import { requireAdminAuth } from '@/lib/auth';
import StaffListClient from './StaffListClient';

export default async function StaffPage() {
  await requireAdminAuth();

  return <StaffListClient />;
}
