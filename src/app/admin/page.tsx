import { StatCard } from "@/components/stat-card";
import { Package, Shield, Eye, MessageSquare, Plus, ArrowUpRight } from "lucide-react";
import { getAdminStats, getRecentActivities, getChartData } from "@/lib/actions/analytics";
import { getProducts } from "@/lib/actions/product";
import { StatsChart } from "@/components/stats-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminDashboard() {
  const stats = await getAdminStats();
  const allProducts = await getProducts({ approvedOnly: false });
  const recentActivities = await getRecentActivities();
  const chartData = await getChartData();
  const pendingCount = allProducts.filter(p => !p.isApproved).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground tracking-tight">Dashboard Super Admin</h1>
          <p className="text-muted-foreground">Selamat datang kembali. Berikut adalah ringkasan performa platform hari ini.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="hidden sm:flex">
            <Link href="/admin/pengguna">
              Kelola Pengguna
            </Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/admin/produk">
              Lihat Semua Produk
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Produk" 
          value={stats.totalProducts ?? 0} 
          icon={Package} 
        />
        <StatCard 
          title="Klik WhatsApp" 
          value={stats.totalContacts ?? 0} 
          icon={MessageSquare} 
          description="Peminat menghubungi penjual"
        />
        <StatCard 
          title="Total Kunjungan" 
          value={stats.totalViews ?? 0} 
          icon={Eye} 
          description="Total dilihat pengunjung"
        />
        <StatCard 
          title="Total Admin" 
          value={stats.totalAdmins ?? 0} 
          icon={Shield} 
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 md:col-span-2 lg:col-span-4 shadow-sm border-border">
          <CardHeader>
            <CardTitle>Statistik Platform</CardTitle>
            <CardDescription>
              Pertumbuhan produk dan pengunjung 30 hari terakhir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StatsChart data={chartData} />
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 shadow-sm border-border">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>
              Log aktivitas sistem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Belum ada aktivitas terbaru.</p>
              ) : (
                recentActivities.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <p className="text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-muted-foreground opacity-60 text-xs">
                      {new Date(activity.time).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                ))
              )}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-primary text-xs" asChild>
              <Link href="/admin/produk">Lihat Semua Aktivitas <ArrowUpRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
