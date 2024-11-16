import { ActionType } from "@/components/Home/Subtasks/CreateSubtask";
import { Dispatch, SetStateAction, useState } from "react";

const useCreateSubtask = () => {
    const [action, setAction] = useState<ActionType>({
        exec: "create",
        task: {
            title: "",
            description: "",
            dueDate: new Date().toISOString(),
            taskId: "",
            userId: "",
        },
        id: "",
    });

    // To trigger task creation
    const triggerCreateSubtask = (
        setCreateDialogOpen: Dispatch<SetStateAction<boolean>>
    ) => {
        setAction({
            exec: "create",
            task: {
                title: "",
                description: "",
                dueDate: new Date().toISOString(),
                taskId: "",
                userId: "",
            },
            id: "",
        });
        // dialogTriggerRef.current?.click();
        setCreateDialogOpen(true);
    };

    return { action, setAction, triggerCreateSubtask };
};

export default useCreateSubtask;
