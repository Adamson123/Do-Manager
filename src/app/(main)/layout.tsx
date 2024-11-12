"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface appLayoutContextTypes {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
}

export const appLayoutContext = createContext<appLayoutContextTypes>({
  setSearch: () => {},
  search: "",
});

export default function Layout({ children }: { children: ReactNode }) {
  const currentPath = usePathname();
  const [search, setSearch] = useState("");
  const value = {
    search,
    setSearch,
  };

  return (
    <main className="w-full min-h-screen">
      <appLayoutContext.Provider value={value}>
        <section
          className={clsx(
            currentPath === "/" && "md:w-[60%]",
            "z-[10000] min-h-[101.5px]"
          )}
        >
          <Header />
          <Navbar />
        </section>

        {children}
      </appLayoutContext.Provider>
    </main>
  );
}
