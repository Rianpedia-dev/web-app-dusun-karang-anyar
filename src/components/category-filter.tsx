"use client";

import { cn } from "@/lib/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  className?: string;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  className = ""
}: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "Semua") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        onClick={() => handleSelect("Semua")}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors border cursor-pointer",
          selectedCategory === "Semua"
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background text-foreground hover:bg-muted border-input"
        )}
      >
        Semua
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleSelect(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors border cursor-pointer",
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
