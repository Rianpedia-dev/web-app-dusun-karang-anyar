"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function SearchBar({ placeholder = "Cari produk...", defaultValue = "", className = "" }: SearchBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={`relative flex w-full items-center ${className}`}>
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="pl-9 h-11 w-full rounded-full border-muted-foreground/30 focus-visible:ring-primary"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
