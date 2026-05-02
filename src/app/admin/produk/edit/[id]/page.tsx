import { getUser } from "@/lib/actions/auth";
import { getProductById } from "@/lib/actions/product";
import { redirect, notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EditProductForm } from "./edit-product-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminEditProdukPage({ params }: { params: { id: string } }) {
  const user = await getUser();
  const { id } = await params;
  
  if (!user || user.profile?.role !== "admin") {
    redirect("/login");
  }

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/admin/produk">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Kembali</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground">Edit Produk</h1>
          <p className="text-muted-foreground text-sm">Perbarui informasi produk {product.name}.</p>
        </div>
      </div>

      <Card className="border-border bg-card shadow-lg">
        <CardHeader>
          <CardTitle>Informasi Produk</CardTitle>
          <CardDescription>
            Ubah detail produk di bawah ini. Perubahan akan langsung terlihat di katalog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditProductForm product={product} />
        </CardContent>
      </Card>
    </div>
  );
}
