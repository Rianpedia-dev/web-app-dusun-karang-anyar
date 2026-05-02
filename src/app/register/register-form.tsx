"use client";

import { useState } from "react";
import { register } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    const result = await register(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input id="name" name="name" type="text" placeholder="Masukkan nama Anda" required disabled={loading} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Nomor HP / WhatsApp</Label>
        <Input id="phone" name="phone" type="text" placeholder="Contoh: 628123456789" required disabled={loading} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="contoh@email.com" required disabled={loading} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Kata Sandi</Label>
        <Input id="password" name="password" type="password" required disabled={loading} />
      </div>
      <Button className="w-full" size="lg" type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Memproses...
          </>
        ) : (
          "Daftar Sekarang"
        )}
      </Button>
    </form>
  );
}
