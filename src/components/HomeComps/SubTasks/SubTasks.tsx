"use client";
import { CalendarDaysIcon, FlameIcon, Plus } from "lucide-react";
import SubtaskRect from "./SubtaskRect";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import CreateSubtask from "./CreateSubtask";
import debounce from "@/lib/debounce";
import Priority from "@/components/ui/priority";

interface SubtasksProps {
    setDialogOpened: Dispatch<SetStateAction<boolean>>;
    showMore: boolean;
    setShowMore: Dispatch<SetStateAction<boolean>>;
}

const Subtasks = ({
    setDialogOpened,
    showMore,
    setShowMore,
}: SubtasksProps) => {
    const dialogTriggerRef = useRef<HTMLButtonElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    //State variables
    const [descriptionHeight, setDescriptionHeight] = useState(0);

    const { theme, systemTheme } = useTheme();
    const randomColor = () => {
        const colors = ["#ef4444", "#22c55e", "#eab308"];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };
    const color = randomColor();

    //update description height when window is resizing
    useEffect(() => {
        const updateDescriptionHeight = debounce(() => {
            setDescriptionHeight(Number(descriptionRef.current?.clientHeight));
        }, 200);
        updateDescriptionHeight();

        window.addEventListener("resize", updateDescriptionHeight);
        return () => {
            window.removeEventListener("resize", updateDescriptionHeight);
        };
    }, []);

    return (
        <section className="px-3 flex flex-col max-h-full select-text">
            {/* HEAD */}
            <div className="flex flex-col gap-2 border-b border-darkerBg py-3">
                {/* Title and Description */}
                <div className="flex flex-col gap-2">
                    {/* Title */}
                    <div>
                        <h2 className="text-2xl font-bold">Task Title</h2>
                    </div>
                    {/* Description */}
                    <div className="flex flex-wrap gap-1">
                        <p
                            ref={descriptionRef}
                            className={`text-[14px] text-muted-foreground ${
                                descriptionHeight > 53 && !showMore && "h-10"
                            } overflow-hidden`}
                        >
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Doloremque, iusto quia reprehenderit nulla
                            molestiaej fffffffttttt hhhhhhhhh hhhhhhhhhhhh
                            lopppppppppo uuuuuuuuui jjjjjjjjjjjjjj
                            uuuuuuuuuuuuuuy
                        </p>
                        {descriptionHeight > 53 ? (
                            <span
                                onClick={() => setShowMore(!showMore)}
                                className={`${
                                    !showMore
                                        ? "text-red-500"
                                        : "text-green-500"
                                } text-[14px] cursor-pointer`}
                            >
                                {!showMore ? "...show more" : "...show less"}
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                {/* Priority, Date and Subtask Amount */}
                <div className="flex justify-between items-end">
                    {/* Priority and Date*/}
                    <div className="flex gap-2 items-center">
                        {/* Priority */}
                        <Priority priority="high" />
                        {/* Date */}
                        <span
                            className="bg-darkerBg
                          text-black dark:text-muted-foreground 
                            text-[13px] p-[6px] rounded-lg"
                        >
                            <CalendarDaysIcon
                                className="inline h-[14px] w-[14px]
                                -translate-y-[2px]"
                            />{" "}
                            13 June
                        </span>
                    </div>
                    {/* Subtask Amount */}
                    <div>
                        <span className="text-[13px] text-muted-foreground font-bold">
                            Subtasks:12
                        </span>
                    </div>
                </div>
            </div>
            {/* SubtaskRect */}

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
                className="flex flex-col gap-5
                min-w-full p-3 pb-6 md:pb-3 overflow-y-auto flex-grow"
            >
                {/* #3c3133 , #936d6e*/}
                {Array.from({ length: 7 }).map((d, i) => {
                    return <SubtaskRect key={i} />;
                })}
                {/* Add subtask */}
                <div
                    onClick={() => {
                        dialogTriggerRef.current?.click();
                        setDialogOpened(true);
                    }}
                    className="px-3 text-primary text-[17px] py-4 border-t
                    border-b border-darkerBg cursor-pointer font-bold
                    hover:opacity-[0.8] transition-all"
                >
                    Add subtask{" "}
                    <Plus className="h-5 w-5 inline -translate-y-[2px]" />
                </div>
            </div>

            <CreateSubtask
                dialogTriggerRef={dialogTriggerRef}
                setDialogOpened={setDialogOpened}
            />
        </section>
    );
};

export default Subtasks;
