import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectPriority from "./SelectPriority";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CreateTaskProps {
  dialogTriggerRef: React.RefObject<HTMLButtonElement>;
}

const CreateTask: React.FC<CreateTaskProps> = ({ dialogTriggerRef }) => {
  const [priority, setPriority] = useState("high");

  return (
    <Dialog>
      <DialogTrigger ref={dialogTriggerRef} className="hidden"></DialogTrigger>

      <DialogContent
        className=" max-w-lg p-0 px-3
        border-none bg-transparent"
      >
        <div
          className="p-6 rounded flex flex-col gap-4
          bg-background border-darkerBg"
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
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <label htmlFor="title" className="font-bold text-[16px]">
                  Title
                </label>
                <span className="text-[13px] text-primary">12 / 70</span>
              </div>
              <input
                type="text"
                name="title"
                className="border border-darkerBg outline-none py-1 px-2 rounded
              focus:border-primary bg-transparent"
              />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <label htmlFor="description" className="font-bold text-[16px]">
                  Description
                </label>
                <span className="text-[13px] text-primary">12 / 500</span>
              </div>
              <textarea
                name="description"
                className="border border-darkerBg outline-none py-1 px-2 
                rounded focus:border-primary min-h-44 max-h-44 bg-transparent"
              />
            </div>
            {/* priority */}
            <div className="flex flex-col gap-2 items-start">
              <span className="font-bold text-[16px]">Priority</span>
              <div className="-translate-x-3 -translate-y-1">
                <SelectPriority priority={priority} setPriority={setPriority} />
              </div>
            </div>
          </div>
          <Button>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
