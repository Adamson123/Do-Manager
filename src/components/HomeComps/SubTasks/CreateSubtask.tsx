import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AlignLeft, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface CreateSubtaskProps {
  dialogTriggerRef: React.RefObject<HTMLButtonElement>;
  setDialogOpened: Dispatch<SetStateAction<boolean>>;
}

const CreateSubtask = ({ dialogTriggerRef }: CreateSubtaskProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  // const getDatePickerPosition = () => {
  //   const datePickerRect = datePickerRef.current?.getBoundingClientRect();
  //   const bottom = datePickerRect?.bottom;
  //   console.log(bottom, window.innerHeight, window.scrollY, datePickerRect);
  //   return { bottom };
  // };

  return (
    <Dialog>
      <DialogTrigger
        ref={dialogTriggerRef}
        className="w-0 h-0 p-0 opacity-0 pointer-events-none"
      ></DialogTrigger>

      <DialogContent
        className="max-w-lg p-0 px-3
        border-none bg-transparent z-[100]"
      >
        <div
          onClick={() => setOpenDatePicker(false)}
          className="p-6 rounded flex flex-col gap-4
            bg-background border-darkerBg"
        >
          <DialogHeader>
            <DialogTitle>Create Subtask</DialogTitle>
            <DialogDescription>
              Create a new subtask to add to your list
            </DialogDescription>
          </DialogHeader>
          {/* Inputs */}
          <div className="flex flex-col gap-3  ">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="font-bold text-[16px]">Title</span>
                <span className="text-[13px] text-primary font-bold">
                  1 / 80
                </span>
              </div>
              <input
                type="text"
                className="border border-darkerBg outline-none py-1 px-2 rounded
                focus:border-primary bg-transparent"
              />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="font-bold text-[16px]">
                  <AlignLeft className="h-5 w-5 inline" /> Description
                </span>
                <span className="text-[13px] text-primary font-bold">
                  12 / 250
                </span>
              </div>
              <textarea
                name="description"
                className="border border-darkerBg outline-none py-1 px-2 
                rounded focus:border-primary min-h-36 max-h-36
                bg-transparent"
              />
            </div>
          </div>
          {/* Date */}
          <div className="relative flex flex-col gap-1 items-start">
            <span className="font-bold text-[16px]">
              <Clock className="h-5 w-5 inline" /> Date
            </span>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                setOpenDatePicker(!openDatePicker);
              }}
              className="text-secondary-foreground border 
              border-darkerBg bg-transparent hover:bg-darkerBg h-[37px]"
            >
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>

            {/* ${
                  getDatePickerPosition()?.bottom || 0 >= window.innerHeight
                    ? "-top-[310px]"
                    : "-top-10"
              */}
            {openDatePicker && (
              <div
                ref={datePickerRef}
                onClick={(event) => {
                  event.stopPropagation();
                }}
                className={`absolute -top-[310px] bg-secondary rounded-md shadow-lg`}
              >
                <Calendar
                  selected={date}
                  mode="single"
                  onSelect={setDate}
                  initialFocus
                />
              </div>
            )}
          </div>
          {/* Create subtask */}
          <Button>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubtask;
