'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setAdminAuth } from '@/store/slices/adminAuthSlice';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Staff {
  id: number;
  name: string;
  username: string;
  status: 'ACTIVE' | 'INACTIVE';
  is_locked: boolean;
  created_at: string;
  updated_at: string;
}

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  staff: Staff;
}

export default function AdminDashboardLayout({ children, staff }: AdminDashboardLayoutProps) {
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync server-fetched staff with Redux store
  useEffect(() => {
    if (staff) {
      dispatch(setAdminAuth(staff));
    }
  }, [staff, dispatch]);

  // Auto-open sidebar on desktop, auto-close on mobile
  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex transition-colors duration-300">
      {/* Desktop Sidebar - Slide animation */}
      {isDesktop && (
        <div
          className={`transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 border-r border-[#e8eaf6] dark:border-gray-700 ${
            sidebarOpen ? 'w-[230px]' : 'w-0'
          } overflow-hidden`}
        >
          <Sidebar className="w-[230px] h-full" />
        </div>
      )}

      {/* Mobile Sidebar - Overlay (Sheet) */}
      {!isDesktop && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-[230px] p-0">
            <Sidebar className="h-full" onNavigate={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-[#e0e0e0] dark:border-gray-700 shadow-sm h-[85px] flex items-center px-4 transition-colors duration-300">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 mr-4"
          >
            <Menu className="w-5 h-5 dark:text-gray-300" />
          </Button>
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg text-[#171212] dark:text-white">DemoGame88</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
