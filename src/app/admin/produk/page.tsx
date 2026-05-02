import { getProducts } from "@/lib/actions/product";
import { AdminProductList } from "./product-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminProdukPage() {
  const allProducts = await getProducts({ approvedOnly: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground tracking-tight">Manajemen Produk</h1>
          <p className="text-muted-foreground">Kelola, tambah, edit, atau hapus produk.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
          <Link href="/admin/produk/tambah">
            <Plus className="mr-2 h-4 w-4" /> Tambah Produk
          </Link>
        </Button>
      </div>

      <AdminProductList initialProducts={allProducts} />
    </div>
  );
}
