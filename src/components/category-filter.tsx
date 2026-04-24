"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  className?: string;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  className = ""
}: CategoryFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
          selectedCategory === null
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background text-foreground hover:bg-muted border-input"
        )}
      >
        Semua
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
            selectedCategory === category
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground hover:bg-muted border-input"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
