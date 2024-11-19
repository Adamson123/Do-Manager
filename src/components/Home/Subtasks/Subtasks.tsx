"use client";
import { CalendarDaysIcon, File, Plus } from "lucide-react";
import SubtaskRect from "./SubtaskRect";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
} from "react";

import debounce from "@/utils/debounce";
import Priority from "@/components/ui/priority";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SubtaskInitialStateTypes } from "@/features/subtaskSlice";
import { format } from "date-fns";
import useCreateSubtask from "@/hooks/useCreateSubtask";
import dynamic from "next/dynamic";
import { ActionType } from "./CreateSubtask";
const CreateSubtask = dynamic(() => import("./CreateSubtask"), { ssr: false });
interface SubtasksProps {
  setCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
  showMore: boolean;
  setShowMore: Dispatch<SetStateAction<boolean>>;
  createDialogOpen: boolean;
  globalCreateSubtask: ReturnType<typeof useCreateSubtask>;
}

const Subtasks = ({
  setCreateDialogOpen,
  showMore,
  setShowMore,
  createDialogOpen,
  globalCreateSubtask,
}: SubtasksProps) => {
  const { action, setAction, triggerCreateSubtask } = globalCreateSubtask;
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const { taskTitle, taskDescription, taskPriority, taskCreatedAt, subtasks } =
    useSelector<RootState, SubtaskInitialStateTypes>((state) => state.subtask);

  const sortedSubtasks = useMemo(() => {
    const tasksSortedByDate = subtasks?.length
      ? [...subtasks].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      : [];
    return tasksSortedByDate;
  }, [subtasks]);

  //update description height when window is resizing
  useEffect(() => {
    if (!taskDescription) return;
    const updateDescriptionHeight = debounce(() => {
      setDescriptionHeight(Number(0));
      if (!descriptionRef.current) return;
      const descriptionSec = descriptionRef.current;
      const descriptionSecHeight = descriptionSec?.clientHeight;
      const rowHeight = parseInt(
        window.getComputedStyle(descriptionSec).lineHeight,
        10
      );
      const parts = descriptionSecHeight / rowHeight;
      setDescriptionHeight(parts);
      //  descriptionRef.current?.clientHeight
    }, 200);

    updateDescriptionHeight();
    window.addEventListener("resize", updateDescriptionHeight);
    return () => {
      window.removeEventListener("resize", updateDescriptionHeight);
    };
  }, [createDialogOpen]);

  // To trigger task editing
  const triggerEditSubtask = useCallback(
    (action: ActionType) => {
      setAction(action);
      setCreateDialogOpen(true);
    },
    [setAction, setCreateDialogOpen]
  );

  return (
    <section
      className="px-3 flex flex-col max-h-full  select-text
     min-w-full min-h-full"
    >
      {/* HEAD */}
      <div className="flex flex-col gap-2 border-b border-darkerBg py-3">
        {/* Title and Description */}
        <div className="flex flex-col gap-2">
          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold">{taskTitle}</h2>
          </div>
          {/* Description */}
          {taskDescription && (
            <div className="flex flex-wrap gap-1">
              <p
                ref={descriptionRef}
                className={`text-[14px] text-muted-foreground ${
                  descriptionHeight > 2 && !showMore && "max-h-[45px]"
                } overflow-hidden`}
              >
                {taskDescription}
              </p>

              {descriptionHeight > 2 ? (
                <span
                  onClick={() => setShowMore(!showMore)}
                  className={`${
                    !showMore ? "text-red-500" : "text-green-500"
                  } text-[14px] cursor-pointer`}
                >
                  {!showMore ? "...show more" : "...show less"}
                </span>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
        {/* Priority, Date and Subtask Amount */}
        <div className="flex justify-between items-end">
          {/* Priority and Date*/}
          <div className="flex gap-2 items-center">
            {/* Priority */}
            <Priority priority={taskPriority} />
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
              {format(taskCreatedAt, "PP")}
            </span>
          </div>
          {/* Subtask Amount */}
          <div>
            <span className="text-[13px] text-muted-foreground font-bold">
              Subtasks:{sortedSubtasks.length}
            </span>
          </div>
        </div>
      </div>
      {/* SubtaskRect */}

      <div
        style={{
          scrollbarColor: "rgb(var(--darkerBg)) hsl(var(--background))",
        }}
        className="flex flex-col gap-5
        min-w-full pt-3 pb-6 md:pb-3 overflow-y-auto flex-grow relative"
      >
        {sortedSubtasks.length ? (
          sortedSubtasks.map((subtask) => {
            return (
              <SubtaskRect
                key={subtask?.id}
                subtask={subtask}
                triggerEditSubtask={triggerEditSubtask}
              />
            );
          })
        ) : (
          <div
            className="top-0 left-0 bottom-0 right-0 flex flex-col
            justify-center flex-grow items-center text-darkerBg"
          >
            <File className="h-[60px] w-[60px]" strokeWidth={"1.5"} />
            <span className="font-bold text-[13px] translate-y-[1px]">
              No subtask was found
            </span>
          </div>
        )}
        {/* Add subtask */}
        {taskTitle && (
          <div
            onClick={() => {
              triggerCreateSubtask(setCreateDialogOpen);
            }}
            className="text-primary text-[17px] py-4 border-t
            border-b border-darkerBg cursor-pointer font-bold
            hover:opacity-[0.8] transition-all"
          >
            Add subtask <Plus className="h-5 w-5 inline -translate-y-[2px]" />
          </div>
        )}
      </div>

      {createDialogOpen && (
        <CreateSubtask
          //dialogTriggerRef={dialogTriggerRef}

          setDialogOpen={setCreateDialogOpen}
          dialogOpen={createDialogOpen}
          action={action}
        />
      )}
    </section>
  );
};

export default Subtasks;
