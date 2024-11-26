import generateSubtask from "@/actions/generateSubtaskAction";
import { toast } from "@/components/ui/hooks/use-toast";
import { SubtaskInitialStateTypes } from "@/features/subtaskSlice";
import { addSubstask } from "@/features/taskSlice";
import { updateUser } from "@/features/userSlice";
import { RootState } from "@/store/store";
import { RawSubtaskTypes } from "@/types/subtaskTypes";
import { RawUserTypes } from "@/types/userTypes";
import { MessageCircleQuestion, WandSparkles } from "lucide-react";
import { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

const GenerateSubtask = () => {
  const [loading, startTransition] = useTransition();
  const {
    id: userId,
    dailyAiQuota: { remainingChance },
  } = useSelector<RootState, RawUserTypes>((state) => state.user.userInfo);
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

        const subtasks = response.subtasks as unknown as RawSubtaskTypes[];

        dispatch(addSubstask({ subtask: subtasks, id: subtask.taskId }));
        dispatch(updateUser({ dailyAiQuota: response.updatedAiQuota }));
        return toast({
          title: `Wala!!🎇`,
          description: "Subtasks generated",
        });
      });
    });
  };

  const quotaState = remainingChance ? remainingChance : "Out of spells";
  return (
    <div className="pr-2 flex items-center gap-[6px]">
      <div
        onClick={handleSubtaskGeneration}
        className="flex items-center hover:opacity-[0.8] transition-all
          bg-black px-2 py-1 min-w-[44px] h-[24px] rounded-full cursor-pointer gap-[2px] 
          border border-primary"
      >
        {loading ? (
          <PulseLoader size={6} color="hsl(var(--primary)" />
        ) : (
          <>
            {quotaState} <WandSparkles className="inline h-[14px] w-[14px]" />
          </>
        )}
      </div>

      <div className="relative wandNote h-[16px] w-[16px]">
        <MessageCircleQuestion className="h-[16px] w-[16px]" />
        <span
          className="bottom-1 right-2 absolute text-[11px]
         text-white w-32 py-2 pr-[2px] pl-2 rounded"
        >
          Still finding the perfect spell for this wand, but you might be
          lucky🙂.
        </span>
      </div>
    </div>
  );
};

export default GenerateSubtask;
