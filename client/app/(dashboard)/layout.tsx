"use client";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import React, { ReactNode, useEffect, useState } from "react";
import AppSideBar from "./_components/AppSideBar";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { usePathname, useRouter } from "next/navigation";

const DashbaordLayout = ({ children }: { children: ReactNode }) => {
  const { data: response, isLoading: authLoading } = useAuthenticatedUser();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const role = response?.data?.role;
    if (
      (role === "manager" && pathname.startsWith("/tenants")) ||
      (role === "tenants" && pathname.startsWith("/managers"))
    ) {
      router.push(
        role === "manager" ? "/managers/properties" : "/tenants/favorites"
      );
    } else {
      setIsLoading(false);
    }
  }, [response, router, pathname]);

  if (authLoading || isLoading) return <>Loading...</>;
  if (!response) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-primary-100 w-full">
        <Navbar isDashboard={true} />

        <div style={{ marginTop: `${NAVBAR_HEIGHT}px` }} />
        <main className="flex">
          <AppSideBar userType={response?.data?.role} />
          <div className="flex-grow transition-all duration-300">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashbaordLayout;
