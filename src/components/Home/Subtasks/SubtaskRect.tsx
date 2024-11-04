import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  AlignLeft,
  Clock,
  MoreHorizontal,
  Edit,
  Trash2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Priority from "@/components/ui/priority";
import { RawSubtaskTypes } from "@/types/subtaskTypes";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  deleteSubtask,
  editSubtask,
  SubtaskInitialStateTypes,
} from "@/features/subtaskSlice";
import { updateSubstask } from "@/features/taskSlice";
import { useCallback } from "react";
import { ActionType } from "./CreateSubtask";
import getDayDifferenceWithToday from "@/utils/getDayDifferenceWithToday";

interface SubtaskRectProps {
  showPriority?: boolean;
  subtask: RawSubtaskTypes;
  triggerEditSubtask: (action: ActionType) => void;
}

const SubtaskRect = ({
  showPriority,
  subtask,
  triggerEditSubtask,
}: SubtaskRectProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { deleteSubtaskLoading } = useSelector<
    RootState,
    SubtaskInitialStateTypes
  >((state) => state.subtask);

  const toggleCompletion = () => {
    const toggledSubtask = {
      ...subtask,
      completed: !subtask.completed,
      dateCompleted: new Date().toISOString(),
      hideToast: true,
    };

    dispatch(
      updateSubstask({ subtask: toggledSubtask, taskId: subtask.taskId })
    );
    dispatch(editSubtask({ subtask: toggledSubtask, id: toggledSubtask.id }));
  };

  const toggleFavorite = () => {
    const toggledSubtask = {
      ...subtask,
      favorite: !subtask.favorite,
      hideToast: true,
    };
    //id for task
    dispatch(
      updateSubstask({ subtask: toggledSubtask, taskId: subtask.taskId })
    );
    //id for subtask
    dispatch(editSubtask({ subtask: toggledSubtask, id: toggledSubtask.id }));
  };

  const getDueDateState = useCallback(() => {
    const dueDateState = getDayDifferenceWithToday(subtask.dueDate);
    if (dueDateState < 0) {
      return {
        text: `${dueDateState * -1} days ago`,
        color: "rgb(var(--highPriority))",
      };
    } else if (dueDateState === 0) {
      return {
        text: `Today, ${format(subtask.dueDate, "h:mm aaa")}`,
        color: "rgb(var(--mediumPriority))",
      };
    } else if (dueDateState - 1 === 0) {
      return { text: "Tomorrow", color: "hsl(var(--muted-foreground))" };
    } else {
      return {
        text: format(subtask.dueDate, "EEE, MMM d, h aaa"),
        color: "hsl(var(--muted-foreground))",
      };
    }
  }, [subtask]);

  const dueDateState = getDueDateState();

  const handleDeleteSubtask = async () => {
    if (deleteSubtaskLoading) return;
    dispatch(deleteSubtask(subtask.id));
  };

  const handleEditSubtask = () => {
    const { id, title, description, dueDate, taskId } = subtask;
    
    console.log( { id, title, description, dueDate, taskId });
    triggerEditSubtask({
      task: { title, description, dueDate, taskId },
      id,
      exec: "edit",
    });
  };

  return (
    <div className="relative">
      {/* Checkbox  */}
      <Checkbox
        onClick={toggleCompletion}
        checked={subtask.completed}
        className="absolute z-10 left-5 top-[3px]"
      />
      <div
        className={`flex flex-col gap-2 min-w-full px-3 
        ${subtask.completed && "opacity-[0.5] line-through"}`}
      >
        {/* Checkbox and Task */}
        <div className="flex justify-between items-start gap-4">
          {/* Task */}
          <p className="text-[15px] translate-x-7 text-wrap">{subtask.title}</p>
          {showPriority && (
            <Priority
              priority={subtask.priority}
              style={{
                marginLeft: "12px",
              }}
            />
          )}
        </div>

        {/* Description and Date */}
        <div
          className="pl-2 border-l border-darkerBg translate-x-3 
        flex flex-col gap-2"
        >
          {/* Description */}
          <div className="flex gap-2">
            <AlignLeft className="min-h-5 min-w-5" />
            <span className="text-[12px] text-muted-foreground">
              {subtask.description}
            </span>
          </div>
          {/* Date */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Clock className="h-5 w-5" />
              <span
                className="border border-darkerBg py-1 text-[13px] px-3 
                text-muted-foreground rounded-md"
                style={{
                  color: dueDateState.color,
                  borderColor: dueDateState.color,
                }}
              >
                {dueDateState.text}
              </span>
            </div>

            {/* */}
            <Popover>
              <PopoverTrigger
                onClick={(event) => {
                  event.stopPropagation();
                }}
                asChild
              >
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open more options menu</span>
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-1 max-w-[220px] mr-3">
                <div className="flex flex-col text-[12px] tracking-wider">
                  <Button
                    onClick={handleEditSubtask}
                    variant="ghost"
                    className="flex items-center justify-start h-10 px-2
                   hover:bg-accent hover:text-accent-foreground rounded-none"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </Button>
                  <div className="h-[1px] bg-darkerBg" />
                  <Button
                    onClick={toggleFavorite}
                    variant="ghost"
                    className="flex items-center justify-start h-10 px-2
                   hover:bg-accent hover:text-accent-foreground rounded-none"
                  >
                    <Star
                      className={`mr-2 h-5 w-5`}
                      fill={
                        subtask.favorite
                          ? "rgb(var(--mediumPriority))"
                          : "hsl(var(--background))"
                      }
                    />
                    <span>
                      {!subtask.favorite
                        ? "Add to favorites"
                        : "Remove from favorites"}
                    </span>
                  </Button>
                  <div className="h-[1px] bg-darkerBg" />
                  <Button
                    onClick={handleDeleteSubtask}
                    variant="ghost"
                    className="flex items-center justify-start
                   h-10 px-2 hover:bg-accent  
                   text-red-500 hover:text-red-500 rounded-none"
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
    </div>
  );
};

export default SubtaskRect;
