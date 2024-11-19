import clsx from "clsx";
import { Search } from "lucide-react";
import { ModeToggle } from "../ui/toggleMode";
import UserProfile from "./UserProfile";
import Logo from "./Logo";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { appLayoutContext } from "@/app/(main)/layout";
import debounce from "@/utils/debounce";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { UserInitialState } from "@/features/userSlice";

const Header = () => {
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const { search, setSearch } = useContext(appLayoutContext);
  const [localSearch, setLocalSearch] = useState(search);
  const {
    userInfo: { id: userId },
    getUserLoading,
  } = useSelector<RootState, UserInitialState>((state) => state.user);
  const router = useRouter();

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(event.target.value);
  };

  useEffect(() => {
    const updateSearch = debounce(() => {
      setSearch(localSearch);
    }, 400);

    updateSearch();
  }, [localSearch]);

  console.log({ getUserLoading });

  return (
    //py-6 w-[198.667px]
    <header className="pt-3 min-h-[70px] px-3">
      <div className="flex items-center justify-between">
        {/* Logo and Search bar */}
        <div className="flex gap-4 items-center">
          {/* Logo */}
          <Logo
            className={clsx(
              "smd:flex lg:flex",
              searchBarFocused || search ? "hidden" : "flex",
              searchBarFocused || search ? "md:hidden" : "md:flex"
            )}
          />
          {/* Search bar */}
          <div className="relative">
            <Search
              className={clsx(
                `absolute w-[13px] h-[13px] text-muted-foreground 
                top-[50%] translate-y-[-50%] smd:left-[9px] lg:left-[9px]`,
                searchBarFocused || search
                  ? "left-[9px]"
                  : "left-[13px] cursor-pointer",
                searchBarFocused || search
                  ? "md:left-[9px]"
                  : "md:left-[13px] cursor-pointer"
              )}
              onClick={() => searchBarRef.current?.focus()}
            />
            <Input
              onChange={(event) => handleSearchInput(event)}
              value={localSearch}
              type="search"
              className={clsx(
                "border-solid outline-none bg-muted text-[13px] border border-darkerBg",
                "rounded-md pl-7 pr-[10px] py-[6px]",
                "placeholder:text-muted-foreground text-muted-foreground",
                "overflow-hidden smd:w-auto lg:w-auto h-[34px]",
                searchBarFocused || search ? "w-auto" : "w-10 cursor-pointer",
                searchBarFocused || search
                  ? "md:w-auto"
                  : "md:w-10 cursor-pointer",
                "lg:cursor-text"
              )}
              placeholder="Search"
              onClick={() => searchBarRef.current?.focus()}
              onFocus={() => setSearchBarFocused(true)}
              onBlur={() => setSearchBarFocused(false)}
              ref={searchBarRef}
            />
          </div>
        </div>

        {/*  Right section */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {/* User profile */}
          {!getUserLoading ? (
            userId ? (
              <UserProfile />
            ) : (
              <Button
                onClick={() => router.push("/signin")}
                className="h-[34px] px-7 font-bold"
              >
                Sign In
              </Button>
            )
          ) : (
            <span className="text-muted-foreground text-[14px]">
              Loading...
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
