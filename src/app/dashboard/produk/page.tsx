import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getUser } from "@/lib/actions/auth";
import { getProducts } from "@/lib/actions/product";
import { redirect } from "next/navigation";
import { MyProductList } from "./my-product-list";

export default async function ProdukDusunPage() {
  const user = await getUser();
  
  if (!user) {
    redirect("/login");
  }

  const isAdmin = user.profile?.role === "admin";
  const allProducts = await getProducts({ approvedOnly: false });
  
  // Jika admin, tampilkan semua produk. Jika bukan, tampilkan produk miliknya saja.
  const productsToShow = isAdmin ? allProducts : allProducts.filter(p => p.sellerId === user.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">
            {isAdmin ? "Produk Dusun" : "Produk Saya"}
          </h1>
          <p className="text-muted-foreground">
            {isAdmin 
              ? "Kelola semua produk yang ada di marketplace Dusun Karang Anyar." 
              : "Kelola semua produk yang Anda jual di marketplace."}
          </p>
        </div>
      </div>

      <MyProductList initialProducts={productsToShow} isAdmin={isAdmin} />
    </div>
  );
}
