import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sprout, TrendingUp, Users } from "lucide-react";
import { MOCK_PRODUCTS, MOCK_STATS } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";

export default function Home() {
  // Get 6 latest approved products
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.isApproved).slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight">
              Etalase Digital <span className="text-primary">Dusun Karang Anyar</span>
            </h1>
            <p className="text-xl text-muted-foreground md:max-w-2xl">
              Temukan produk pertanian dan peternakan berkualitas langsung dari para petani dan peternak Dusun Karang Anyar. Segar, alami, dan mendukung ekonomi lokal.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
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
              <h3 className="text-4xl font-bold text-primary">{MOCK_STATS.totalProducts}+</h3>
              <p className="text-sm text-muted-foreground font-medium">Produk Lokal</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">{MOCK_STATS.totalSellers}+</h3>
              <p className="text-sm text-muted-foreground font-medium">Penjual Aktif</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">{MOCK_STATS.totalViews}+</h3>
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
            <Link href="/produk?kategori=Pertanian" className="group">
              <div className="bg-background rounded-2xl p-8 border text-center transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sprout className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Hasil Pertanian</h3>
                <p className="text-muted-foreground text-sm">Sayur, buah, beras, dan hasil bumi lainnya langsung dari ladang.</p>
              </div>
            </Link>
            
            <Link href="/produk?kategori=Peternakan" className="group">
              <div className="bg-background rounded-2xl p-8 border text-center transition-all duration-300 hover:shadow-lg hover:border-secondary/50">
                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Hasil Peternakan</h3>
                <p className="text-muted-foreground text-sm">Susu segar, telur, daging sapi, dan daging ayam kampung.</p>
              </div>
            </Link>
            
            <Link href="/produk?kategori=Olahan" className="group">
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
            {featuredProducts.map(product => (
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

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Warga Karang Anyar?</h2>
          <p className="text-lg md:text-xl mb-10 text-primary-foreground/90">
            Mari bergabung menjadi penjual dan pasarkan produk unggulan Anda ke pasar yang lebih luas. 
            Tingkatkan pendapatan dengan digitalisasi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="rounded-full text-secondary-foreground px-8 font-bold">
              <Link href="/register">
                Daftar Sebagai Penjual
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8" asChild>
              <Link href="/tentang">
                Pelajari Cara Kerja
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
