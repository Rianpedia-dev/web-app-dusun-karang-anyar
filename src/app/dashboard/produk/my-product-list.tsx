"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Edit, Trash2, Eye, CheckCircle, XCircle } from "lucide-react";
import { formatRupiah } from "@/components/product-card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteProduct, approveProduct, rejectProduct } from "@/lib/actions/product";
import { useRouter } from "next/navigation";

export function MyProductList({ initialProducts, isAdmin = false }: { initialProducts: any[], isAdmin?: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredProducts = initialProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (isAdmin && p.sellerName?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id: string) => {
    if (confirm("Hapus produk ini secara permanen?")) {
      await deleteProduct(id);
      router.refresh();
    }
  };

  const handleApprove = async (id: string) => {
    if (confirm("Setujui produk ini untuk ditayangkan?")) {
      await approveProduct(id);
      router.refresh();
    }
  };

  const handleReject = async (id: string) => {
    if (confirm("Cabut izin tayang atau tolak produk ini?")) {
      await rejectProduct(id);
      router.refresh();
    }
  };

  return (
    <div className="bg-card border rounded-lg overflow-hidden shadow-sm">
      <div className="p-4 border-b bg-muted/20">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={isAdmin ? "Cari nama produk atau penjual..." : "Cari produk Anda..."}
            className="pl-8 bg-background border-primary/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              {isAdmin && <TableHead>Penjual</TableHead>}
              <TableHead>Kategori</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isAdmin ? 6 : 5} className="h-24 text-center text-muted-foreground">
                  Tidak ada produk ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded overflow-hidden bg-muted flex-shrink-0 border">
                        {product.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                        )}
                      </div>
                      <div className="font-medium max-w-[200px] truncate">{product.name}</div>
                    </div>
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-sm font-medium text-slate-700">
                      {product.sellerName || "Warga Dusun"}
                    </TableCell>
                  )}
                  <TableCell>
                    <Badge variant="outline" className="font-normal">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{formatRupiah(product.price)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.isApproved ? "default" : "secondary"}
                      className={product.isApproved ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200" : "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200"}
                    >
                      {product.isApproved ? "Aktif" : "Menunggu Review"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Opsi Kelola</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={`/produk/${product.id}`} target="_blank">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" /> Lihat Halaman
                          </DropdownMenuItem>
                        </Link>
                        
                        {isAdmin && (
                          <>
                            {product.isApproved ? (
                              <DropdownMenuItem 
                                className="cursor-pointer text-amber-600 focus:text-amber-600"
                                onClick={() => handleReject(product.id)}
                              >
                                <XCircle className="mr-2 h-4 w-4" /> Tarik dari Toko
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                className="cursor-pointer text-green-600 focus:text-green-600"
                                onClick={() => handleApprove(product.id)}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" /> Setujui Produk
                              </DropdownMenuItem>
                            )}
                          </>
                        )}

                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" /> Edit Produk
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive cursor-pointer"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Hapus Permanen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
