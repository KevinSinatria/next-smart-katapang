'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Tags, AppWindow, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/categories', label: 'Kategori', icon: Tags },
  { href: '/admin/apps', label: 'Aplikasi', icon: AppWindow },
  { href: '/admin/profile', label: 'Profil Saya', icon: User },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-40',
          collapsed ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'w-64'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <p className="text-sm text-slate-400 mt-1">SMKN 1 Katapang</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setCollapsed(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              ← Kembali ke Portal
            </Link>
          </div>
        </div>
      </aside>

      {collapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setCollapsed(false)}
        />
      )}
    </>
  );
}
