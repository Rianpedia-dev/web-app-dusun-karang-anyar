import Image from "next/image";
import { MapPin, Users, Target, CheckCircle2 } from "lucide-react";

export default function TentangDusun() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Tentang Dusun Karang Anyar</h1>
          <p className="text-lg text-muted-foreground">
            Mengenal lebih dekat potensi, masyarakat, dan semangat gotong royong yang membangun Dusun Karang Anyar.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=1200" 
                alt="Pemandangan Dusun Karang Anyar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold">Profil Singkat</h2>
              <p className="text-muted-foreground leading-relaxed">
                Dusun Karang Anyar adalah sebuah permukiman asri yang terletak di daerah dataran tinggi. 
                Dengan tanah yang subur dan cuaca yang mendukung, sebagian besar warga kami bermata pencaharian sebagai petani dan peternak.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                WebApp Marketplace ini dibangun sebagai inisiatif warga untuk menghadapi era digital. 
                Kami ingin produk unggulan desa kami dapat dijangkau oleh masyarakat luas tanpa harus melewati rantai distribusi yang panjang.
              </p>
            </div>
          </div>

          {/* Visi Misi */}
          <div className="bg-muted/30 rounded-3xl p-8 md:p-12 mb-20 border">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold">Tujuan & Harapan</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-2xl p-6 shadow-sm border">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Digitalisasi Desa</h3>
                <p className="text-muted-foreground text-sm">
                  Membawa teknologi ke pelosok desa untuk mempermudah transaksi dan perluasan jangkauan pasar.
                </p>
              </div>
              <div className="bg-background rounded-2xl p-6 shadow-sm border">
                <Users className="w-10 h-10 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-3">Ekonomi Mandiri</h3>
                <p className="text-muted-foreground text-sm">
                  Meningkatkan taraf hidup dan kemandirian ekonomi warga melalui penjualan langsung ke konsumen.
                </p>
              </div>
              <div className="bg-background rounded-2xl p-6 shadow-sm border">
                <CheckCircle2 className="w-10 h-10 text-accent-foreground mb-4" />
                <h3 className="text-xl font-bold mb-3">Kualitas Terjamin</h3>
                <p className="text-muted-foreground text-sm">
                  Menyediakan produk segar dan alami langsung dari sumbernya, memastikan kualitas terbaik bagi pembeli.
                </p>
              </div>
            </div>
          </div>

          {/* Lokasi */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Lokasi Kami</h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
              <MapPin className="text-primary w-5 h-5" />
              <p>Balai Dusun Karang Anyar, Kec. XYZ, Kab. ABC, Provinsi DEF 12345</p>
            </div>
            {/* Placeholder for map */}
            <div className="aspect-[21/9] bg-muted rounded-2xl overflow-hidden relative border flex items-center justify-center">
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin /> Peta Interaktif akan ditampilkan di sini
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
