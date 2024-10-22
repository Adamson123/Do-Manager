import { ScrollArea } from "@/components/ui/scroll-area";
import TaskCard from "./TaskCard";
import {
  RefObject,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateTask, { ActionType } from "./CreateTask";
import SelectPriority from "../../ui/SelectPriority";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getMultipleTasks, TaskInitialStateTypes } from "@/features/taskSlice";
import BarLoader from "react-spinners/BarLoader";
import setActiveTask from "@/utils/setActiveTask";

interface TasksProps {
  drawerTriggerRef: RefObject<HTMLButtonElement>;
}

const Tasks = ({ drawerTriggerRef }: TasksProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  const [priority, setPriority] = useState("");
  const [action, setAction] = useState<ActionType>({
    exec: "create",
    task: { title: "", description: "", priority: "HIGH" },
    id: "",
  });
  const populatedSubtask = useRef(false);

  const { tasks, getMultipleTaskLoading } = useSelector<
    RootState,
    TaskInitialStateTypes
  >((state) => state.task);

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(getMultipleTasks());
  }, [dispatch]);

  // Memoize sorted tasks
  const sortedTasks = useMemo(() => {
    const tasksSortedByDate = tasks?.length
      ? [...tasks].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      : [];

    if (tasksSortedByDate.length && !populatedSubtask.current) {
      setActiveTask(tasksSortedByDate[0], dispatch);
      populatedSubtask.current = true;
    }
    const tasksSortedByPriorty = tasksSortedByDate.filter(
      (task) => task.priority === priority
    );
    const otherTasks = tasksSortedByDate.filter(
      (task) => task.priority !== priority
    );

    return [...tasksSortedByPriorty, ...otherTasks];
  }, [tasks, priority]);

  // Callback to trigger task editing
  const triggerEditTask = (action: ActionType) => {
    setAction(action);
    dialogTriggerRef.current?.click();
  };

  // Callback to trigger task creation
  const triggerCreateTask = () => {
    setAction({
      exec: "create",
      task: { title: "", description: "", priority: "HIGH" },
      id: "",
    });
    dialogTriggerRef.current?.click();
  };

  return (
    <section
      className="h-[calc(100%-97.5px)] min-h-[calc(100%-97.5px)]
      max-h-[calc(100%-97.5px)] flex flex-col gap-3 relative
      overflow-hidden"
    >
      {/* Head */}
      <div className="pl-4 pb-[3px] pt-[13px] flex justify-between items-center pr-3">
        <SelectPriority
          showSortingIcon={true}
          priority={priority}
          setPriority={setPriority}
        />
      </div>

      {/* Tasks */}
      {!getMultipleTaskLoading ? (
        <ScrollArea className="w-full flex-grow">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 min-w-full px-3 pb-16 md:pb-6">
            {sortedTasks.length > 0 &&
              sortedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  drawerTriggerRef={drawerTriggerRef}
                  triggerEditTask={triggerEditTask}
                />
              ))}
          </div>
        </ScrollArea>
      ) : (
        <BarLoader
          className="top-[45%] left-[50%] translate-x-[-50%]
          translate-y-[-45%] absolute bg-darkerBg"
          color="hsl(var(--primary))"
        />
      )}

      {/* Create task button */}
      <Button
        onClick={triggerCreateTask}
        className="h-[55px] w-[55px] rounded-full fixed bottom-5 left-5 shadow-md"
      >
        <Plus className="min-w-5 min-h-5" strokeWidth="3" />
      </Button>
      <div className="fixed">
        <CreateTask dialogTriggerRef={dialogTriggerRef} action={action} />
      </div>
    </section>
  );
};

export default Tasks;
