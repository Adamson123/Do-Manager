import { ScrollArea } from "@/components/ui/scroll-area";
import TaskCard from "./TaskCard";
import {
  useEffect,
  useState,
  useMemo,
  useContext,
  SetStateAction,
  Dispatch,
  useCallback,
} from "react";
import { FolderOpen, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import SelectPriority from "../../ui/SelectPriority";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getMultipleTasks, TaskInitialStateTypes } from "@/features/taskSlice";
import BarLoader from "react-spinners/BarLoader";
import useSetActiveTask from "@/hooks/useSetActiveTask";
import { RawTaskTypes } from "@/types/taskTypes";
import { SubtaskInitialStateTypes } from "@/features/subtaskSlice";
import { appLayoutContext } from "@/app/(main)/layout";
import ConfirmDelete from "./ComfirmDelete";
import useDeleteTask from "@/hooks/useDeleteTask";
import useCreateTask from "@/hooks/useCreateTask";
import { ActionType } from "./CreateTask";
import { useRouter } from "next/navigation";
import { UserInitialState } from "@/features/userSlice";
const CreateTask = dynamic(() => import("./CreateTask"), { ssr: false });

interface TasksProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

const Tasks = ({ setOpenDrawer }: TasksProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const setActiveTask = useSetActiveTask();
  const [priority, setPriority] = useState("");
  const {
    action,
    createDialogOpen,
    setAction,
    setCreateDialogOpen,
    triggerCreateTask,
  } = useCreateTask();
  const { deleteDialogOpen, setDeleteDialogOpen, taskId, triggerDeleteTask } =
    useDeleteTask();

  const { tasks, getMultipleTaskLoading } = useSelector<
    RootState,
    TaskInitialStateTypes
  >((state) => state.task);

  const { taskId: currentTaskId } = useSelector<
    RootState,
    SubtaskInitialStateTypes
  >((state) => state.subtask);

  const {
    userInfo: { id: userId },
    getUserLoading,
  } = useSelector<RootState, UserInitialState>((state) => state.user);

  const { search } = useContext(appLayoutContext);
  const router = useRouter();

  // Memoize sorted tasks
  const sortedTasks = useMemo(() => {
    const tasksSortedByDate = tasks?.length
      ? [...tasks].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      : [];

    const tasksSortedByPriority = tasksSortedByDate.filter(
      (task) => task.priority === priority
    );
    const otherTasks = tasksSortedByDate.filter(
      (task) => task.priority !== priority
    );
    const result = [...tasksSortedByPriority, ...otherTasks].filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  }, [tasks, priority, search]);

  useEffect(() => {
    if (sortedTasks.length) {
      setActiveTask(
        sortedTasks.find((task) => task.id === currentTaskId) || sortedTasks[0]
      );
    }
  }, [sortedTasks, currentTaskId, setActiveTask]);

  // To trigger task editing
  const triggerEditTask = useCallback(
    (action: ActionType) => {
      setAction(action);
      setCreateDialogOpen(true);
    },
    [setAction, setCreateDialogOpen]
  );

  return (
    <section
      className="h-[calc(100%-97.5px)] min-h-[calc(100%-97.5px)]
      max-h-[calc(100%-97.5px)] flex flex-col gap-3 relative
      overflow-hidden"
    >
      {/* Head */}
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

      {/* Tasks */}
      {!getMultipleTaskLoading && !getUserLoading ? (
        <ScrollArea className="w-full flex-grow">
          <div
            className="grid grid-cols-2 ssmd:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 
          gap-3 min-w-full px-3 pb-16 md:pb-6"
          >
            {sortedTasks.length > 0 ? (
              sortedTasks.map((task: RawTaskTypes) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  triggerEditTask={triggerEditTask}
                  triggerDeleteTask={triggerDeleteTask}
                  setOpenDrawer={setOpenDrawer}
                />
              ))
            ) : (
              <div
                className="top-[45%] left-[50%] translate-x-[-50%]
               translate-y-[-45%] absolute flex flex-col items-center
                text-darkerBg"
              >
                {!search ? (
                  <FolderOpen
                    className="h-[73px] w-[73px]"
                    strokeWidth={"1.5"}
                  />
                ) : (
                  <Search className="h-[80px] w-[80px]" strokeWidth={"1.5"} />
                )}
                <span className="font-bold text-[15px] -translate-y-1">
                  No task was found
                </span>
              </div>
            )}
          </div>
        </ScrollArea>
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

      {/* Create task button */}
      <Button
        onClick={() => (userId ? triggerCreateTask() : router.push("/signin"))}
        className="h-[55px] w-[55px] rounded-full fixed bottom-5
        left-5 shadow-md"
      >
        <Plus className="min-w-5 min-h-5" strokeWidth="3" />
      </Button>
      <div className="fixed">
        <ConfirmDelete
          dialogOpen={deleteDialogOpen}
          setDialogOpen={setDeleteDialogOpen}
          taskId={taskId}
        />
        {createDialogOpen && (
          <CreateTask
            dialogOpen={createDialogOpen}
            setDialogOpen={setCreateDialogOpen}
            action={action}
          />
        )}
      </div>
    </section>
  );
};

export default Tasks;
