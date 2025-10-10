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
        className={`rounded-full px-6 transition-all duration-200 ${
          selectedCategory === null
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
            : 'border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-600'
        }`}
      >
        Semua
      </Button>

      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => onSelectCategory(category.slug)}
          variant={selectedCategory === category.slug ? 'default' : 'outline'}
          className={`rounded-full px-6 transition-all duration-200 ${
            selectedCategory === category.slug
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
              : 'border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-600'
          }`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
