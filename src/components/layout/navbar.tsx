import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Sprout } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
              <Sprout className="h-5 w-5" />
            </div>
            <span className="font-serif font-bold text-lg hidden sm:inline-block">
              Karang Anyar
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">
            Beranda
          </Link>
          <Link href="/produk" className="transition-colors hover:text-primary">
            Katalog Produk
          </Link>
          <Link href="/tentang" className="transition-colors hover:text-primary">
            Tentang Dusun
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Masuk</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Daftar</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium hover:bg-muted hover:text-foreground h-8 w-8">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                  Beranda
                </Link>
                <Link href="/produk" className="text-lg font-medium hover:text-primary transition-colors">
                  Katalog Produk
                </Link>
                <Link href="/tentang" className="text-lg font-medium hover:text-primary transition-colors">
                  Tentang Dusun
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/login">Masuk</Link>
                  </Button>
                  <Button className="w-full justify-start" asChild>
                    <Link href="/register">Daftar</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
