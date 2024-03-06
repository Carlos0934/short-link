"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <div className="bg-gray-900 min-h-screen">
        <SessionProvider>{children}</SessionProvider>
      </div>
    </NextUIProvider>
  );
};
