'use client';

import { Button } from '@/components/ui/button';
import { Category } from '@/types';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export function CategoryTabs({ categories, selectedCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        onClick={() => onSelectCategory(null)}
        variant={selectedCategory === null ? 'default' : 'outline'}
        className={`rounded-full px-6 py-2.5 transition-all duration-300 font-medium text-sm ${
          selectedCategory === null
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 border-0 scale-105'
            : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 hover:shadow-md hover:shadow-blue-500/5'
        }`}
      >
        Semua
      </Button>

      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => onSelectCategory(category.slug)}
          variant={selectedCategory === category.slug ? 'default' : 'outline'}
          className={`rounded-full px-6 py-2.5 transition-all duration-300 font-medium text-sm ${
            selectedCategory === category.slug
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 border-0 scale-105'
              : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 hover:shadow-md hover:shadow-blue-500/5'
          }`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
