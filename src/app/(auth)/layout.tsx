'use client';

import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force remove dark class from html when on auth pages
    document.documentElement.classList.remove('dark');

    // Cleanup: restore dark mode when leaving auth pages (if it was enabled)
    return () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Auth pages (login, register, etc.) always use light theme */}
      {children}
    </div>
  );
}
