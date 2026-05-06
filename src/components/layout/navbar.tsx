import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border shadow-md bg-background p-1">
              <Image 
                src="/favicon.ico" 
                alt="Logo Karang Anyar" 
                fill
                className="object-contain"
              />
            </div>
            <span className="font-serif font-bold text-lg sm:text-xl">
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
            Tentang
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium hover:bg-muted hover:text-foreground h-8 w-8 outline-none border-none">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background p-0 flex flex-col border-l">
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              <div className="p-6 border-b">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border shadow-md bg-background p-1">
                    <Image 
                      src="/favicon.ico" 
                      alt="Logo Karang Anyar" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-serif font-bold text-xl">
                    Karang Anyar
                  </span>
                </Link>
              </div>
              
              <nav className="flex flex-col p-6 gap-2">
                <SheetClose 
                  render={
                    <Link 
                      href="/" 
                      className="flex items-center px-4 py-3 rounded-xl text-lg font-medium hover:bg-primary/5 hover:text-primary transition-all border border-transparent hover:border-primary/10"
                    />
                  }
                >
                  Beranda
                </SheetClose>
                <SheetClose 
                  render={
                    <Link 
                      href="/produk" 
                      className="flex items-center px-4 py-3 rounded-xl text-lg font-medium hover:bg-primary/5 hover:text-primary transition-all border border-transparent hover:border-primary/10"
                    />
                  }
                >
                  Katalog Produk
                </SheetClose>
                <SheetClose 
                  render={
                    <Link 
                      href="/tentang" 
                      className="flex items-center px-4 py-3 rounded-xl text-lg font-medium hover:bg-primary/5 hover:text-primary transition-all border border-transparent hover:border-primary/10"
                    />
                  }
                >
                  Tentang
                </SheetClose>
              </nav>

              <div className="mt-auto p-6 border-t bg-muted/20">
                <p className="text-xs text-muted-foreground text-center">
                  &copy; {new Date().getFullYear()} Karang Anyar<br/>
                  Etalase Digital Desa
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
