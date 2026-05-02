"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2, AlertCircle } from "lucide-react";
import { registerAdmin } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AddAdminForm() {
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

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      setLoading(false);
      return;
    }

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: password,
    };

    const result = await registerAdmin(data);

    if (result.success) {
      toast.success("Admin baru berhasil didaftarkan");
      router.push("/admin/pengguna");
      router.refresh();
    } else {
      setError(result.error || "Gagal mendaftarkan admin");
      toast.error(result.error || "Gagal mendaftarkan admin");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 flex items-center gap-3 text-destructive text-sm animate-in fade-in slide-in-from-top-2">
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
            placeholder="Contoh: Budi Santoso" 
            required 
            disabled={loading}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Alamat Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email"
            placeholder="admin.baru@karanganyar.com" 
            required 
            disabled={loading}
            className="bg-background border-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password"
              placeholder="••••••••" 
              required 
              disabled={loading}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
            <Input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password"
              placeholder="••••••••" 
              required 
              disabled={loading}
              className="bg-background border-border"
            />
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
              Mendaftarkan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Simpan Admin
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
