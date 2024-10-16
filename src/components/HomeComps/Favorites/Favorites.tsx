import { useState } from "react";
import SubtaskRect from "../Subtasks/SubtaskRect";
import { useTheme } from "next-themes";
import SelectPriority from "../Tasks/SelectPriority";


const Favorites = () => {
    const [priority, setPriority] = useState("high");
    const { theme, systemTheme } = useTheme();

    return (
        <section className="flex flex-col gap-2 h-[calc(100%-97.5px)]">
            {/* Head */}
            {/* Select priority */}
            <div className="pl-4 pb-2 pt-4 flex justify-between items-center pr-3">
                <SelectPriority
                    showSortingIcon={true}
                    priority={priority}
                    setPriority={setPriority}
                />
            </div>
            <div
                style={{
                    scrollbarColor:
                        theme === "light" ||
                        (theme === "system" && systemTheme === "light")
                            ? "rgb(200,201,199) hsl(0,0%,100%)"
                            : "rgb(55,54,56) hsl(224 71.4% 4.1%)",
                    ////
                    scrollbarWidth: "thin",
                }}
                className="grid md:grid-cols-2 gap-5
                min-w-full p-3 overflow-y-auto flex-grow"
            >
                {Array.from({ length: 7 }).map((d, i) => {
                    return <SubtaskRect key={i} />;
                })}
            </div>
        </section>
    );
};

export default Favorites;
