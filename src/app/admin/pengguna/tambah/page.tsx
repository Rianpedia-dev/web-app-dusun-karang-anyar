import { getUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AddAdminForm } from "./add-admin-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminTambahPenggunaPage() {
  const user = await getUser();
  
  if (!user || user.profile?.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/admin/pengguna">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Kembali</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground">Tambah Admin Baru</h1>
          <p className="text-muted-foreground text-sm">Tambahkan rekan admin untuk membantu mengelola marketplace.</p>
        </div>
      </div>

      <Card className="border-border bg-card shadow-lg">
        <CardHeader>
          <CardTitle>Data Akun</CardTitle>
          <CardDescription>
            Informasi ini akan digunakan untuk identitas admin di platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddAdminForm />
        </CardContent>
      </Card>
      
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-primary/80">
        <strong>Info:</strong> Admin baru yang didaftarkan akan otomatis mendapatkan peran sebagai administrator sistem.
      </div>
    </div>
  );
}
