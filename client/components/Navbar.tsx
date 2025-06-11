"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { SignedOut } from "@clerk/nextjs";
import {
  SignedIn,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { usePathname, useRouter } from "next/navigation";
import { Bell, MessageCircle, Plus, Search, Settings } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = ({ isDashboard }: { isDashboard: boolean }) => {
  // to track if the navbar is scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const { data: response, isLoading, error } = useAuthenticatedUser();

  const firstName = response?.data?.name.split(" ")[0];
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenants");

  const handleResize = useCallback(() => {
    setIsMobileView(window.innerWidth > 640);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // check if the page is scrolled more than 50px
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    //initial check
    handleResize();

    // add scroll event listener
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize, { passive: true });

    // cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <div
      className={`z-50 shadow-xl fixed top-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isScrolled && !isDashboard
          ? "left-1/2 transform -translate-x-1/2 bg-primary-800/80 backdrop-blur-md rounded-2xl w-2/3 mt-3"
          : `w-full ${
              isDashboard ? "bg-black/75" : "bg-black/20"
            } rounded-none left-0`
      }`}
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full max-w-[1440px] py-3 px-4 sm:px-8 text-white mx-auto">
        <div className="flex items-center gap-4 md:gap-6">
          {isDashboardPage && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}
          <Link
            href="/"
            className="cursor-pointer hover:!text-primary-300"
            scroll={false}
          >
            <div className="flex items-center gap-3 w-fit bg-black/40 py-2 rounded-2xl">
              <Logo className="h-6" width="120" />
            </div>
          </Link>

          {isDashboardPage && response?.data && (
            <Button
              variant="secondary"
              className="md:ml-4 bg-primary-50 text-primary-700 hover:bg-secondary-400"
              onClick={() =>
                router.push(
                  response?.data?.role === "manager"
                    ? "/managers/newproperty"
                    : "search"
                )
              }
            >
              {response?.data?.role === "manager" ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:block ml-2 ">
                    Add New Property
                  </span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:block ml-2 ">
                    Search Properties
                  </span>
                </>
              )}
            </Button>
          )}
        </div>

        {!isScrolled && !isDashboardPage && (
          <p className="text-primary-200 hidden md:block font-bold">
            Discover your perfect rental property with our advanced search
            capabilities
          </p>
        )}

        <div className="flex items-center gap-2 sm:gap-5">
          {response?.data ? (
            <SignedIn>
              <div className="relative hidden md:block">
                <MessageCircle className="h-6 w-6 cursor-pointer text-primary-200 hover:text-primary-400" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full"></span>
              </div>
              <div className="relative hidden md:block">
                <Bell className="h-6 w-6 cursor-pointer text-primary-200 hover:text-primary-400" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full"></span>
              </div>

              <UserButton showName={isMobileView}>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Go to Dashbaord"
                    labelIcon={<Settings className="h-4 w-4" />}
                    onClick={() =>
                      router.push(
                        response?.data?.role === "manager"
                          ? "/managers/properties"
                          : "/tenants/favorites"
                      )
                    }
                  />
                  <UserButton.Action
                    label="Settings"
                    labelIcon={<Settings className="h-4 w-4" />}
                    onClick={() =>
                      router.push(`/${response?.data?.role}s/settings`)
                    }
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          ) : (
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="text-xs sm:text-base text-white border-white bg-transparent hover:bg-white hover:text-primary-700 rounded-lg"
                  asChild
                >
                  <SignInButton />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  variant="default"
                  className="text-xs sm:text-base text-white border-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg"
                  asChild
                >
                  <SignUpButton />
                </Button>
              </Link>
            </SignedOut>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
