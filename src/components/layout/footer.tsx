import Link from "next/link";
import { Sprout, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-foreground border-t pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                <Sprout className="h-5 w-5" />
              </div>
              <span className="font-serif font-bold text-lg">
                Karang Anyar
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Etalase digital produk unggulan dari Dusun Karang Anyar. Menghubungkan potensi desa dengan masyarakat luas.
            </p>
            <div className="flex items-center space-x-4">
              {/* Social Media placeholders */}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Menu Cepat</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-primary transition-colors">Katalog Produk</Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-primary transition-colors">Tentang Dusun</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">Masuk Penjual</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Kategori Produk</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/produk?kategori=pertanian" className="hover:text-primary transition-colors">Hasil Pertanian</Link>
              </li>
              <li>
                <Link href="/produk?kategori=peternakan" className="hover:text-primary transition-colors">Hasil Peternakan</Link>
              </li>
              <li>
                <Link href="/produk?kategori=olahan" className="hover:text-primary transition-colors">Produk Olahan</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>Balai Dusun Karang Anyar, Kec. XYZ, Kab. ABC, Provinsi DEF 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@karanganyar-market.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dusun Karang Anyar. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
