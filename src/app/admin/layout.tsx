import Link from "next/link";
import { LayoutDashboard, Users, Package, FileCheck, LogOut, ShieldCheck } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 border-r flex-shrink-0 md:min-h-[calc(100vh-4rem)]">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-lg mb-8">
            <ShieldCheck className="h-5 w-5 text-blue-400" />
            <span>Admin Panel</span>
          </div>
          <nav className="space-y-2">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800 text-white font-medium transition-colors hover:bg-slate-700"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link 
              href="/admin/produk" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 font-medium transition-colors hover:bg-slate-800 hover:text-white"
            >
              <FileCheck className="h-5 w-5" />
              Moderasi Produk
            </Link>
            <Link 
              href="/admin/pengguna" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 font-medium transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Users className="h-5 w-5" />
              Data Pengguna
            </Link>
            
            <div className="pt-8 mt-4 border-t border-slate-800">
              <Link 
                href="/" 
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 font-medium transition-colors hover:bg-red-400/10"
              >
                <LogOut className="h-5 w-5" />
                Keluar
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-slate-50">
        {children}
      </main>
    </div>
  );
}
