import { Search } from "lucide-react";
import { ModeToggle } from "../ui/toggleMode";
const Navbar = () => {
  return (
    <div className="absolut top-0 left-0 right-0 py-3 px-3">
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
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
