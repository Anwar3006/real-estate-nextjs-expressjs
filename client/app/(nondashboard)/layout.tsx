"use client";
import Navbar from "@/components/Navbar";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { usePathname, useRouter } from "next/navigation";

import { ReactNode, useEffect, useState } from "react";

const NonDashboardLayout = ({ children }: { children: ReactNode }) => {
  const { data: response, isLoading: authLoading } = useAuthenticatedUser();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const role = response?.data?.role;
    if (
      (role === "manager" && pathname.startsWith("/search")) ||
      (role === "manager" && pathname === "/")
    ) {
      router.push("/managers/properties");
    } else {
      setIsLoading(false);
    }
  }, [response, router, pathname]);

  if (authLoading || isLoading) return <>Loading...</>;

  return (
    <div className="w-full h-full">
      <Navbar isDashboard={false} />

      <main className="flex flex-col w-full h-full">{children}</main>
    </div>
  );
};

export default NonDashboardLayout;
