import { Dispatch, SetStateAction } from "react";

interface TabNavProps {
  focusedTab: string;
  setFocusedTab: Dispatch<SetStateAction<string>>;
}
const TabNav = ({ setFocusedTab, focusedTab }: TabNavProps) => {
  return (
    <div className="px-4">
      <div className="border-b border-darkerBg flex gap-3">
        {["Tasks", "Favorites", "Activities"].map((value, index) => {
          return (
            <span
              onClick={() => setFocusedTab(value)}
              className={`text-[15px] px-5 translate-y-[1px] cursor-pointer pb-[6px] ${
                focusedTab === value
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground"
              }`}
              key={index}
            >
              {value}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TabNav;
