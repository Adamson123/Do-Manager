import { CalendarDaysIcon, FlameIcon } from "lucide-react";
import SubTask from "./SubTaskRect";
import { useTheme } from "next-themes";

const SubTasks = () => {
  const { theme, systemTheme } = useTheme();
  const randomColor = () => {
    const colors = ["#ef4444", "#22c55e", "#eab308"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  const color = randomColor();
  console.log(systemTheme, theme, "SystemTheme");

  return (
    <div className="px-3 pb-6 md:pb-3 flex flex-col max-h-full select-text">
      {/* HEAD */}
      <div className="flex flex-col gap-2 border-b border-darkerBg py-3">
        {/* Title and Description */}
        <div className="flex flex-col gap-2">
          {/* Title */}
          <div>
            <h2 className="text-2xl">Task Title</h2>
          </div>
          {/* Description */}
          <p className="text-[14px] text-muted-foreground">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Doloremque, iusto quia reprehenderit nulla molestiae autem fuga
            eveniet quo officia dolor illo deserunt incidunt consectetur nobis
            asperiores deleniti quas cumque doloribus?
          </p>
        </div>
        {/* Priority, Date and SubTasks Amount */}
        <div className="flex justify-between items-end">
          {/* Priority and Date*/}
          <div className="flex gap-2 items-center">
            {/* Priority */}
            <span
              style={{
                color,
                borderColor: color,
              }}
              className="text-[14px] py-[7px]
              rounded-3xl tracking-wider"
            >
              High{" "}
              <FlameIcon
                className="inline h-[15px] w-[15px] fill-current 
              -translate-y-[1px] -translate-x-[2px]"
              />
            </span>
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
          {/* SubTasks Amount */}
          <div>
            <span className="text-[13px] text-muted-foreground font-bold">
              Sub-Tasks:12
            </span>
          </div>
        </div>
      </div>
      {/* SUB-TASKS */}
      {
        <div
          style={{
            scrollbarColor:
              theme === "light" ||
              (theme === "system" && systemTheme === "light")
                ? "rgb(200,201,199) hsl(0,0%,100%)"
                : "rgb(55,54,56) hsl(20,14.3%,4.1%)",
            //
            scrollbarWidth: "thin",
          }}
          className="flex flex-col gap-5
          min-w-full p-3 overflow-y-auto flex-grow"
        >
          {/* #3c3133 , #936d6e*/}
          {Array.from({ length: 20 }).map((d, i) => {
            return <SubTask key={i} />;
          })}
        </div>
      }
    </div>
  );
};

export default SubTasks;
