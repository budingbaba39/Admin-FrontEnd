'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleTheme } from '@/store/slices/themeSlice';
import { clearAdminAuth } from '@/store/slices/adminAuthSlice';
import { adminLogout } from '@/app/admin/logout/actions';

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export default function Sidebar({ className = '', onNavigate }: SidebarProps = {}) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector(state => state.theme);

  const handleNavClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  const handleLogout = async () => {
    // Clear Redux state immediately
    dispatch(clearAdminAuth());
    // Then clear cookies and redirect
    await adminLogout();
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { path: '/admin/staff', label: '9. STAFF', icon: Users },
    { path: '/admin/settings', label: '11. SETTINGS', icon: Settings },
  ];

  return (
    <aside
      className={`bg-white dark:bg-gray-900 border-r border-[#e8eaf6] dark:border-gray-700 flex flex-col transition-colors duration-300 ${className}`}
    >
      {/* Search */}
      <div className="p-4">
        <div className="bg-[#e8eaf6] dark:bg-gray-800 p-3 rounded-lg">
          <span className="text-[#5c6bc0] dark:text-gray-300 text-sm font-semibold uppercase tracking-[-0.14px]">
            Search...
          </span>
        </div>
      </div>

      {/* SMS Credit */}
      <div className="px-4 mb-4">
        <span className="text-[#3949ab] dark:text-gray-300 text-sm font-medium">
          SMS Credit: 0.00
        </span>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link key={item.path} href={item.path} onClick={handleNavClick}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-sm font-semibold uppercase tracking-[-0.14px] ${
                  isActive
                    ? 'bg-white dark:bg-gray-700 text-[#3949ab] dark:text-white'
                    : 'bg-white dark:bg-gray-900 text-[#3949ab] dark:text-gray-300 hover:bg-[#f0f0f0] dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-[#e8eaf6] dark:border-gray-700 p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-semibold uppercase tracking-[-0.14px] text-[#3949ab] dark:text-gray-300 hover:bg-[#f0f0f0] dark:hover:bg-gray-800"
        >
          HELP CENTER
        </Button>
        <div className="h-px bg-[#e8eaf6] dark:bg-gray-700 my-2" />
        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-semibold uppercase tracking-[-0.14px] text-[#3949ab] dark:text-gray-300 hover:bg-[#f0f0f0] dark:hover:bg-gray-800"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          LOG OUT
        </Button>

        {/* Night mode toggle */}
        <button
          onClick={handleToggleTheme}
          className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg mt-4 w-full hover:bg-[#f0f0f0] dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <span className="text-[#3949ab] dark:text-gray-300 text-sm font-semibold uppercase tracking-[-0.14px]">
            Night Mode
          </span>
          <div
            className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${
              isDarkMode ? 'bg-[#5c6bc0]' : 'bg-[#9fa8da]'
            }`}
          >
            <div
              className={`absolute bg-white w-4 h-4 rounded-full top-0.5 transition-transform duration-300 ${
                isDarkMode ? 'translate-x-4 left-0.5' : 'left-0.5'
              }`}
            ></div>
          </div>
        </button>
      </div>
    </aside>
  );
}
