import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Flame, Leaf } from "lucide-react";
import { useTheme } from "next-themes";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface SelectPriorityProps {
  showSortingIcon?: boolean;
  priority: string;
  setPriority: Dispatch<SetStateAction<string>>;
}

const SelectPriority = ({
  showSortingIcon,
  priority,
  setPriority,
}: SelectPriorityProps) => {
  const { theme, systemTheme } = useTheme();
  const [sortingIcon, setSortingIcon] = useState("./sortingW.svg");

  useEffect(() => {
    if (!theme && systemTheme) return;

    const icon =
      theme === "light" || (theme === "system" && systemTheme === "light")
        ? "./sorting.svg"
        : "./sortingW.svg";
    setSortingIcon(icon);
  }, [theme, systemTheme]);

  return (
    <Select value={priority} onValueChange={setPriority}>
      <SelectTrigger
        className="w-auto text-[15px] h-[20px]
        border-none flex gap-2"
      >
        {showSortingIcon && (
          <img src={sortingIcon} className="h-[18px] w-[17px]" />
        )}
        <SelectValue placeholder="Priority" defaultValue="high" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="high">
            <span className="text-highPriority">High</span>{" "}
            <Flame
              className="h-4 w-4 fill-highPriority text-highPriority
              inline -translate-y-[1px] stroke-highPriority"
            />
          </SelectItem>
          <SelectItem value="medium" className="text-mediumPriority">
            <span className="text-mediumPriority">Medium</span>{" "}
            <AlertTriangle
              className="h-[18px] w-[18px] inline fill-mediumPriority
            -translate-y-[1px] stroke-background"
            />
          </SelectItem>
          <SelectItem value="low" className="text-lowPriority">
            <span className="text-lowPriority">Low</span>{" "}
            <Leaf
              className="h-[18px] w-[18px] inline fill-lowPriority
               -translate-y-[1px] text-lowPriority stroke-background"
            />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectPriority;
