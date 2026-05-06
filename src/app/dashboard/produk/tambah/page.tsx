import { getUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { AddProductForm } from "./product-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function TambahProdukPage() {
  const user = await getUser();
  
  if (!user) {
    redirect("/login");
  }

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
        <CardContent className="p-6">
          <AddProductForm 
            sellerId={user.id} 
            sellerContact={user.profile?.phone || ""} 
            redirectPath="/dashboard/produk"
            isAdmin={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
