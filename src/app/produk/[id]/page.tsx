import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/actions/product";
import { trackView } from "@/lib/actions/analytics";
import { formatRupiah } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Store, Calendar, ShieldCheck, Share2, Info } from "lucide-react";
import { ProductCard } from "@/components/product-card";

interface DetailProdukProps {
  params: Promise<{ id: string }>;
}

export default async function DetailProduk({ params }: DetailProdukProps) {
  const { id } = await params;
  
  const product = await getProductById(id);
  
  if (!product || !product.isApproved) {
    notFound();
  }

  // Track the view
  await trackView(id);

  // Get related products
  const allProducts = await getProducts({ category: product.category });
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  // Format date
  const dateFormatted = new Date(product.createdAt).toLocaleDateString("id-ID", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Top Bar / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <Button variant="ghost" asChild className="w-fit pl-0 group text-muted-foreground hover:text-primary transition-colors">
          <Link href="/produk">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
            Kembali ke Katalog
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full h-9 px-4">
            <Share2 className="mr-2 h-4 w-4" /> Bagikan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Left Column: Product Image */}
        <div className="lg:col-span-7">
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-muted shadow-xl border border-border/40">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl || undefined} 
                alt={product.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                <Store className="h-24 w-24" />
              </div>
            )}
            <div className="absolute top-6 left-6">
              <Badge 
                className={`
                  px-4 py-1.5 rounded-full shadow-lg border-none text-[10px] uppercase tracking-[0.2em] font-bold
                  ${product.category === "Pertanian" ? "bg-emerald-500 text-white" : 
                    product.category === "Peternakan" ? "bg-amber-500 text-white" : 
                    "bg-blue-500 text-white"}
                `}
              >
                {product.category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Column: Info & CTA */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-primary tracking-tight">
                  {formatRupiah(product.price)}
                </span>
                <span className="text-muted-foreground text-sm font-medium">/ satuan</span>
              </div>
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center gap-2 text-foreground font-semibold mb-3">
                <Info className="h-4 w-4 text-primary" />
                <span>Deskripsi Produk</span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {product.description}
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/60 shadow-sm space-y-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                Profil Penjual
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {product.sellerName?.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{product.sellerName}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Produsen Lokal</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 pt-2 border-t">
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-red-500/60" />
                    <span>{product.sellerLocation}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-blue-500/60" />
                    <span>Postingan: {dateFormatted}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-4 pt-10 border-t sticky bottom-6 bg-background/80 backdrop-blur-md lg:relative lg:bg-transparent lg:bottom-auto">
            <div className="flex items-center gap-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
              <ShieldCheck className="h-6 w-6 shrink-0" />
              <div className="flex flex-col">
                <span>Terverifikasi Aman</span>
                <span className="text-[10px] opacity-70">Produk ini telah diperiksa oleh Admin Karang Anyar</span>
              </div>
            </div>
            
            <WhatsAppButton product={product} className="h-14 text-lg font-bold rounded-2xl shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300" />
            
            <p className="text-[11px] text-center text-muted-foreground px-4">
              Dengan menghubungi penjual, Anda menyetujui syarat & ketentuan marketplace Karang Anyar.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-serif font-bold tracking-tight">Produk Terkait</h2>
            <Link href={`/produk?category=${product.category}`} className="text-primary font-bold text-sm hover:underline">
              Lihat Kategori Ini
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(related => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
