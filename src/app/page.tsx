import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sprout, Users } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/actions/product";
import { getAdminStats } from "@/lib/actions/analytics";
import { getSetting } from "@/lib/actions/settings";

export default async function Home() {
  // Get 6 latest approved products
  const featuredProducts = await getProducts({ approvedOnly: true });
  const stats = await getAdminStats();
  const heroTitle = await getSetting("home_hero_title", "Etalase Digital Karang Anyar");
  const heroSubtitle = await getSetting("home_hero_subtitle", "Temukan produk pertanian dan peternakan berkualitas langsung dari para petani dan peternak Karang Anyar. Segar, alami, dan mendukung ekonomi lokal.");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
            alt="Pemandangan Desa"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight drop-shadow-lg">
              {heroTitle}
            </h1>
            <p className="text-xl opacity-90 md:max-w-2xl mx-auto">
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" asChild className="rounded-full px-8">
                <Link href="/produk">
                  Mulai Belanja <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 bg-background/50 backdrop-blur-sm">
                <Link href="/tentang">
                  Pelajari Lebih Lanjut
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">{stats.totalProducts}+</h3>
              <p className="text-sm text-muted-foreground font-medium">Produk Lokal</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">{stats.totalSellers}+</h3>
              <p className="text-sm text-muted-foreground font-medium">Penjual Aktif</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">{stats.totalViews}+</h3>
              <p className="text-sm text-muted-foreground font-medium">Pengunjung</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">100%</h3>
              <p className="text-sm text-muted-foreground font-medium">Alami & Segar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Kategori Unggulan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Kami mengelompokkan produk terbaik kami ke dalam tiga kategori utama untuk memudahkan Anda mencari kebutuhan harian.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/produk?category=Pertanian" className="group">
              <div className="bg-background rounded-2xl p-8 border text-center transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sprout className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Hasil Pertanian</h3>
                <p className="text-muted-foreground text-sm">Sayur, buah, beras, dan hasil bumi lainnya langsung dari ladang.</p>
              </div>
            </Link>
            
            <Link href="/produk?category=Peternakan" className="group">
              <div className="bg-background rounded-2xl p-8 border text-center transition-all duration-300 hover:shadow-lg hover:border-secondary/50">
                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Hasil Peternakan</h3>
                <p className="text-muted-foreground text-sm">Susu segar, telur, daging sapi, dan daging ayam kampung.</p>
              </div>
            </Link>
            
            <Link href="/produk?category=Olahan" className="group">
              <div className="bg-background rounded-2xl p-8 border text-center transition-all duration-300 hover:shadow-lg hover:border-accent/50">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Leaf className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Produk Olahan</h3>
                <p className="text-muted-foreground text-sm">Madu, kopi bubuk, jamu, dan camilan khas Karang Anyar.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-2">Produk Terbaru</h2>
              <p className="text-muted-foreground">Koleksi produk segar yang baru ditambahkan oleh warga.</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/produk">
                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild className="w-full">
              <Link href="/produk">
                Lihat Semua Produk
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Hubungi Kami</h2>
          <p className="text-lg md:text-xl mb-10 text-primary-foreground/90">
            Punya pertanyaan seputar produk atau ingin berkunjung ke Karang Anyar? 
            Silakan hubungi pengelola kami.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="rounded-full text-secondary-foreground px-8 font-bold">
              <Link href="https://wa.me/628123456789" target="_blank">
                WhatsApp Pengelola
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8" asChild>
              <Link href="/tentang">
                Tentang Kami
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
