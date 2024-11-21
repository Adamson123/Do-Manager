import { useState, useRef, Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { AlignLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { createSubtaskSchema } from "@/schemas";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
    createSubtask,
    editSubtask,
    SubtaskInitialStateTypes,
} from "@/features/subtaskSlice";
import DueDatePicker from "./DueDatePicker";
import { SubtaskTypes } from "@/types/subtaskTypes";
import { RawUserTypes } from "@/types/userTypes";

export interface ActionType {
    exec: string;
    task: SubtaskTypes;
    id: string;
}
interface CreateSubtaskProps {
    //  dialogTriggerRef: React.RefObject<HTMLButtonElement>;
    dialogOpen: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
    action?: ActionType;
}

const actionDefaultValue = {
    exec: "create",
    task: {
        title: "",
        description: "",
        dueDate: new Date().toISOString(),
        taskId: "",
        userId: "",
    },
    id: "",
};

const CreateSubtask = ({
    setDialogOpen,
    dialogOpen,
    action = actionDefaultValue,
}: CreateSubtaskProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { createSubtaskLoading, editSubtaskLoading, taskId } = useSelector<
        RootState,
        SubtaskInitialStateTypes
    >((state) => state.subtask);
    const { id: userId } = useSelector<RootState, RawUserTypes>(
        (state) => state.user.userInfo,
    );

    //const [dialogOpen, setdialogOpen] = useState(false);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);
    //closed by user while a request was made
    const [closeWhileOnReq, setCloseWhileOnReq] = useState(false);
    const [fulfilled, setFulfilled] = useState(false);

    const form = useForm<z.infer<typeof createSubtaskSchema>>({
        resolver: zodResolver(createSubtaskSchema),
        defaultValues: {
            title: action.task.title,
            description: action.task.description,
            dueDate: action.task.dueDate,
            taskId: action.task.taskId || taskId,
            userId,
        },
    });

    useEffect(() => {
        form.reset({
            title: action.task.title,
            description: action.task.description,
            dueDate: action.task.dueDate,
            taskId: action.task.taskId || taskId,
            userId,
        });
    }, [action, form, taskId, userId]);

    useEffect(() => {
        form.setValue("taskId", taskId);
    }, [taskId]);

    useEffect(() => {
        if (!fulfilled) return;

        if (!closeWhileOnReq) {
            setDialogOpen(false);
        } else {
            setCloseWhileOnReq(false);
        }
        setFulfilled(false);
    }, [fulfilled, closeWhileOnReq]);

    const handleCreateSubtask = (
        subtask: z.infer<typeof createSubtaskSchema>,
    ) => {
        if (createSubtaskLoading) return;
        console.log(subtask);
        dispatch(createSubtask(subtask)).finally(() => {
            setFulfilled(true);
        });
    };

    const handleEditSubtask = (
        subtask: z.infer<typeof createSubtaskSchema>,
    ) => {
        if (editSubtaskLoading) return;
        dispatch(editSubtask({ subtask, id: action.id })).finally(() => {
            setFulfilled(true);
        });
    };

    const getRightLabel = () => {
        if (action.exec === "edit") {
            if (editSubtaskLoading) {
                return "Updating...";
            } else {
                return "Update subtask";
            }
        } else {
            if (createSubtaskLoading) {
                return "Creating...";
            } else {
                return "Create subtask";
            }
        }
    };

    const label = getRightLabel();
    return (
        <Dialog
            onOpenChange={(state) => {
                setDialogOpen(state);
                if (state) return;
                if (createSubtaskLoading || editSubtaskLoading) {
                    setCloseWhileOnReq(true);
                }
            }}
            open={dialogOpen}
        >
            <DialogTrigger className="w-0 h-0 p-0 opacity-0 pointer-events-none" />
            <DialogContent
                className="max-w-lg z-[100]"
                onClick={() => setOpenDatePicker(false)}
            >
                <DialogHeader>
                    <DialogTitle>
                        {" "}
                        {action.exec === "edit" ? "Edit" : "Create"} Subtask
                    </DialogTitle>
                    <DialogDescription>
                        {action.exec === "edit"
                            ? "Edit your subtask's details"
                            : "Create a new subtask to add to your list"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            action.exec === "edit"
                                ? handleEditSubtask
                                : handleCreateSubtask,
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
                                        <Input
                                            placeholder="Enter title..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                    <FormDescription>
                                        {field.value.length} / 70
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <AlignLeft className="h-5 w-5 inline" />{" "}
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter description..."
                                            {...field}
                                            className="resize-none min-h-32 max-h-32"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                    <FormDescription>
                                        {field.value?.length} / 200
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <Clock className="h-5 w-5 inline" /> Due
                                        date
                                    </FormLabel>
                                    <FormControl className="relative">
                                        <div className="relative">
                                            <Button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setOpenDatePicker(
                                                        !openDatePicker,
                                                    );
                                                }}
                                                className="text-secondary-foreground border 
                        border-darkerBg bg-transparent hover:bg-darkerBg h-[37px]"
                                            >
                                                {field.value
                                                    ? format(
                                                          field.value,
                                                          "EEE, MMM d, h aaa",
                                                      )
                                                    : "Pick a date"}
                                            </Button>
                                            {openDatePicker && (
                                                <div
                                                    ref={datePickerRef}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                    }}
                                                    // -top-10 left-36
                                                    className="absolute -top-[310px] bg-secondary
                           rounded-md shadow-lg"
                                                >
                                                    <DueDatePicker
                                                        field={field}
                                                        form={form}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                    <FormDescription>
                                        Add due date
                                    </FormDescription>
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

export default CreateSubtask;
