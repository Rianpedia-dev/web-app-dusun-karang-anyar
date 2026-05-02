import { Eye, MousePointerClick, Package, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getUser } from "@/lib/actions/auth";
import { getProducts } from "@/lib/actions/product";
import { getSellerStats } from "@/lib/actions/analytics";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const user = await getUser();
  
  if (!user) {
    redirect("/login");
  }

  // Get products for this seller
  const allProducts = await getProducts({ approvedOnly: false });
  const myProducts = allProducts.filter(p => p.sellerId === user.id);
  
  const stats = await getSellerStats(user.id);

  const conversionRate = stats.totalViews > 0 
    ? ((Number(stats.totalContacts) / Number(stats.totalViews)) * 100).toFixed(1) 
    : "0.0";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold tracking-tight">Ringkasan Toko</h1>
        <p className="text-muted-foreground">Halo {user.profile?.name || user.email}, pantau performa produk Anda.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Produk" 
          value={myProducts.length} 
          icon={Package} 
          description="Produk terdaftar"
        />
        <StatCard 
          title="Total Dilihat" 
          value={stats.totalViews ?? 0} 
          icon={Eye} 
          description="Akumulasi kunjungan"
        />
        <StatCard 
          title="Klik Kontak WA" 
          value={stats.totalContacts ?? 0} 
          icon={MousePointerClick} 
          description="Interaksi pembeli"
        />
        <StatCard 
          title="Tingkat Konversi" 
          value={`${conversionRate}%`} 
          icon={TrendingUp} 
          description="Klik / Dilihat"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Panduan Penjual</CardTitle>
            <CardDescription>
              Cara meningkatkan penjualan di Marketplace Dusun.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="font-semibold text-green-800">1. Pastikan foto produk menarik</p>
                <p className="text-sm text-green-700">Foto yang cerah dan jelas akan lebih menarik minat pembeli.</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <p className="font-semibold text-amber-800">2. Deskripsi Lengkap</p>
                <p className="text-sm text-amber-700">Jelaskan kualitas, ukuran, dan keunggulan produk Anda.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="font-semibold text-blue-800">3. Respon Cepat di WA</p>
                <p className="text-sm text-blue-700">Pastikan nomor WhatsApp Anda aktif dan merespon dengan ramah.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Produk Anda</CardTitle>
            <CardDescription>
              Status tayang produk Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myProducts.length === 0 ? (
                <p className="text-center py-6 text-muted-foreground text-sm">Belum ada produk.</p>
              ) : (
                myProducts.slice(0, 5).map(product => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-muted overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.imageUrl || undefined} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                    </div>
                    <Badge variant={product.isApproved ? "default" : "secondary"}>
                      {product.isApproved ? "Aktif" : "Review"}
                    </Badge>
                  </div>
                ))
              )}
            </div>
            <Button variant="ghost" className="w-full mt-6" asChild>
              <Link href="/dashboard/produk">Kelola Semua Produk</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
