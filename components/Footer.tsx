import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-[#0c1222] to-[#080d19] text-slate-400 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[80px] bg-blue-500/5 blur-[60px]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo_nekat.webp"
                  alt="Logo SMKN 1 Katapang"
                  width={500}
                  height={500}
                  className="w-7 h-7"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Smart Katapang</h3>
                <p className="text-xs text-slate-500">
                  Portal Digital SMKN 1 Katapang
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
              Platform terpadu untuk mengakses berbagai sistem manajemen sekolah
              yang dikembangkan oleh tim Teaching Factory RPL.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Tautan Cepat
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://smkn1katapang.sch.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors duration-300"
                >
                  <span>Website Sekolah</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-all duration-300 -translate-x-1 group-hover/link:translate-x-0" />
                </a>
              </li>
              <li>
                <a
                  href="#apps-section"
                  className="group/link inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors duration-300"
                >
                  <span>Daftar Aplikasi</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-all duration-300 -translate-x-1 group-hover/link:translate-x-0" />
                </a>
              </li>
              <li>
                <a
                  href="#home"
                  className="group/link inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors duration-300"
                >
                  <span>Beranda</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-all duration-300 -translate-x-1 group-hover/link:translate-x-0" />
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Kontak
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400/60 shrink-0 mt-0.5" />
                <span className="text-slate-500">
                  Jl. Ceuri No.16, Katapang, Kab. Bandung, Jawa Barat
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400/60 shrink-0" />
                <a
                  href="mailto:info@smkn1katapang.sch.id"
                  className="text-slate-500 hover:text-blue-400 transition-colors duration-300"
                >
                  info@smkn1katapang.sch.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <p>
              &copy; {new Date().getFullYear()} Smart Katapang. All rights reserved.
            </p>
            <p>
              Dikembangkan oleh{" "}
              <Link
                href="https://github.com/KevinSinatria"
                target="_blank"
                className="text-blue-500/70 hover:text-blue-400 transition-colors duration-300"
              >
                Tim Teaching Factory RPL
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
