import { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { createTask, editTask, editTaskSync } from "@/features/taskSlice";
import { AppDispatch } from "@/store/store";
import { TaskTypes } from "@/types/taskTypes";

export interface ActionType {
  exec: string;
  task: TaskTypes;
  id: string;
}

interface CreateTaskProps {
  dialogTriggerRef: React.RefObject<HTMLButtonElement>;
  action?: ActionType;
}
const actionDefaultValue = {
  exec: "create",
  task: { title: "", description: "", priority: "HIGH" },
  id: "",
};

const CreateTask = ({
  dialogTriggerRef,
  action = actionDefaultValue,
}: CreateTaskProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: action.task.title,
      description: action.task.description,
      priority: action.task.priority,
    },
  });

  useEffect(() => {
    form.reset({
      title: action.task.title,
      description: action.task.description,
      priority: action.task.priority,
    });
  }, [action, form]);

  const handleCreateTask = (task: z.infer<typeof createTaskSchema>) => {
    dispatch(createTask(task)).finally(() => {
      setDialogOpen(false);
    });
  };

  const handleEditTask = (task: z.infer<typeof createTaskSchema>) => {
    dispatch(editTaskSync({ task, id: action.id }));
    setDialogOpen(false);
    dispatch(editTask({ task, id: action.id }));
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        ref={dialogTriggerRef}
        className="w-0 h-0 p-0 opacity-0 pointer-events-none"
      />
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
              action.exec === "edit" ? handleEditTask : handleCreateTask
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
                  <FormDescription>{field.value.length} / 400</FormDescription>
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
                </FormItem>
              )}
            />
            <Button type="submit">
              {action.exec === "edit" ? "Save task" : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
