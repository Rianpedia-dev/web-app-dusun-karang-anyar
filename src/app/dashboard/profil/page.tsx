"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-serif font-bold tracking-tight">Profil Saya</h1>
        <p className="text-muted-foreground">Kelola informasi pribadi dan toko Anda.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Dasar</CardTitle>
          <CardDescription>
            Data ini akan ditampilkan di halaman produk Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">PB</AvatarFallback>
            </Avatar>
            <Button variant="outline">Ubah Foto</Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Penjual / Toko</Label>
              <Input id="name" defaultValue="Pak Budi" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor HP (WhatsApp)</Label>
              <Input id="phone" defaultValue="081234567890" />
              <p className="text-xs text-muted-foreground">Nomor ini digunakan pembeli untuk menghubungi Anda.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Alamat (RT/RW)</Label>
              <Input id="address" defaultValue="RT 01 / RW 02, Karang Anyar" />
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button>
              <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
