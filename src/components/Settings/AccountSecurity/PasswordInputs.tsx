import { Input } from "@/components/ui/input";

const PasswordInputs = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Current password */}
      <div className="flex flex-col items-start gap-1 w-full">
        {/* input */}
        <span className="text-muted-foreground text-[13px]">
          Current password
        </span>

        <div className="flex flex-col gap-2 items-start w-full">
          <Input
            type="text"
            className="border border-darkerBg
            outline-none py-[5px] px-1 rounded
            focus:border-primary flex-grow bg-transparent 
            text-[14px] w-full"
          />
          <span className="text-sm text-muted-foreground">3/40</span>
        </div>
      </div>
      {/* New password */}
      <div className="flex flex-col items-start gap-1 w-full">
        {/* input */}

        <span className="text-muted-foreground text-[13px]">New password</span>

        <div className="flex flex-col gap-2 items-start w-full">
          <Input
            type="text"
            className="border border-darkerBg
            outline-none py-[5px] px-1 rounded
            focus:border-primary flex-grow bg-transparent 
            text-[14px] w-full"
          />
          <span className="text-sm text-muted-foreground">3/40</span>
        </div>
      </div>
      {/* Confirm Passowrd */}
      <div className="flex flex-col items-start gap-1">
        <span className="text-muted-foreground text-[13px]">
          Confirm password
        </span>
        {/* input */}
        <div className="flex gap-2 items-center w-full">
          <Input
            type="text"
            className="border border-darkerBg
          outline-none py-[5px] px-1 rounded
          focus:border-primary flex-grow bg-transparent text-[14px]"
          />
          {/* <span className="text-[13px] text-primary">40</span> */}
        </div>
      </div>
    </div>
  );
};

export default PasswordInputs;
