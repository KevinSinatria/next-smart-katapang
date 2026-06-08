'use client';

import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-blue-900/5 border-b border-slate-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <div className="flex items-center gap-3 group">
            <div
              className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-500 ${
                scrolled
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/25'
                  : 'bg-white/10 backdrop-blur-sm border border-white/20'
              }`}
            >
              <Image
                src="/logo_nekat.webp"
                alt="Logo SMKN 1 Katapang"
                width={500}
                height={500}
                className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg font-bold leading-tight transition-colors duration-500 ${
                  scrolled ? 'text-slate-900' : 'text-white'
                }`}
              >
                Smart Katapang
              </span>
              <span
                className={`text-xs leading-tight transition-colors duration-500 ${
                  scrolled ? 'text-slate-500' : 'text-blue-200'
                }`}
              >
                Portal Digital SMKN 1 Katapang
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {[
              { href: '#home', label: 'Beranda' },
              { href: '#apps-section', label: 'Aplikasi' },
              { href: 'https://smkn1katapang-bdg.sch.id/', label: 'Website Sekolah', external: true },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group/link ${
                  scrolled
                    ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover/link:w-4/5 transition-all duration-300 rounded-full ${
                    scrolled
                      ? 'bg-blue-600'
                      : 'bg-white'
                  }`}
                />
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={`transition-colors duration-300 ${
                scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className={`py-3 space-y-1 border-t ${
              scrolled ? 'border-slate-200/50' : 'border-white/10'
            }`}
          >
            {[
              { href: '#home', label: 'Beranda' },
              { href: '#apps-section', label: 'Aplikasi' },
              { href: 'https://smkn1katapang-bdg.sch.id/', label: 'Website Sekolah', external: true },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={`block px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  scrolled
                    ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
