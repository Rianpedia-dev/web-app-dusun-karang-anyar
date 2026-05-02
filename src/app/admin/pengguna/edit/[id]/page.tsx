import { getUser } from "@/lib/actions/auth";
import { getAdminById } from "@/lib/actions/admin";
import { redirect, notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EditAdminForm } from "./edit-admin-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminEditUserPage({ params }: { params: { id: string } }) {
  const user = await getUser();
  const { id } = await params;
  
  if (!user || user.profile?.role !== "admin") {
    redirect("/login");
  }

  const adminToEdit = await getAdminById(id);

  if (!adminToEdit) {
    notFound();
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
          <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground">Edit Data Admin</h1>
          <p className="text-muted-foreground text-sm">Perbarui profil atau ganti password untuk {adminToEdit.name}.</p>
        </div>
      </div>

      <Card className="border-border bg-card shadow-lg">
        <CardHeader>
          <CardTitle>Profil Admin</CardTitle>
          <CardDescription>
            Ubah nama, nomor HP, atau atur ulang password di bawah ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditAdminForm admin={adminToEdit} />
        </CardContent>
      </Card>
    </div>
  );
}
