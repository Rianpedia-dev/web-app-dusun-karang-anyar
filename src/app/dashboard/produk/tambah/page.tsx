"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ImagePlus, Save } from "lucide-react";

export default function TambahProdukPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/produk">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Kembali</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">Tambah Produk</h1>
          <p className="text-muted-foreground">Informasi produk akan di-review oleh admin sebelum tayang.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-8">
          {/* Image Upload Placeholder */}
          <div className="space-y-2">
            <Label>Foto Produk</Label>
            <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ImagePlus className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">Klik untuk unggah foto</p>
              <p className="text-sm text-muted-foreground mt-1">Maksimal 5MB, format JPG/PNG</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Produk</Label>
              <Input id="name" placeholder="Contoh: Beras Organik Pandan Wangi" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pertanian">Hasil Pertanian</SelectItem>
                    <SelectItem value="peternakan">Hasil Peternakan</SelectItem>
                    <SelectItem value="olahan">Produk Olahan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input id="price" type="number" placeholder="Contoh: 15000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Produk</Label>
              <Textarea 
                id="description" 
                placeholder="Jelaskan detail produk Anda (ukuran, berat, kualitas, dll)..." 
                rows={5}
              />
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard/produk">Batal</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/produk">
                <Save className="mr-2 h-4 w-4" /> Simpan & Ajukan
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
