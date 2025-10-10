import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">SMKN 1 Katapang</h3>
                <p className="text-sm text-slate-400">Portal Digital</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Platform terpadu untuk mengakses berbagai sistem manajemen sekolah yang dikembangkan oleh tim Teaching Factory RPL.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Jl. Raya Katapang, Katapang, Bandung, Jawa Barat</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>(022) 1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:info@smkn1katapang.sch.id"
                  className="hover:text-blue-400 transition-colors"
                >
                  info@smkn1katapang.sch.id
                </a>
              </li>
            </ul>
          </div>

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
                <a href="#apps-section" className="hover:text-blue-400 transition-colors">
                  Daftar Aplikasi
                </a>
              </li>
              <li>
                <a
                  href="https://smkn1katapang.sch.id/ppdb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  PPDB
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} SMKN 1 Katapang. Dikembangkan oleh Tim Teaching Factory RPL.
          </p>
        </div>
      </div>
    </footer>
  );
}
