'use client';

import { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CategoryTabs } from '@/components/CategoryTabs';
import { AppCard } from '@/components/AppCard';
import { Footer } from '@/components/Footer';
import { getCategories, getApps } from '@/lib/actions';
import { App, Category } from '@/types';
import { Loader2, Search } from 'lucide-react';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Scroll-triggered animation for the apps section heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesData, appsData] = await Promise.all([
        getCategories(),
        getApps(),
      ]);

      setCategories(categoriesData);
      setApps(appsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApps = selectedCategory
    ? apps.filter((app) => {
        const category = categories.find((cat) => cat.id === app.category_id);
        return category?.slug === selectedCategory;
      })
    : apps;

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name;
  };

  // Trigger staggered card animations when filtered apps change
  useEffect(() => {
    setVisibleCards(new Set());
    const timers: NodeJS.Timeout[] = [];
    filteredApps.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleCards((prev) => {
          const next = new Set(Array.from(prev));
          next.add(index);
          return next;
        });
      }, 100 + index * 80);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, [filteredApps.length, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <div id="home" className="scroll-mt-20">
          <HeroSection />
        </div>

        <section
          id="apps-section"
          ref={sectionRef}
          className="relative py-20 md:py-28 scroll-mt-12 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 dot-pattern opacity-50" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-60" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section heading */}
            <div
              className={`text-center mb-14 transition-all duration-800 ${
                sectionVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-600 font-medium mb-5">
                <Search className="w-3.5 h-3.5" />
                Temukan Aplikasi
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Daftar{' '}
                <span className="gradient-text">Aplikasi Sekolah</span>
              </h2>
              <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Berbagai sistem manajemen yang mendukung operasional SMKN 1 Katapang
              </p>
            </div>

            {/* Category tabs */}
            <div
              className={`mb-12 transition-all duration-700 delay-200 ${
                sectionVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
            >
              <CategoryTabs
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* App cards */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="relative">
                  <div className="absolute inset-0 w-12 h-12 rounded-full bg-blue-500/20 blur-xl animate-glow-pulse" />
                  <Loader2 className="relative w-10 h-10 animate-spin text-blue-600" />
                </div>
                <p className="text-sm text-slate-400">Memuat aplikasi...</p>
              </div>
            ) : filteredApps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredApps.map((app, index) => (
                  <div
                    key={app.id}
                    className={`transition-all duration-500 ease-out ${
                      visibleCards.has(index)
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                  >
                    <AppCard
                      app={app}
                      categoryName={getCategoryName(app.category_id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-5">
                  <Search className="w-7 h-7 text-slate-300" />
                </div>
                <p className="text-slate-400 text-lg font-medium mb-2">
                  Tidak ada aplikasi ditemukan
                </p>
                <p className="text-slate-400 text-sm">
                  Coba pilih kategori lain untuk menemukan aplikasi yang Anda cari.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
