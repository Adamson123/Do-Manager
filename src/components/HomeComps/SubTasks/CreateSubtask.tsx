import { useState, useRef, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { AlignLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { createSubTaskSchema } from "@/app/schemas";
import { Textarea } from "@/components/ui/textarea";

interface CreateSubtaskProps {
  dialogTriggerRef: React.RefObject<HTMLButtonElement>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateSubtask = ({
  dialogTriggerRef,
  setDialogOpen,
}: CreateSubtaskProps) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof createSubTaskSchema>>({
    resolver: zodResolver(createSubTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof createSubTaskSchema>) {
    console.log(values);
    setDialogOpen(false);
  }

  return (
    <Dialog onOpenChange={setDialogOpen}>
      <DialogTrigger
        ref={dialogTriggerRef}
        className="w-0 h-0 p-0 opacity-0 pointer-events-none"
      />
      <DialogContent
        className="max-w-lg z-[100]"
        onClick={() => setOpenDatePicker(false)}
      >
        <DialogHeader>
          <DialogTitle>Create Subtask</DialogTitle>
          <DialogDescription>
            Create a new subtask to add to your list
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormLabel>
                    <AlignLeft className="h-5 w-5 inline" /> Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description..."
                      {...field}
                      className="resize-none min-h-32 max-h-32"
                    />
                  </FormControl>
                  <FormMessage className="text-[12px]" />
                  <FormDescription>{field.value.length} / 200</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Clock className="h-5 w-5 inline" /> Date
                  </FormLabel>
                  <FormControl className="relative">
                    <div className="relative">
                      <Button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenDatePicker(!openDatePicker);
                        }}
                        className="text-secondary-foreground border 
                        border-darkerBg bg-transparent hover:bg-darkerBg h-[37px]"
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                      {openDatePicker && (
                        <div
                          ref={datePickerRef}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                          className="absolute -top-[310px] bg-secondary
                           rounded-md shadow-lg"
                        >
                          <Calendar
                            selected={field.value}
                            mode="single"
                            onSelect={(date) => {
                              field.onChange(date);
                            }}
                            initialFocus
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-[12px]" />
                  <FormDescription>Add Date</FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubtask;
