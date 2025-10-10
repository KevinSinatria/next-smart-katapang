'use client';

import { GraduationCap, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 leading-tight">
                SMKN 1 Katapang
              </span>
              <span className="text-xs text-slate-600 leading-tight">
                Portal Digital
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#home"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Beranda
            </a>
            <a
              href="#apps-section"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Aplikasi
            </a>
            <a
              href="https://smkn1katapang.sch.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Website Sekolah
            </a>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-3">
            <a
              href="#home"
              className="block text-slate-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beranda
            </a>
            <a
              href="#apps-section"
              className="block text-slate-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Aplikasi
            </a>
            <a
              href="https://smkn1katapang.sch.id"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-slate-700 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Website Sekolah
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
