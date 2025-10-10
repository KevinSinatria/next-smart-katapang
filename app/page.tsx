'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CategoryTabs } from '@/components/CategoryTabs';
import { AppCard } from '@/components/AppCard';
import { Footer } from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { App, Category } from '@/types';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesResponse, appsResponse] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('apps').select('*').order('created_at', { ascending: false }),
      ]);

      if (categoriesResponse.data) {
        setCategories(categoriesResponse.data);
      }

      if (appsResponse.data) {
        setApps(appsResponse.data);
      }
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <div id="home">
          <HeroSection />
        </div>

        <section id="apps-section" className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Daftar Aplikasi Sekolah
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Berbagai sistem manajemen yang mendukung operasional SMKN 1 Katapang
              </p>
            </div>

            <div className="mb-10">
              <CategoryTabs
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : filteredApps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredApps.map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    categoryName={getCategoryName(app.category_id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg">
                  Tidak ada aplikasi tersedia untuk kategori ini.
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
