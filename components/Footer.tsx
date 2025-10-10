import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                {/* <GraduationCap className="w-6 h-6 text-white" /> */}
                <Image
                  src="/logo_nekat.webp"
                  alt="Logo SMKN 1 Katapang"
                  width={500}
                  height={500}
                  className="w-8 h-8"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Smart Katapang</h3>
                <p className="text-sm text-slate-400">
                  Portal Digital SMKN 1 Katapang
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Platform terpadu untuk mengakses berbagai sistem manajemen sekolah
              yang dikembangkan oleh tim Teaching Factory RPL.
            </p>
          </div>

          {/* <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>Jl. Raya Katapang, Katapang, Bandung, Jawa Barat</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <span>(022) 1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <a
                  href="mailto:info@smkn1katapang.sch.id"
                  className="hover:text-blue-400 transition-colors"
                >
                  info@smkn1katapang.sch.id
                </a>
              </li>
            </ul>
          </div> */}

          <div>
            <h4 className="text-white font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://smkn1katapang.sch.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Website Sekolah
                </a>
              </li>
              <li>
                <a
                  href="#apps-section"
                  className="hover:text-blue-400 transition-colors"
                >
                  Daftar Aplikasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Smart Katapang. Dikembangkan oleh{" "}
            <Link
              href="https://github.com/KevinSinatria"
              target="_blank"
              className="text-blue-400 hover:text-blue-500 transition-colors"
            >
              Tim Teaching Factory RPL.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
