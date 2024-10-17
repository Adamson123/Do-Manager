import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectPriority from "../../ui/SelectPriority";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";

interface CreateTaskProps {
  dialogTriggerRef: React.RefObject<HTMLButtonElement>;
}

interface taskForm {
  title: string;
  description: string;
  priority: string;
}

const CreateTask = ({ dialogTriggerRef }: CreateTaskProps) => {
  const { register, handleSubmit, control } = useForm<taskForm>({
    defaultValues: {
      priority: "HIGH",
    },
  });

  console.log(register("description"));

  return (
    <Dialog>
      <DialogTrigger
        ref={dialogTriggerRef}
        className="w-0 h-0 p-0 opacity-0 pointer-events-none"
      ></DialogTrigger>

      <DialogContent
        className=" max-w-lg p-0 px-3
        border-none bg-transparent"
      >
        <form
          className="p-6 rounded flex flex-col gap-4
          bg-background border-darkerBg"
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>
              Create a new task to add to your list
            </DialogDescription>
          </DialogHeader>
          {/* Inputs */}
          <div className="flex flex-col gap-3">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="font-bold text-[16px]">Title</span>
                <span className="text-[13px] text-primary font-bold">
                  12 / 70
                </span>
              </div>
              <input
                type="text"
                className="border border-darkerBg outline-none py-1 px-2 rounded
                focus:border-primary bg-transparent"
                placeholder="Enter title"
                {...register("title")}
              />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="font-bold text-[16px]">Description</span>
                <span className="text-[13px] text-primary font-bold">
                  12 / 400
                </span>
              </div>
              <textarea
                className="border border-darkerBg outline-none py-1 px-2 
                rounded focus:border-primary min-h-44 max-h-44 bg-transparent"
                placeholder="Enter description"
                {...register("description")}
              />
            </div>
            {/* priority */}
            <div className="flex flex-col gap-1 items-start">
              <span className="font-bold text-[16px]">Priority</span>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <SelectPriority
                    priority={field.value}
                    setPriority={field.onChange}
                    className="border border-darkerBg py-2 px-4 rounded"
                  />
                )}
              />
            </div>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
