import { requireAdminAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, Activity } from 'lucide-react';

export default async function AdminDashboardPage() {
  const staff = await requireAdminAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#171212] dark:text-white">
        Welcome back, {staff.username}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-[#e5dbdb] dark:border-gray-700 dark:bg-gray-800 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#171212] dark:text-white">
              Total Staff
            </CardTitle>
            <Users className="h-4 w-4 text-[#8c5e5e] dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171212] dark:text-white">0</div>
            <p className="text-xs text-[#8c5e5e] dark:text-gray-400">Active members</p>
          </CardContent>
        </Card>

        <Card className="border border-[#e5dbdb] dark:border-gray-700 dark:bg-gray-800 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#171212] dark:text-white">
              New This Month
            </CardTitle>
            <UserPlus className="h-4 w-4 text-[#8c5e5e] dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171212] dark:text-white">0</div>
            <p className="text-xs text-[#8c5e5e] dark:text-gray-400">Joined recently</p>
          </CardContent>
        </Card>

        <Card className="border border-[#e5dbdb] dark:border-gray-700 dark:bg-gray-800 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#171212] dark:text-white">
              Activity
            </CardTitle>
            <Activity className="h-4 w-4 text-[#8c5e5e] dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171212] dark:text-white">100%</div>
            <p className="text-xs text-[#8c5e5e] dark:text-gray-400">System uptime</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800">✅ Login successful! Using mock data.</p>
        <p className="text-xs text-green-600 mt-2">
          Staff: {staff.name} (ID: {staff.id}) | Status: {staff.status}
        </p>
      </div>
    </div>
  );
}
