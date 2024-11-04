"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import SubtaskRect from "@/components/Home/Subtasks/SubtaskRect";
import SelectPriority from "@/components/ui/SelectPriority";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { appLayoutContext } from "../appLayout";
import { getMultipleTasks, TaskInitialStateTypes } from "@/features/taskSlice";
import CreateSubtask, {
  ActionType,
} from "@/components/Home/Subtasks/CreateSubtask";
import { File, Search } from "lucide-react";
import BarLoader from "react-spinners/BarLoader";
import useCreateSubtask from "@/hooks/useCreateSubtask";

const Favorites = () => {
  const [priority, setPriority] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { action, setAction } = useCreateSubtask();
  const { tasks, getMultipleTaskLoading } = useSelector<
    RootState,
    TaskInitialStateTypes
  >((state) => state.task);
  const { search } = useContext(appLayoutContext);

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(getMultipleTasks());
  }, [dispatch]);

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
    //flattened all the returned array
    // .flat();

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
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  }, [tasks, priority, search]);

  // To trigger task editing
  const triggerEditSubtask = (action: ActionType) => {
    setAction(action);
    setCreateDialogOpen(true);
  };

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
      {!getMultipleTaskLoading ? (
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
                <SubtaskRect
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
                <File className="h-[60px] w-[60px]" strokeWidth={"1.5"} />
              ) : (
                <Search className="h-[80px] w-[80px]" strokeWidth={"1.5"} />
              )}
              <span className="font-bold text-[13px] -translate-y-[2px]">
                No subtask was found
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
