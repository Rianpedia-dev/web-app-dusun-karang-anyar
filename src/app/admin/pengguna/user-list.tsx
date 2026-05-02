"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Ban, Shield, Pencil, Trash2 } from "lucide-react";
import { deleteUser } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AdminUserList({ initialUsers }: { initialUsers: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Filter only admin users for this view as requested
  const admins = initialUsers.filter(u => u.role === "admin");
  
  const filteredUsers = admins.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari nama admin..."
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
              <TableHead className="text-muted-foreground font-semibold">Nama Admin</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Nomor HP / WA</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Peran</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Tanggal Gabung</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  Tidak ada admin ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-border hover:bg-muted/50 transition-colors">
                  <TableCell className="font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      {user.name}
                      <Shield className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.phone || "-"}</TableCell>
                  <TableCell>
                    <Badge className="bg-primary text-primary-foreground border-none">
                      Administrator
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{new Date(user.createdAt).toLocaleDateString("id-ID")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild className="text-primary hover:bg-primary/10" title="Edit Admin">
                        <Link href={`/admin/pengguna/edit/${user.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:bg-destructive/10"
                        title="Hapus Admin"
                        onClick={async () => {
                          if (confirm("Hapus akun admin ini? Tindakan ini tidak dapat dibatalkan.")) {
                            await deleteUser(user.id);
                            router.refresh();
                          }
                        }}
                      >
                        <Ban className="h-4 w-4" />
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
