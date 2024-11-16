"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import clientAuth from "@/lib/auth-action";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getUser, updateUser } from "@/features/userSlice";
import getUserAction from "@/actions/getUserAction";
import { RawUserTypes } from "@/types/userTypes";

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
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const value = {
    search,
    setSearch,
  };
  useEffect(() => {
    (async () => {
      const session = await clientAuth();
      if (session?.user?.id) {
        try {
          const user = await getUserAction(session.user.id || "");
          const parsedUser = JSON.parse(user as string) as RawUserTypes;
          dispatch(updateUser(parsedUser));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    })();
  }, []);

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
