"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, Eye } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { formatRupiah } from "@/components/product-card";

export default function AdminProdukPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Combine some pending mock products just for the UI
  const allProducts = [
    ...MOCK_PRODUCTS,
    {
      id: "p-pending-1",
      name: "Gula Aren Asli",
      description: "Gula aren murni cetak.",
      price: 25000,
      category: "Olahan",
      imageUrl: "https://images.unsplash.com/photo-1621317762692-05f32a7620bc?w=600",
      sellerId: "u5",
      sellerName: "Mbah Warni",
      sellerLocation: "RT 04",
      sellerContact: "0812",
      views: 0,
      contactClicks: 0,
      isApproved: false,
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Moderasi Produk</h1>
        <p className="text-slate-500">Review dan kelola semua produk yang diposting oleh warga.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Cari nama produk atau penjual..."
              className="pl-8"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-slate-100">Semua</Button>
            <Button variant="outline" size="sm" className="text-amber-600 border-amber-200 bg-amber-50">Menunggu</Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>Penjual</TableHead>
                <TableHead>Kategori & Harga</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded overflow-hidden bg-slate-100 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="font-medium max-w-[200px] truncate">{product.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{product.sellerName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="text-slate-500">{product.category}</span>
                      <br/>
                      <span className="font-medium">{formatRupiah(product.price)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {product.isApproved ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Disetujui</Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Menunggu</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" title="Lihat Detail">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {!product.isApproved ? (
                        <>
                          <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700 hover:bg-green-50" title="Setujui">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50" title="Tolak">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50" title="Cabut Izin Tayang">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
