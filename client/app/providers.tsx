"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import StoreProvider from "@/state/redux";
// for any global providers you want to use in your app
// e.g. Redux, React Query, Toaster, etc.

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ClerkProvider>{children}</ClerkProvider>
    </StoreProvider>
  );
};

export default Providers;
