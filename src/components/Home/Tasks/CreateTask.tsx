import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SelectPriority from "@/components/ui/SelectPriority";
import { createTaskSchema } from "@/schemas";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  editTask,
  TaskInitialStateTypes,
} from "@/features/taskSlice";
import { AppDispatch, RootState } from "@/store/store";
import { TaskTypes } from "@/types/taskTypes";
import { RawUserTypes } from "@/types/userTypes";

export interface ActionType {
  exec: string;
  task: TaskTypes;
  id: string;
}

interface CreateTaskProps {
  // dialogTriggerRef: React.RefObject<HTMLButtonElement>;
  action?: ActionType;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
}
const actionDefaultValue = {
  exec: "create",
  task: { title: "", description: "", priority: "HIGH" },
  id: "",
};

const CreateTask = ({
  // dialogTriggerRef,
  action = actionDefaultValue,
  setDialogOpen,
  dialogOpen,
}: CreateTaskProps) => {
  //const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { createTaskLoading, editTaskLoading } = useSelector<
    RootState,
    TaskInitialStateTypes
  >((state) => state.task);
  const { id: userId } = useSelector<RootState, RawUserTypes>(
    (state) => state.user.userInfo,
  );

  //closed by user while a request was made
  const [closeWhileOnReq, setCloseWhileOnReq] = useState(false);
  const [fulfilled, setFulfilled] = useState(false);

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: action.task.title,
      description: action.task.description,
      priority: action.task.priority,
      userId,
    },
  });

  useEffect(() => {
    form.reset({
      title: action.task.title,
      description: action.task.description,
      priority: action.task.priority,
      userId,
    });
  }, [action, form, userId]);

  useEffect(() => {
    if (!fulfilled) return;

    if (!closeWhileOnReq) {
      setDialogOpen(false);
    } else {
      setCloseWhileOnReq(false);
    }
    setFulfilled(false);
  }, [fulfilled, closeWhileOnReq]);

  const handleCreateTask = (task: z.infer<typeof createTaskSchema>) => {
    if (createTaskLoading) return;
    dispatch(createTask(task)).finally(() => {
      setFulfilled(true);
    });
  };

  const handleEditTask = (task: z.infer<typeof createTaskSchema>) => {
    //  dispatch(editTaskSync({ task, id: action.id }));
    if (editTaskLoading) return;
    //TODO
    dispatch(editTask({ task, id: action.id })).finally(() => {
      setFulfilled(true);
    });
  };

  const getRightLabel = () => {
    if (action.exec === "edit") {
      if (editTaskLoading) {
        return "Updating...";
      } else {
        return "Update task";
      }
    } else {
      if (createTaskLoading) {
        return "Creating...";
      } else {
        return "Create task";
      }
    }
  };

  const label = getRightLabel();

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(state) => {
        setDialogOpen(state);
        if (state) return;
        if (createTaskLoading || editTaskLoading) {
          setCloseWhileOnReq(true);
        }
      }}
    >
      <DialogTrigger className="w-0 h-0 p-0 opacity-0 pointer-events-none" />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {action.exec === "edit" ? "Edit" : "Create"} Task
          </DialogTitle>
          <DialogDescription>
            {action.exec === "edit"
              ? "Edit your task's details"
              : "Create a new task to add to your list"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              action.exec === "edit" ? handleEditTask : handleCreateTask,
            )}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title..." {...field} />
                  </FormControl>
                  <FormMessage className="text-[12px]" />
                  <FormDescription>{field.value.length} / 70</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description..."
                      className="resize-none min-h-32 max-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px]" />
                  <FormDescription>{field.value?.length} / 400</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <SelectPriority
                      priority={field.value}
                      setPriority={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-[12px]" />
                </FormItem>
              )}
            />
            <Button type="submit">{label}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
