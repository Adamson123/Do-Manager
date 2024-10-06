import { ScrollArea } from "@/components/ui/scroll-area";
import Task from "./TaskCard";
import { RefObject } from "react";

interface TasksProp {
  drawerTriggerRef: RefObject<HTMLButtonElement>;
}

const Tasks = ({ drawerTriggerRef }: TasksProp) => {
  return (
    <div className="h-[calc(100%-60px)] flex flex-col">
      {/* Head */}
      <div className="h-[60px]"></div>

      {/* Tasks : max-h-[calc(100%-60px)*/}
      <ScrollArea className="w-full flex-grow">
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-3
          min-w-full px-3 pb-6"
        >
          {/* #3c3133 , #936d6e*/}
          {Array.from({ length: 10 }).map((d, i) => {
            return <Task drawerTriggerRef={drawerTriggerRef} key={i} />;
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Tasks;
