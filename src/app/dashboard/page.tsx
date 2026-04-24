import { Eye, MousePointerClick, Package, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function DashboardHome() {
  // Mock data for specific seller "u1"
  const myProducts = MOCK_PRODUCTS.filter(p => p.sellerId === "u1");
  const totalViews = myProducts.reduce((acc, curr) => acc + curr.views, 0);
  const totalClicks = myProducts.reduce((acc, curr) => acc + curr.contactClicks, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold tracking-tight">Ringkasan Toko</h1>
        <p className="text-muted-foreground">Pantau performa produk dan interaksi pembeli.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Produk" 
          value={myProducts.length} 
          icon={Package} 
          description="Produk aktif"
        />
        <StatCard 
          title="Total Dilihat" 
          value={totalViews} 
          icon={Eye} 
          trend="up"
          trendValue="12%"
          description="Bulan ini"
        />
        <StatCard 
          title="Klik Kontak WA" 
          value={totalClicks} 
          icon={MousePointerClick} 
          trend="up"
          trendValue="5%"
          description="Bulan ini"
        />
        <StatCard 
          title="Tingkat Konversi" 
          value={`${((totalClicks / totalViews) * 100).toFixed(1)}%`} 
          icon={TrendingUp} 
          description="Klik / Dilihat"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Aktivitas Terakhir</CardTitle>
            <CardDescription>
              Orang melihat dan mengklik produk Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for chart */}
            <div className="h-[200px] w-full bg-muted/50 rounded-lg flex items-center justify-center border border-dashed">
              <span className="text-muted-foreground text-sm">Grafik Aktivitas Akan Ditampilkan Di Sini</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Produk Terpopuler</CardTitle>
            <CardDescription>
              Produk Anda yang paling banyak dilihat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myProducts.sort((a, b) => b.views - a.views).slice(0, 3).map(product => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center"><Eye className="w-3 h-3 mr-1"/> {product.views}</span>
                      <span className="flex items-center"><MousePointerClick className="w-3 h-3 mr-1"/> {product.contactClicks}</span>
                    </div>
                  </div>
                  <Badge variant={product.isApproved ? "default" : "secondary"}>
                    {product.isApproved ? "Aktif" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6" asChild>
              <Link href="/dashboard/produk">Lihat Semua Produk</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
