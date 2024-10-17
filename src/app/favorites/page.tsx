"use client";
import { useEffect, useState } from "react";
import SubtaskRect from "@/components/HomeComps/Subtasks/SubtaskRect";
import { useTheme } from "next-themes";
import SelectPriority from "@/components/ui/SelectPriority";

const Favorites = () => {
  const [priority, setPriority] = useState("HIGH");
  const { theme, systemTheme } = useTheme();
  const [scrollbarColor, setScrollbarColor] = useState(
    "rgb(200,201,199) hsl(0,0%,100%)"
  );

  useEffect(() => {
    if (!theme || !systemTheme) return;

    const colors =
      theme === "light" || (theme === "system" && systemTheme === "light")
        ? "rgb(200,201,199) hsl(0,0%,100%)"
        : "rgb(55,54,56) hsl(224 71.4% 4.1%)";

    setScrollbarColor(colors);
  }, [theme, systemTheme]);

  return (
    //h-[calc(100%-97.5px)]
    <main
      className="flex flex-col gap-2 
      max-h-[calc(100vh-97.5px)] min-h-[calc(100vh-97.5px)]
      h-[calc(100vh-97.5px)]"
    >
      {/* Head */}
      {/* Select priority */}
      <div
        className="pl-4 pb-[3px] pt-[13px] flex justify-between
      items-center pr-3"
      >
        <SelectPriority
          showSortingIcon={true}
          priority={priority}
          setPriority={setPriority}
        />
      </div>
      <div
        style={{
          scrollbarColor,
        }}
        className="grid md:grid-cols-2 gap-5
        min-w-full p-3 pb-6 overflow-y-auto flex-grow"
      >
        {Array.from({ length: 7 }).map((d, i) => {
          return <SubtaskRect key={i} />;
        })}
      </div>
    </main>
  );
};

export default Favorites;
