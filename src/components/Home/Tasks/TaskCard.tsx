"use client";

import { Progress } from "@/components/ui/progress";
import { CalendarDaysIcon, Trash2 } from "lucide-react";
import {
    Dispatch,
    memo,
    SetStateAction,
    useMemo,
    useCallback,
    useRef,
} from "react";
import { MoreHorizontal, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Priority from "@/components/ui/priority";
import { RawTaskTypes } from "@/types/taskTypes";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ActionType } from "./CreateTask";
import { SubtaskInitialStateTypes } from "@/features/subtaskSlice";
import useSetActiveTask from "@/hooks/useSetActiveTask";

interface TaskCardProps {
    task: RawTaskTypes;
    triggerEditTask: (action: ActionType) => void;
    triggerDeleteTask: (taskId: string) => void;
    setOpenDrawer?: Dispatch<SetStateAction<boolean>>;
}

const colors: { [key: string]: string } = {
    HIGH: "rgb(var(--highPriority))",
    MEDIUM: "rgb(var(--mediumPriority))",
    LOW: "rgb(var(--lowPriority))",
};

const TaskCard = ({
    task,
    triggerEditTask,
    triggerDeleteTask,
    setOpenDrawer,
}: TaskCardProps) => {
    const taskCardRef = useRef<HTMLDivElement>(null);
    const { taskId } = useSelector<RootState, SubtaskInitialStateTypes>(
        (state) => state.subtask
    );

    const setActiveTask = useSetActiveTask();

    const getPercentage = useMemo(() => {
        const completedTasks = task.subtasks?.filter(
            (subtask) => subtask.completed
        ).length;
        const percentage = (completedTasks * 100) / task.subtasks?.length || 0;
        return Math.round(percentage);
    }, [task.subtasks]);

    const handleEditTask = useCallback(() => {
        const { id, priority, title, description } = task;
        triggerEditTask({
            task: { priority, title, description },
            id,
            exec: "edit",
        });
    }, [task, triggerEditTask]);

    const handleClick = useCallback(() => {
        setActiveTask(task);
        if (setOpenDrawer) setOpenDrawer(true);
    }, [task, setOpenDrawer]);

    console.log("task rendered");

    return (
        <div
            onClick={handleClick}
            className="bg-secondary border text-muted-foreground h-48 
      rounded-2xl box-border p-2 pb-[9px] flex flex-col cursor-pointer"
            style={{
                borderColor:
                    taskId === task.id
                        ? colors[task.priority]
                        : "rgb(var(--darkerBg))",
            }}
        >
            {/* Priority Indicator */}
            <div className="text-right">
                <Priority
                    priority={task.priority}
                    style={{ fontSize: "11px" }}
                    iconStyle={{ width: "11px", height: "11px" }}
                />
            </div>

            {/* Title and Progress */}
            <div className="flex flex-col gap-2 mt-4 w-full">
                <div
                    ref={taskCardRef}
                    className="text-foreground text-[15px] tracking-wide font-bold"
                >
                    {task?.title}
                </div>
                <div>
                    <Progress
                        suppressHydrationWarning
                        value={getPercentage}
                        className="rounded h-[5px] bg-darkerBg border-none"
                        indicatorColor={colors[task.priority]}
                    />
                    <div className="flex justify-between text-[9px] translate-y-[2px]">
                        <span>Completed</span>
                        <span>{getPercentage}%</span>
                    </div>
                </div>
            </div>

            {/* Date and More Options */}
            <div className="mt-auto flex justify-between items-end">
                <span
                    className="bg-darkerBg text-black dark:text-muted-foreground 
        text-[13px] p-[6px] rounded-lg"
                >
                    <CalendarDaysIcon className="inline h-[14px] w-[14px] -translate-y-[2px]" />
                    {task.createdAt && format(task.createdAt, "PP")}
                </span>

                {/* More Options Menu */}
                <div>
                    <Popover>
                        <PopoverTrigger
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                            asChild
                        >
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">
                                    Open more options menu
                                </span>
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                            className="w-[100px] p-0 mr-2"
                        >
                            <div className="flex flex-col text-[12px] tracking-wider">
                                <Button
                                    onClick={handleEditTask}
                                    variant="ghost"
                                    className="flex items-center justify-start h-10 px-2
                   hover:bg-accent hover:text-accent-foreground rounded-none"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </Button>
                                <div className="h-[1px] bg-darkerBg" />
                                <Button
                                    variant="ghost"
                                    className="flex items-center justify-start h-10 px-2 hover:bg-accent
                   text-red-500 hover:text-red-500 rounded-none"
                                    onClick={() => triggerDeleteTask(task.id)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default memo(TaskCard, (prevProps, nextProps) => {
    return (
        prevProps.task.id === nextProps.task.id &&
        prevProps.triggerEditTask === nextProps.triggerEditTask &&
        prevProps.triggerDeleteTask === nextProps.triggerDeleteTask &&
        prevProps.setOpenDrawer === nextProps.setOpenDrawer
    );
});
