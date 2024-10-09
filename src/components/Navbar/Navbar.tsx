import { Search } from "lucide-react";
import { ModeToggle } from "../ui/toggleMode";
import UserProfile from "./UserProfile";
const Navbar = () => {
  return (
    <div className="pt-3 py-6 px-3">
      <div className="flex items-center justify-between">
        {/* Search bar */}
        <div className="relative">
          <Search
            className="absolute w-[13px] h-[13px] text-muted-foreground
             top-[11px] left-[9px]"
          />
          <input
            type="search"
            className="border-solid outline-none
            bg-muted text-[13px] border border-darkerBg
            rounded-md pl-7 pr-[9px] py-[6px] 
            placeholder:text-muted-foreground text-muted-foreground"
            placeholder="Search"
          />
        </div>

        {/*  Right section */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {/* User profile */}
          <div className="h-[30px] bg-darkerBg w-[1px]"></div> <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
