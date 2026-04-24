import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { formatRupiah } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Store, Calendar, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/product-card";

interface DetailProdukProps {
  params: Promise<{ id: string }>;
}

export default async function DetailProduk({ params }: DetailProdukProps) {
  const { id } = await params;
  
  const product = MOCK_PRODUCTS.find(p => p.id === id && p.isApproved);
  
  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = MOCK_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id && p.isApproved)
    .slice(0, 4);

  // Format date
  const dateFormatted = new Date(product.createdAt).toLocaleDateString("id-ID", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb & Back */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
          <Link href="/produk">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Katalog
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Product Image */}
        <div className="rounded-2xl overflow-hidden bg-muted aspect-square relative border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-4">
            <Badge 
              variant={product.category === "Pertanian" ? "default" : product.category === "Peternakan" ? "secondary" : "outline"}
              className="mb-3"
            >
              {product.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-primary mb-6">
              {formatRupiah(product.price)}
            </p>
          </div>

          <div className="prose prose-sm md:prose-base text-muted-foreground mb-8">
            <p>{product.description}</p>
          </div>

          <div className="bg-muted/50 rounded-xl p-5 mb-8 border border-border/50">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              Informasi Penjual
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="font-medium min-w-[80px]">Penjual:</span>
                <span className="text-muted-foreground">{product.sellerName}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{product.sellerLocation}</span>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Diposting pada {dateFormatted}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <div className="flex items-center gap-2 text-sm text-green-600 mb-4 bg-green-50 p-3 rounded-lg">
              <ShieldCheck className="h-5 w-5" />
              <span>Terverifikasi oleh Admin Dusun</span>
            </div>
            
            <WhatsAppButton product={product} className="h-12 text-lg font-medium" />
            <p className="text-xs text-center text-muted-foreground">
              Anda akan diarahkan ke WhatsApp untuk menghubungi penjual secara langsung.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-16">
          <h2 className="text-2xl font-serif font-bold mb-8">Produk Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(related => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
