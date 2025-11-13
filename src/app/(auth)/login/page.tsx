import { redirect } from 'next/navigation';
import { getAdminAuth } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import AdminLoginForm from '@/components/forms/AdminLoginForm';

export default async function LoginPage() {
  const staff = await getAdminAuth();
  if (staff) {
    redirect('/admin/dashboard');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#171212] mb-2">DemoGame88</h1>
          <p className="text-[28px] font-bold text-[#171212]">Welcome back</p>
        </div>

        <Card className="border border-[#e5dbdb] shadow-lg">
          <CardHeader>
            <CardDescription className="text-center text-base">
              Login to your admin account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminLoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
