"use client";
import { useCallback, useContext, useMemo, useState } from "react";
import SubtaskCard from "@/components/Home/Subtasks/SubtaskCard";
import SelectPriority from "@/components/ui/SelectPriority";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import appLayoutContext from "@/context/appLayoutContext";
import CreateSubtask, {
  ActionType,
} from "@/components/Home/Subtasks/CreateSubtask";
import { Search, StarOff } from "lucide-react";
import BarLoader from "react-spinners/BarLoader";
import useCreateSubtask from "@/hooks/useCreateSubtask";
import { TaskInitialStateTypes } from "@/features/taskSlice";

const Favorites = () => {
  const [priority, setPriority] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { action, setAction } = useCreateSubtask();
  const getUserLoading = useSelector<RootState, boolean>(
    (state) => state.user.getUserLoading
  );
  const { tasks, getMultipleTaskLoading } = useSelector<
    RootState,
    TaskInitialStateTypes
  >((state) => state.task);
  const { search } = useContext(appLayoutContext);
  // Memoize sorted tasks
  const sortedSubtasks = useMemo(() => {
    const favoritesInTasks = tasks
      //mapping tasks with subtasks
      .flatMap((task) =>
        task.subtasks
          //filtering out favorite subtasks
          .filter((subtask) => subtask.favorite)
          //mapping subtasks with task priority
          .map((subtask) => {
            return { ...subtask, priority: task.priority };
          })
      );

    const subtasksSortedByDate = favoritesInTasks.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const tasksSortedByPriorty = subtasksSortedByDate.filter(
      (task) => task.priority === priority
    );
    const otherTasks = subtasksSortedByDate.filter(
      (task) => task.priority !== priority
    );
    const result = [...tasksSortedByPriorty, ...otherTasks].filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase().trim(" "))
    );
    return result;
  }, [tasks, priority, search]);

  // To trigger task editing
  const triggerEditSubtask = useCallback(
    (action: ActionType) => {
      setAction(action);
      setCreateDialogOpen(true);
    },
    [setAction, setCreateDialogOpen]
  );
  return (
    //h-[calc(100%-97.5px)]
    <main
      className="flex flex-col gap-2 
      max-h-[calc(100vh-97.5px)] min-h-[calc(100vh-97.5px)]
      h-[calc(100vh-97.5px)] relative"
    >
      {/* Head */}
      {/* Select priority */}
      <div
        className="pl-4 pb-[3px] pt-[13px] flex justify-between
      items-center pr-3 z-20"
      >
        <SelectPriority
          showSortingIcon={true}
          priority={priority}
          setPriority={setPriority}
        />
      </div>
      {!getMultipleTaskLoading && !getUserLoading ? (
        <div
          style={{
            scrollbarColor: "rgb(var(--darkerBg)) hsl(var(--background))",
          }}
          className="grid md:grid-cols-2 gap-5
           min-w-full p-3 pb-16 md:pb-6 overflow-y-auto "
        >
          {sortedSubtasks.length ? (
            sortedSubtasks.map((subtask) => {
              return (
                <SubtaskCard
                  key={subtask.id}
                  showPriority={true}
                  subtask={subtask}
                  triggerEditSubtask={triggerEditSubtask}
                />
              );
            })
          ) : (
            <div
              className="top-0 left-0 bottom-0 right-0 flex flex-col
            justify-center flex-grow items-center text-darkerBg h-full absolute"
            >
              {!search ? (
                <StarOff className="h-[60px] w-[60px]" strokeWidth={"1.5"} />
              ) : (
                <Search className="h-[80px] w-[80px]" strokeWidth={"1.5"} />
              )}
              <span className="font-bold text-[13px] translate-y-[1px]">
                No favorite subtask was found
              </span>
            </div>
          )}
        </div>
      ) : (
        <div
          className="top-0 left-0 bottom-0 right-0 flex flex-col
          justify-center flex-grow items-center text-darkerBg h-full absolute"
        >
          <BarLoader
            className="absolute bg-darkerBg"
            color="hsl(var(--primary))"
          />
        </div>
      )}
      <div className="fixed">
        <CreateSubtask
          setDialogOpen={setCreateDialogOpen}
          dialogOpen={createDialogOpen}
          action={action}
        />
      </div>
    </main>
  );
};

export default Favorites;
