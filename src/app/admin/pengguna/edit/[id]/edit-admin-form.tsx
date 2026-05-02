"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2, AlertCircle, KeyRound } from "lucide-react";
import { updateAdmin } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function EditAdminForm({ admin }: { admin: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password && password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      setLoading(false);
      return;
    }

    if (password && password.length < 6) {
      setError("Password minimal 6 karakter");
      setLoading(false);
      return;
    }

    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      password: password || null,
    };

    const result = await updateAdmin(admin.id, data);

    if (result.success) {
      toast.success("Data admin berhasil diperbarui");
      router.push("/admin/pengguna");
      router.refresh();
    } else {
      setError(result.error || "Gagal memperbarui data admin");
      toast.error(result.error || "Gagal memperbarui data admin");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 flex items-center gap-3 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input 
            id="name" 
            name="name" 
            defaultValue={admin.name}
            placeholder="Contoh: Budi Santoso" 
            required 
            disabled={loading}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Nomor HP / WhatsApp</Label>
          <Input 
            id="phone" 
            name="phone" 
            defaultValue={admin.phone}
            placeholder="Contoh: 628123456789" 
            disabled={loading}
            className="bg-background border-border"
          />
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-4">
            <KeyRound className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Ubah Password (Opsional)</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4 italic">Kosongkan jika tidak ingin mengubah password.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password Baru</Label>
              <Input 
                id="password" 
                name="password" 
                type="password"
                placeholder="••••••••" 
                disabled={loading}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password"
                placeholder="••••••••" 
                disabled={loading}
                className="bg-background border-border"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end gap-4 border-t border-border">
        <Button 
          variant="outline" 
          type="button" 
          disabled={loading} 
          onClick={() => router.back()}
          className="rounded-full px-6"
        >
          Batal
        </Button>
        <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/20">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
