'use client';
import type { ReactNode } from "react";
import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Header } from "@/components/layout/header";
import { usePathname } from "next/navigation";

export function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/login') {
    return <div className="h-screen">{children}</div>;
  }
  
  const isDashboard = pathname === '/';

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarNav />
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header />
        <main className={`flex-1 ${isDashboard ? 'flex flex-col' : 'overflow-y-auto'}`}>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
