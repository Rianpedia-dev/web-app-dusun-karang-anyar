import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Users, Package, FileCheck, LogOut, Home, Menu } from "lucide-react";
import { getUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  // Security check: Only allow admins
  if (!user || user.profile?.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-card sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3 font-bold text-lg text-card-foreground">
          <div className="relative h-8 w-8 overflow-hidden rounded-md border border-border bg-background p-1">
            <Image src="/favicon.ico" alt="Logo Karang Anyar" fill className="object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <span>Super Admin</span>
          </div>
        </div>
        <Sheet>
          <SheetTrigger className="p-2 -mr-2 text-foreground">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-card p-0 flex flex-col border-l">
            <SheetTitle className="sr-only">Menu Admin</SheetTitle>
            <div className="p-6 overflow-y-auto h-full">
              <div className="flex items-center gap-4 font-bold text-xl mb-10 text-card-foreground">
                <div className="relative h-12 w-12 overflow-hidden rounded-lg shadow-lg border border-border bg-background p-2">
                  <Image src="/favicon.ico" alt="Logo Karang Anyar" fill className="object-contain" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span>Super Admin</span>
                  <span className="text-[10px] font-medium text-primary uppercase tracking-widest">Dashboard</span>
                </div>
              </div>
              <nav className="space-y-1.5">
                <SheetClose nativeButton={false} render={<Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium border border-primary/20 shadow-sm" />}>
                  <LayoutDashboard className="h-5 w-5" /> Dashboard
                </SheetClose>
                <SheetClose nativeButton={false} render={<Link href="/admin/produk" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground font-medium transition-all hover:bg-muted hover:text-foreground" />}>
                  <Package className="h-5 w-5" /> Semua Produk
                </SheetClose>
                <SheetClose nativeButton={false} render={<Link href="/admin/pengguna" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground font-medium transition-all hover:bg-muted hover:text-foreground" />}>
                  <Users className="h-5 w-5" /> Data Pengguna
                </SheetClose>
                <SheetClose nativeButton={false} render={<Link href="/admin/konten" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground font-medium transition-all hover:bg-muted hover:text-foreground" />}>
                  <FileCheck className="h-5 w-5" /> Kelola Konten
                </SheetClose>
                
                <div className="pt-8 mt-6 border-t border-border space-y-1.5">
                  <SheetClose nativeButton={false} render={<Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground font-medium transition-all hover:bg-muted hover:text-foreground" />}>
                    <Home className="h-5 w-5" /> Lihat Website
                  </SheetClose>
                  <form action="/logout" method="POST">
                    <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 font-medium transition-all hover:bg-red-500/10">
                      <LogOut className="h-5 w-5" /> Logout
                    </button>
                  </form>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar Desktop */}
        <aside className="hidden md:block w-64 bg-card border-r flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-4 font-bold text-xl mb-10 text-card-foreground">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg shadow-lg border border-border bg-background p-2">
                <Image src="/favicon.ico" alt="Logo Karang Anyar" fill className="object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span>Super Admin</span>
                <span className="text-[10px] font-medium text-primary uppercase tracking-widest">Dashboard</span>
              </div>
            </div>
            
            <nav className="space-y-1.5">
              <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium border border-primary/20 shadow-sm">
                <LayoutDashboard className="h-5 w-5" /> Dashboard
              </Link>
              <Link href="/admin/produk" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground font-medium transition-all hover:bg-muted hover:text-foreground">
                <Package className="h-5 w-5" /> Semua Produk
              </Link>
              <Link href="/admin/pengguna" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground font-medium transition-all hover:bg-muted hover:text-foreground">
                <Users className="h-5 w-5" /> Data Pengguna
              </Link>
              <Link href="/admin/konten" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground font-medium transition-all hover:bg-muted hover:text-foreground">
                <FileCheck className="h-5 w-5" /> Kelola Konten
              </Link>
              
              <div className="pt-8 mt-6 border-t border-border space-y-1.5">
                <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground font-medium transition-all hover:bg-muted hover:text-foreground">
                  <Home className="h-5 w-5" /> Lihat Website
                </Link>
                <form action="/logout" method="POST">
                  <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 font-medium transition-all hover:bg-red-500/10">
                    <LogOut className="h-5 w-5" /> Logout
                  </button>
                </form>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
