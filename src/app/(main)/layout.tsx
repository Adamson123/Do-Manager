"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Navbar from "@/components/Navbar/Navbar";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import clientAuth from "@/lib/auth-action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { updateGetUserLoading, updateUser } from "@/features/userSlice";
import getUserAction from "@/actions/getUserAction";
import { RawUserTypes } from "@/types/userTypes";
import { toast } from "@/components/ui/hooks/use-toast";
import Header from "@/components/Header/Header";
import { getMultipleTasks } from "@/features/taskSlice";
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

  const userId = useSelector<RootState, string>(
    (state) => state.user.userInfo.id
  );

  useEffect(() => {
    userId && dispatch(getMultipleTasks(userId));
  }, [userId]);

  useEffect(() => {
    (async () => {
      const session = await clientAuth();
      if (session?.user?.id) {
        dispatch(updateGetUserLoading(true));
        const response = await getUserAction(session?.user?.id || "");
        dispatch(updateGetUserLoading(false));

        const responseErr = response as { errMsg: string };
        if (responseErr?.errMsg) {
          return toast({
            title: responseErr.errMsg,
            description: "Operation completed with an error",
            variant: "destructive",
          });
        }
        const parsedUser = JSON.parse(response as string);
        dispatch(updateUser(parsedUser as RawUserTypes));
      }
      dispatch(updateGetUserLoading(false));
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
