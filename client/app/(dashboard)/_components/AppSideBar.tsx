import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Building,
  FileText,
  Heart,
  Home,
  Menu,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AppSideBar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();

  const managerLinks = [
    { icon: Building, label: "Properties", href: "/managers/properties" },
    { icon: FileText, label: "Applications", href: "/managers/applications" },
    { icon: Settings, label: "Settings", href: "/managers/settings" },
  ];
  const tenantLinks = [
    { icon: Heart, label: "Favorites", href: "/tenants/favorites" },
    { icon: FileText, label: "Applications", href: "/tenants/applications" },
    { icon: Home, label: "Residences", href: "/tenants/residences" },
    { icon: Settings, label: "Settings", href: "/tenants/settings" },
  ];
  const navLinks = userType === "manager" ? managerLinks : tenantLinks;

  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 bg-white shadow-lg"
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex min-h-[56px] w-full items-center pt-3 mb-3 ",
                open ? "justify-between px-4" : "justify-center"
              )}
            >
              {open ? (
                <>
                  <h1 className="text-xl font-bold text-gray-800">
                    {userType === "manager" ? "Manager View" : "Renter View"}
                  </h1>
                  <Button
                    variant="ghost"
                    className="hover:bg-gray-100 p-2 rounded-md"
                    onClick={() => toggleSidebar()}
                  >
                    <X className="h-6 w-6 stroke-gray-600" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  className="hover:bg-gray-100 p-2 rounded-md"
                  onClick={() => toggleSidebar()}
                >
                  <Menu className="h-6 w-6 stroke-gray-600" />
                </Button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center px-5 py-7",
                    isActive
                      ? "bg-gray-100"
                      : "text-gray-600 hover:bg-gray-100",
                    open ? "text-secondary-600" : "ml-[5px]"
                  )}
                >
                  <Link href={link.href} className="w-full" scroll={false}>
                    <div className="flex items-center gap-3">
                      <link.icon
                        className={`h-5 w-5 ${
                          isActive ? "stroke-secondary-600" : "stroke-gray-600"
                        }`}
                      />
                      <span
                        className={`${
                          isActive ? "text-secondary-600" : "text-gray-600"
                        }`}
                      >
                        {link.label}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
