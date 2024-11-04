import { Calendar } from "@/components/ui/calendar";
import { SubtaskTypes } from "@/types/subtaskTypes";
import { format, getTime } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

interface DueDatePickerProps {
  field: ControllerRenderProps<SubtaskTypes, "dueDate">;
  form: UseFormReturn<SubtaskTypes, any, undefined>;
}

const DueDatePicker = ({ field, form }: DueDatePickerProps) => {
  const date = new Date(field.value);
  const dateInMili = new Date(date.setHours(0, 0, 0, 0)).getTime();

  const timeInMili =
    new Date(field.value).getHours() * 60 * 60 * 1000 +
    new Date(field.value).getMinutes() * 60 * 1000;

  const [datetime, setDatetime] = useState({
    dateMili: dateInMili,
    timeMili: timeInMili,
  });

  const toTimeElementValueFormat = () => {
    const date = new Date(field.value);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [time, setTime] = useState(toTimeElementValueFormat());

  useEffect(() => {
    const day = new Date(datetime.dateMili + datetime.timeMili).toISOString();
    // if (datetime.dateMili && datetime.timeMili) {
    form.setValue("dueDate", day);
    //}
  }, [datetime]);

  return (
    <div className="">
      <div className="flex flex-col gap-3 p-3">
        <div className="flex flex-col gap-1">
          Set date
          <Calendar
            selected={new Date(field.value)}
            mode="single"
            onSelect={(value) => {
              //field.onChange(value?.toISOString());
              const toTypeString = value as Date;
              const date = new Date(toTypeString);
              const dateToMili = date.setHours(0, 0, 0, 0);
              if (!isNaN(dateToMili))
                setDatetime({ ...datetime, dateMili: dateToMili });
            }}
            initialFocus
          />
        </div>
        <div className="flex flex-col gap-1">
          Input time
          <div className="relative">
            <input
              value={time}
              type="time"
              onChange={(time) => {
                const [hours, min] = time.target.value.split(":").map(Number);
                const tToMili = hours * 60 * 60 * 1000 + min * 60 * 1000;
                setTime(time.target.value);
                if (!isNaN(tToMili))
                  setDatetime({ ...datetime, timeMili: tToMili });
              }}
              className="border p-2 rounded timeInput w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueDatePicker;
