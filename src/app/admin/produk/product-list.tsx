"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Pencil, Trash2 } from "lucide-react";
import { formatRupiah } from "@/components/product-card";
import { deleteProduct } from "@/lib/actions/product";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AdminProductList({ initialProducts }: { initialProducts: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredProducts = initialProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.sellerName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleDelete = async (id: string) => {
    if (confirm("Hapus produk ini secara permanen?")) {
      await deleteProduct(id);
      router.refresh();
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari nama produk atau penjual..."
            className="pl-8 bg-background border-border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-semibold">Produk</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Penjual / Pemilik</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Kategori & Harga</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  Tidak ada produk yang ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-border hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border">
                        {product.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-muted-foreground/40">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="font-semibold text-foreground max-w-[200px] truncate">{product.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-foreground">{product.sellerName || "Unknown"}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="text-muted-foreground">{product.category}</span>
                      <br/>
                      <span className="font-bold text-foreground">{formatRupiah(product.price)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/10" asChild title="Edit Produk">
                        <Link href={`/admin/produk/edit/${product.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:text-destructive hover:bg-destructive/10" 
                        title="Hapus Produk"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
