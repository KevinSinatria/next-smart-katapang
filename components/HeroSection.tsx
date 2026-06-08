"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const eased = 1 - Math.pow(2, -10 * progress);
            start = Math.floor(eased * target);
            setCount(start);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
        {count}+
      </div>
      <div className="text-sm text-blue-200/80 mt-1">{label}</div>
    </div>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToApps = () => {
    const appsSection = document.getElementById("apps-section");
    appsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e]">
      {/* Animated mesh gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/30 blur-[120px] animate-mesh-1" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/25 blur-[100px] animate-mesh-2" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[80px] animate-mesh-3" />
        <div
          className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/15 blur-[90px] animate-mesh-1"
          style={{ animationDelay: "5s" }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Floating particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/40"
              style={{
                left: `${10 + ((i * 4.3) % 80)}%`,
                top: `${5 + ((i * 7.1) % 90)}%`,
                animation: `float-slow ${6 + (i % 5) * 2}s ease-in-out infinite`,
                animationDelay: `${(i * 0.7) % 5}s`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:pt-18 md:pb-48">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div
            className={`inline-flex items-center justify-center transition-all duration-700 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 blur-xl opacity-50 animate-glow-pulse" />
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Image
                  src="/logo_nekat.webp"
                  alt="Logo SMKN 1 Katapang"
                  width={500}
                  height={500}
                  className="w-14 h-14 md:w-18 md:h-18 drop-shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div
            className={`transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-blue-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ekosistem Digital Terintegrasi</span>
            </div>
          </div>

          {/* Heading */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight transition-all duration-700 delay-300 leading-[1.1] ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-white">Portal Digital</span>
            <br />
            <span className="gradient-text-light">SMKN 1 Katapang</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Menampilkan berbagai aplikasi manajemen sekolah untuk mendukung
            ekosistem pendidikan yang efisien dan terintegrasi.
          </p>

          {/* CTA */}
          <div
            className={`pt-4 transition-all duration-700 delay-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Button
              onClick={scrollToApps}
              size="lg"
              className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 group px-8 py-6 text-base rounded-xl"
            >
              <span className="relative z-10 flex items-center">
                Jelajahi Aplikasi
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>

          {/* Stats */}
          <div
            className={`pt-12 transition-all duration-700 delay-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-8 md:gap-12 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <AnimatedCounter target={10} label="Aplikasi" />
              <div className="w-px h-10 bg-white/10" />
              <AnimatedCounter target={5} label="Kategori" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent" />
    </section>
  );
}
