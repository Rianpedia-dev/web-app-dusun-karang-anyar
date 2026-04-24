import { StatCard } from "@/components/stat-card";
import { Package, Users, Eye, AlertCircle } from "lucide-react";
import { MOCK_STATS, MOCK_PRODUCTS } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const pendingProducts = MOCK_PRODUCTS.filter(p => !p.isApproved).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Dashboard Admin</h1>
        <p className="text-slate-500">Ringkasan aktivitas platform Dusun Karang Anyar.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Produk" 
          value={MOCK_STATS.totalProducts} 
          icon={Package} 
        />
        <StatCard 
          title="Total Pengguna" 
          value={MOCK_STATS.totalSellers} 
          icon={Users} 
        />
        <StatCard 
          title="Total Kunjungan" 
          value={MOCK_STATS.totalViews} 
          icon={Eye} 
        />
        <StatCard 
          title="Menunggu Review" 
          value={pendingProducts} 
          icon={AlertCircle} 
          description="Produk butuh persetujuan"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Statistik Platform</CardTitle>
            <CardDescription>
              Pertumbuhan produk dan pengguna 30 hari terakhir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for chart */}
            <div className="h-[300px] w-full bg-slate-100 rounded-lg flex items-center justify-center border border-dashed border-slate-300">
              <span className="text-slate-400 text-sm">Grafik Statistik Akan Ditampilkan Di Sini</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>
              Log aktivitas sistem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Produk Baru Ditambahkan</p>
                  <p className="text-slate-500">Beras Organik oleh Pak Budi</p>
                </div>
                <div className="text-slate-400">10 mnt lalu</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Pengguna Baru</p>
                  <p className="text-slate-500">Bu Siti mendaftar sebagai penjual</p>
                </div>
                <div className="text-slate-400">1 jam lalu</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Produk Di-approve</p>
                  <p className="text-slate-500">Kopi Robusta oleh Kang Herman</p>
                </div>
                <div className="text-slate-400">2 jam lalu</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
