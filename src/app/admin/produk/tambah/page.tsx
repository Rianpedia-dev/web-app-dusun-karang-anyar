import { getUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { AddProductForm } from "@/app/dashboard/produk/tambah/product-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminTambahProdukPage() {
  const user = await getUser();
  
  if (!user || user.profile?.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/produk">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Kembali</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">Tambah Produk Baru</h1>
          <p className="text-slate-500">Sebagai Admin, Anda dapat menambahkan produk langsung atas nama Anda atau warga.</p>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-8">
          <AddProductForm 
            sellerId={user.id} 
            sellerContact={user.profile?.phone || ""} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
