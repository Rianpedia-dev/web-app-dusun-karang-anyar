"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateSetting } from "@/lib/actions/settings";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

interface ContentFormProps {
  section: "home" | "about" | "footer";
  initialData: Record<string, string>;
}

export function ContentForm({ section, initialData }: ContentFormProps) {
  const [data, setData] = useState(initialData);
  const [isPending, setIsPending] = useState(false);

  const handleChange = (key: string, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!navigator.onLine) {
      toast.error("Tidak ada koneksi internet. Silakan cek sinyal Anda.");
      return;
    }

    setIsPending(true);
    
    try {
      const promises = Object.entries(data).map(([key, value]) => 
        updateSetting(key, value)
      );
      
      await Promise.all(promises);
      toast.success("Konten berhasil diperbarui!");
    } catch (error) {
      toast.error("Gagal memperbarui konten.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <Label htmlFor={key} className="capitalize">
            {key.split('_').join(' ')}
          </Label>
          {value.length > 100 ? (
            <Textarea
              id={key}
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              rows={4}
              className="bg-slate-50"
            />
          ) : (
            <Input
              id={key}
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              className="bg-slate-50"
            />
          )}
        </div>
      ))}
      
      <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700">
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        Simpan Perubahan
      </Button>
    </form>
  );
}
