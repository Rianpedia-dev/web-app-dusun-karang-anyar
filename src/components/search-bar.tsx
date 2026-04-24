import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (term: string) => void;
  className?: string;
}

export function SearchBar({ placeholder = "Cari produk...", onSearch, className = "" }: SearchBarProps) {
  return (
    <div className={`relative flex w-full items-center ${className}`}>
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-9 pr-12 h-11 w-full rounded-full border-muted-foreground/30 focus-visible:ring-primary"
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <Button 
        size="sm" 
        className="absolute right-1 h-9 rounded-full px-4"
        onClick={() => {}}
      >
        Cari
      </Button>
    </div>
  );
}
