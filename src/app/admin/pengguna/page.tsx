"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Ban, UserCheck } from "lucide-react";

export default function AdminPenggunaPage() {
  const users = [
    { id: "u1", name: "Pak Budi", phone: "081234567890", role: "Penjual", status: "Aktif", joined: "2023-09-15" },
    { id: "u2", name: "Bu Siti", phone: "089876543210", role: "Penjual", status: "Aktif", joined: "2023-09-16" },
    { id: "u3", name: "Kang Herman", phone: "081122334455", role: "Penjual", status: "Aktif", joined: "2023-09-20" },
    { id: "u4", name: "Mbah Warni", phone: "085566778899", role: "Penjual", status: "Aktif", joined: "2023-10-05" },
    { id: "u5", name: "User Pelanggar", phone: "0877...", role: "Penjual", status: "Diblokir", joined: "2023-11-01" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Data Pengguna</h1>
        <p className="text-slate-500">Kelola akun penjual yang terdaftar di platform.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Cari nama atau nomor HP..."
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Pengguna</TableHead>
                <TableHead>Nomor HP / WA</TableHead>
                <TableHead>Tanggal Gabung</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Aktif" ? "default" : "destructive"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {user.status === "Aktif" ? (
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Ban className="mr-2 h-4 w-4" /> Blokir
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                        <UserCheck className="mr-2 h-4 w-4" /> Buka Blokir
                      </Button>
                    )}
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
