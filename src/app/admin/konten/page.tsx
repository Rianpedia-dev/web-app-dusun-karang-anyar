import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentForm } from "./content-form";
import { getAllSettings } from "@/lib/actions/settings";

export default async function AdminKontenPage() {
  const settings = await getAllSettings();
  
  // Convert settings array to object for easier access
  const settingsObj = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground tracking-tight">Kelola Konten</h1>
        <p className="text-muted-foreground">Ubah teks dan informasi yang ditampilkan pada halaman utama dan tentang dusun.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Halaman Beranda</CardTitle>
            <CardDescription>Update konten hero section dan sambutan di beranda.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentForm 
              section="home"
              initialData={{
                home_hero_title: settingsObj.home_hero_title || "Pasar Digital Dusun Karang Anyar",
                home_hero_subtitle: settingsObj.home_hero_subtitle || "Membawa hasil tani dan ternak terbaik langsung dari tangan pertama ke depan pintu Anda.",
                home_welcome_text: settingsObj.home_welcome_text || "Selamat datang di etalase digital kami. Kami bangga menyajikan produk unggulan dari warga Dusun Karang Anyar.",
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Halaman Tentang Dusun</CardTitle>
            <CardDescription>Update profil singkat dan visi misi dusun.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentForm 
              section="about"
              initialData={{
                about_title: settingsObj.about_title || "Tentang Dusun Karang Anyar",
                about_description: settingsObj.about_description || "Dusun Karang Anyar adalah sebuah permukiman asri yang terletak di daerah dataran tinggi. Dengan tanah yang subur dan cuaca yang mendukung...",
                about_location: settingsObj.about_location || "Balai Dusun Karang Anyar, Kec. XYZ, Kab. ABC, Provinsi DEF 12345",
                about_maps_url: settingsObj.about_maps_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.5731164!3d-6.9034443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477d%3A0x10d6ad120c09060b!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1714631234567!5m2!1sen!2sid",
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
