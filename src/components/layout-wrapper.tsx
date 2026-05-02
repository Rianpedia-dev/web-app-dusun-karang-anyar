"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide navbar and footer on admin and dashboard pages
  const isHideLayout = pathname.startsWith("/admin") || pathname.startsWith("/dashboard");

  return (
    <>
      {!isHideLayout && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isHideLayout && <Footer />}
    </>
  );
}
