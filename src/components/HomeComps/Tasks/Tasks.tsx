import { ScrollArea } from "@/components/ui/scroll-area";
import TaskCard from "./TaskCard";
import { RefObject, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateTask from "./CreateTask";
import SelectPriority from "./SelectPriority";
import tasks from "@/lib/tasks";

interface TasksProp {
    drawerTriggerRef: RefObject<HTMLButtonElement>;
}

const Tasks = ({ drawerTriggerRef }: TasksProp) => {
    const dialogTriggerRef = useRef<HTMLButtonElement>(null);
    const [priority, setPriority] = useState("high");

    return (
        <section
            className="h-[calc(100%-97.5px)] flex 
            flex-col gap-3 relative"
        >
            {/* Head */}
            {/* Select priority */}
            <div className="pl-4 pb-2 pt-4 flex justify-between items-center pr-3">
                <SelectPriority
                    showSortingIcon={true}
                    priority={priority}
                    setPriority={setPriority}
                />
            </div>

            {/* Tasks : max-h-[calc(100%-60px)*/}
            <ScrollArea className="w-full flex-grow">
                <div
                    className="grid grid-cols-2 lg:grid-cols-3 gap-3
                    min-w-full px-3 pb-6"
                >
                    {tasks.map((task, index) => {
                        return (
                            <TaskCard
                                drawerTriggerRef={drawerTriggerRef}
                                key={index}
                                task={task}
                            />
                        );
                    })}
                </div>
            </ScrollArea>

            {/* Create task button */}
            <Button
                onClick={() => dialogTriggerRef.current?.click()}
                className="h-[55px] w-[55px] rounded-full
                fixed bottom-5 left-5 shadow-md"
            >
                <Plus className="min-w-5 min-h-5" strokeWidth="3" />
            </Button>
            <CreateTask dialogTriggerRef={dialogTriggerRef} />
        </section>
    );
};

export default Tasks;
