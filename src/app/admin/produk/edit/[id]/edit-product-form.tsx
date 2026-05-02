"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePlus, Save, Loader2, X, AlertCircle } from "lucide-react";
import { updateProduct } from "@/lib/actions/product";
import { uploadProductImage } from "@/lib/supabase/storage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function EditProductForm({ product }: { product: any }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(product.imageUrl);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      let imageUrl = product.imageUrl;

      if (image) {
        imageUrl = await uploadProductImage(image);
      }

      const productData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: parseInt(formData.get("price") as string),
        category: formData.get("category"),
        imageUrl: imageUrl,
        sellerName: formData.get("sellerName"),
        contact: formData.get("contact") || "",
        isApproved: true,
      };

      const result = await updateProduct(product.id, productData);
      
      if (result.success) {
        toast.success("Produk berhasil diperbarui");
        router.push("/admin/produk");
        router.refresh();
      } else {
        toast.error(result.error || "Gagal memperbarui produk");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Terjadi kesalahan sistem. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label className="text-foreground">Foto Produk</Label>
        <div 
          className="relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-all border-border min-h-[240px]"
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          {preview ? (
            <div className="relative w-full aspect-video flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview" className="max-w-full max-h-[200px] object-contain rounded-lg shadow-md" />
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setPreview(null); setImage(null); }}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ImagePlus className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium text-foreground">Klik untuk ganti foto</p>
              <p className="text-xs text-muted-foreground mt-1">Maksimal 5MB, format JPG/PNG</p>
            </>
          )}
          <input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageChange}
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Nama Produk</Label>
            <Input 
              id="name" 
              name="name" 
              defaultValue={product.name}
              placeholder="Contoh: Beras Organik" 
              required 
              disabled={loading} 
              className="bg-background border-border focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sellerName" className="text-foreground">Nama Penjual / Pemilik</Label>
            <Input 
              id="sellerName" 
              name="sellerName" 
              defaultValue={product.sellerName}
              placeholder="Contoh: Mbah Warni" 
              required 
              disabled={loading} 
              className="bg-background border-border focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground">Kategori</Label>
            <Select name="category" defaultValue={product.category} required disabled={loading}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="Pertanian">Hasil Pertanian</SelectItem>
                <SelectItem value="Peternakan">Hasil Peternakan</SelectItem>
                <SelectItem value="Olahan">Produk Olahan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-foreground">Harga (Rp)</Label>
            <Input 
              id="price" 
              name="price" 
              type="number" 
              defaultValue={product.price}
              placeholder="Contoh: 15000" 
              required 
              disabled={loading} 
              className="bg-background border-border focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact" className="text-foreground">Nomor WhatsApp</Label>
          <Input 
            id="contact" 
            name="contact" 
            defaultValue={product.sellerContact}
            placeholder="Contoh: 628123456789" 
            required 
            disabled={loading} 
            className="bg-background border-border focus-visible:ring-primary"
          />
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Pembeli akan menghubungi nomor ini langsung.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-foreground">Deskripsi Produk</Label>
          <Textarea 
            id="description" 
            name="description"
            defaultValue={product.description}
            placeholder="Jelaskan detail produk Anda (ukuran, berat, kualitas, dll)..." 
            rows={5}
            required
            disabled={loading}
            className="bg-background border-border focus-visible:ring-primary resize-none"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-border flex justify-end gap-4">
        <Button 
          variant="outline" 
          type="button" 
          disabled={loading} 
          onClick={() => router.back()}
          className="rounded-full px-6"
        >
          Batal
        </Button>
        <Button 
          type="submit" 
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/20"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Perbarui Produk
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
