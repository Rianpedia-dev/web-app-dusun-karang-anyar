"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePlus, Save, Loader2, X } from "lucide-react";
import { createProduct } from "@/lib/actions/product";
import { uploadProductImage } from "@/lib/supabase/storage";
import { useRouter } from "next/navigation";

export function AddProductForm({ sellerId, sellerContact }: { sellerId: string, sellerContact: string }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
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
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadProductImage(image);
      }

      const productData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: parseInt(formData.get("price") as string),
        category: formData.get("category"),
        imageUrl: imageUrl,
        sellerId: sellerId,
        sellerName: formData.get("sellerName"),
        contact: sellerContact || formData.get("contact") || "", // Default contact from profile
        isApproved: true, // Auto approve if added by admin
      };

      await createProduct(productData);
      router.push("/dashboard/produk");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Gagal menambahkan produk. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label>Foto Produk</Label>
        <div 
          className="relative border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors min-h-[200px]"
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          {preview ? (
            <div className="relative w-full aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-md" />
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setPreview(null); setImage(null); }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ImagePlus className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">Klik untuk unggah foto</p>
              <p className="text-sm text-muted-foreground mt-1">Maksimal 5MB, format JPG/PNG</p>
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
            <Label htmlFor="name">Nama Produk</Label>
            <Input id="name" name="name" placeholder="Contoh: Beras Organik" required disabled={loading} className="bg-background border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sellerName">Nama Penjual / Pemilik</Label>
            <Input id="sellerName" name="sellerName" placeholder="Contoh: Mbah Warni" required disabled={loading} className="bg-background border-border" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select name="category" required disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pertanian">Hasil Pertanian</SelectItem>
                <SelectItem value="Peternakan">Hasil Peternakan</SelectItem>
                <SelectItem value="Olahan">Produk Olahan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Harga (Rp)</Label>
            <Input id="price" name="price" type="number" placeholder="Contoh: 15000" required disabled={loading} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact">Nomor WhatsApp untuk Produk Ini</Label>
          <Input id="contact" name="contact" defaultValue={sellerContact} placeholder="Contoh: 628123456789" required disabled={loading} />
          <p className="text-xs text-muted-foreground">Pembeli akan menghubungi nomor ini.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi Produk</Label>
          <Textarea 
            id="description" 
            name="description"
            placeholder="Jelaskan detail produk Anda (ukuran, berat, kualitas, dll)..." 
            rows={5}
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="pt-4 border-t flex justify-end gap-4">
        <Button variant="outline" type="button" disabled={loading} onClick={() => router.back()}>
          Batal
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Simpan & Ajukan
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
