import { getSetting } from "@/lib/actions/settings";
import { MapPin, Users, Target, CheckCircle2 } from "lucide-react";

export default async function TentangDusun() {
  const title = await getSetting("about_title", "Tentang Dusun Karang Anyar");
  const description = await getSetting("about_description", "Dusun Karang Anyar adalah sebuah permukiman asri yang terletak di daerah dataran tinggi. Dengan tanah yang subur dan cuaca yang mendukung, sebagian besar warga kami bermata pencaharian sebagai petani dan peternak.");
  const location = await getSetting("about_location", "Balai Dusun Karang Anyar, Kec. XYZ, Kab. ABC, Provinsi DEF 12345");
  const mapsUrl = await getSetting("about_maps_url", "");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary/5 py-16 md:py-24 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">{title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Mengenal lebih dekat potensi, masyarakat, dan semangat gotong royong yang membangun Dusun Karang Anyar.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=1200" 
                alt="Pemandangan Dusun Karang Anyar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-bold text-foreground">Profil Singkat</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  {description}
                </p>
                <p>
                  WebApp Marketplace ini dibangun sebagai inisiatif warga untuk menghadapi era digital. 
                  Kami ingin produk unggulan desa kami dapat dijangkau oleh masyarakat luas tanpa harus melewati rantai distribusi yang panjang.
                </p>
              </div>
            </div>
          </div>

          {/* Visi Misi */}
          <div className="bg-muted/30 dark:bg-muted/10 rounded-[2.5rem] p-8 md:p-16 mb-24 border border-border/40 backdrop-blur-sm">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Tujuan & Harapan Kami</h2>
              <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/40 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Digitalisasi Desa</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Membawa teknologi ke pelosok desa untuk mempermudah transaksi dan perluasan jangkauan pasar bagi seluruh warga.
                </p>
              </div>
              <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/40 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Ekonomi Mandiri</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Meningkatkan taraf hidup dan kemandirian ekonomi warga melalui sistem penjualan langsung ke konsumen akhir.
                </p>
              </div>
              <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/40 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-accent-foreground dark:text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Kualitas Terjamin</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Menyediakan produk segar dan alami langsung dari sumbernya, memastikan kualitas terbaik bagi setiap pembeli.
                </p>
              </div>
            </div>
          </div>

          {/* Lokasi */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">Lokasi Kami</h2>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="text-primary w-5 h-5 shrink-0" />
                <p className="text-lg">{location}</p>
              </div>
            </div>
            
            {/* Google Maps Embed */}
            <div className="aspect-video sm:aspect-[21/9] bg-muted rounded-[2rem] overflow-hidden relative border border-border/40 shadow-2xl">
              {mapsUrl ? (
                <iframe
                  src={mapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-muted-foreground">
                  <MapPin className="h-12 w-12 opacity-20" />
                  <p className="font-medium">Peta belum dikonfigurasi oleh Admin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
