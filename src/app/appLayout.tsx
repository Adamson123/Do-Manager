"use client";

import { createContext, ReactNode, RefObject } from "react";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { usePathname } from "next/navigation";

interface appLayoutContextTypes {
  //drawerTriggerRef: RefObject<HTMLButtonElement> | null;
}

export const appLayoutContext = createContext<appLayoutContextTypes>({
  //  drawerTriggerRef: null,
});

export default function Layout({ children }: { children: ReactNode }) {
  const currentPath = usePathname();
  const value = {
    //  drawerTriggerRef,
  };

  return (
    <main className={`w-full max-h-screen min-h-screen overflow-hidden`}>
      <section className={`${currentPath === "/" && "md:w-[60%]"} z-[10000]`}>
        <Header />
        <Navbar />
      </section>
      <appLayoutContext.Provider value={value}>
        {children}
      </appLayoutContext.Provider>
    </main>
  );
}
