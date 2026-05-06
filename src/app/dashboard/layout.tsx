import Link from "next/link";
import { LayoutDashboard, Package, PlusCircle, User, LogOut, Store, ShieldCheck } from "lucide-react";
import { getUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const isAdmin = user.profile?.role === "admin";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="w-full md:w-64 bg-muted/30 border-r flex-shrink-0 md:min-h-[calc(100vh-4rem)]">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-lg mb-8 text-foreground">
            {isAdmin ? (
              <>
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <span>Panel Admin</span>
              </>
            ) : (
              <>
                <Store className="h-5 w-5 text-primary" />
                <span>Panel Penjual</span>
              </>
            )}
          </div>
          <nav className="space-y-2">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium transition-colors hover:bg-primary/20"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link 
              href="/dashboard/produk" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground font-medium transition-colors hover:bg-muted hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Produk </Link>
            <Link 
              href="/dashboard/profil" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground font-medium transition-colors hover:bg-muted hover:text-foreground"
            >
              <User className="h-5 w-5" />
              Profil Saya
            </Link>
            <div className="pt-8 mt-4 border-t border-border">
              <Link 
                href="/logout" 
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-destructive font-medium transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-background">
        {children}
      </main>
    </div>
  );
}
