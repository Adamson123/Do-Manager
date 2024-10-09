import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SettngsProps {
  dialogTriggerRef: React.RefObject<HTMLButtonElement>;
}

const Settings = ({ dialogTriggerRef }: SettngsProps) => {
  const [priority, setPriority] = useState("high");

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
        <div
          className="p-6 rounded flex flex-col gap-4
            bg-background border-darkerBg"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl">Settings</DialogTitle>
            <DialogDescription>Edit your profile settings</DialogDescription>
          </DialogHeader>
          {/* SETTINGS */}

          <div>
            {/* Profile */}
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-[16px] border-b pb-2">Profile</h2>

              {/* Username */}
              <div className="flex flex-col items-start gap-1">
                <span className="text-muted-foreground text-[13px]">
                  Username
                </span>
                {/* input */}
                <div className="flex gap-1 items-center w-full">
                  <input
                    type="text"
                    className="border border-darkerBg
                    outline-none py-[2px] px-1 rounded
                    focus:border-primary flex-grow bg-transparent text-[14px]"
                  />
                  <span className="text-[12px] text-primary">40</span>
                </div>
              </div>
              {/* Avatar */}
              <div className="flex flex-col items-start gap-1">
                <span className="text-muted-foreground text-[13px]">
                  Avatar
                </span>
                {/* Avatar */}
                <div className="flex flex-col gap-2">
                  <img
                    src="./images/spi 2.jpg"
                    alt="Profile image"
                    className="h-[80px] w-[80px] border
                  border-darkerBg object-cover rounded"
                  />
                  <Button
                    className="text-[12px] h-5 rounded-[2px]
                   bg-transparent border text-foreground
                  border-darkerBg hover:bg-darkerBg"
                  >
                    Choose Avatar
                  </Button>
                </div>
              </div>
            </div>
            {/* Account security */}
          </div>

          <Button>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
