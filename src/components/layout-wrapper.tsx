"use client";

import { usePathname } from "next/navigation";

interface LayoutWrapperProps {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}

export function LayoutWrapper({ children, navbar, footer }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Hide navbar and footer on admin and dashboard pages
  const isHideLayout = pathname.startsWith("/admin") || pathname.startsWith("/dashboard");

  return (
    <>
      {!isHideLayout && navbar}
      <main className="flex-1">
        {children}
      </main>
      {!isHideLayout && footer}
    </>
  );
}
