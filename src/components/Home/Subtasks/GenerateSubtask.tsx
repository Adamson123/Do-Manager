import generateSubtask from "@/actions/generateSubtaskAction";
import { toast } from "@/components/ui/hooks/use-toast";
import { SubtaskInitialStateTypes } from "@/features/subtaskSlice";
import { addSubstask } from "@/features/taskSlice";
import { RootState } from "@/store/store";
import { RawSubtaskTypes } from "@/types/subtaskTypes";
import { response } from "express";
import { MessageCircleQuestion, WandSparkles } from "lucide-react";
import { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

const GenerateSubtask = () => {
  const [loading, startTransition] = useTransition();
  const userId = useSelector<RootState, string>(
    (state) => state.user.userInfo.id
  );
  const subtask = useSelector<RootState, SubtaskInitialStateTypes>(
    (state) => state.subtask
  );
  const dispatch = useDispatch();

  const handleSubtaskGeneration = () => {
    if (loading) return;
    startTransition(() => {
      generateSubtask(userId, subtask).then((response) => {
        const responseErr = response as { errMsg: string };
        if (responseErr?.errMsg) {
          return toast({
            title: responseErr.errMsg,
            description:
              "Operation completed with an error, please try again later",
            variant: "destructive",
          });
        }

        let subtasks = response as unknown as RawSubtaskTypes[];

        subtasks = subtasks.map((subtask) => ({
          ...subtask,
          createdAt: new Date(subtask.createdAt).toISOString(),
          updatedAt: new Date(subtask.updatedAt).toISOString(),
          dueDate: new Date(subtask.dueDate).toISOString(),
        })); //convert dates coming from to string as they are not serializable by redux

        dispatch(addSubstask({ subtask: subtasks, id: subtask.taskId }));
        return toast({
          title: `Wala!!🎇`,
          description: "Subtasks generated",
        });
      });
    });
  };

  return (
    <div className="pr-2 flex items-center gap-1">
      {loading ? (
        <PulseLoader size={10} className="" color="hsl(var(--primary)" />
      ) : (
        <div
          onClick={handleSubtaskGeneration}
          className="flex items-center hover:opacity-[0.8] transition-all"
        >
          <WandSparkles className="inline h-5 w-5" /> Generate subtask{" "}
          {/* <span className="rounded px-1 bg-primary text-background text-[13px]">
            {" "}
            Alpha
          </span> */}
        </div>
      )}
      <div className="relative wandNote h-[14px] w-[14px]">
        <MessageCircleQuestion className="h-[14px] w-[14px]" />
        <span
          className="bottom-1 right-2 absolute text-[11px]
         text-white w-32 py-2 pr-[2px] pl-2 rounded"
        >
          This wand is still finding the perfect spell, but you might be
          lucky🙂.
        </span>
      </div>
    </div>
  );
};

export default GenerateSubtask;
