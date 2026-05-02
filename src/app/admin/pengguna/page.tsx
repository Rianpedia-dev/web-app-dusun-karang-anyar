import { getUsers } from "@/lib/actions/admin";
import { AdminUserList } from "./user-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminPenggunaPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground tracking-tight">Data Pengguna</h1>
          <p className="text-muted-foreground">Kelola akun administrator platform.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
          <Link href="/admin/pengguna/tambah">
            <Plus className="mr-2 h-4 w-4" /> Tambah Pengguna
          </Link>
        </Button>
      </div>

      <AdminUserList initialUsers={users} />
    </div>
  );
}
