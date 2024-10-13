import { Briefcase, ChevronDown, SettingsIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Settings from "../Settings/Settings";
import { useRef } from "react";

const UserProfile = () => {
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex gap-1 items-center cursor-pointer">
          {/* Avatar */}
          <span>
            <Briefcase
              className="fill-foreground w-[18px] h-[18px]
             stroke-background"
            />
          </span>
          {/* Name */}
          <span className="text-[13px] text-center">Adam Ajibade</span>
          <ChevronDown className="w-4 h-4 translate-y-[1px]" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto -translate-x-5 md:-translate-x-9 translate-y-3
        shadow-md border-darkerBg pt-2 pb-0 px-0 flex flex-col"
      >
        <Briefcase
          className="fill-foreground min-w-[50px]
           min-h-[50px] stroke-background pl-3"
        />
        {/* Username , Email and Settings, Log out */}

        <div className="flex flex-col gap-2 items-start">
          <div className="flex flex-col gap-2 items-start px-3">
            {/* Username and Email */}
            <div className="flex flex-col">
              <span>Adam Ajibade</span>
              <span className="text-[12px] text-muted-foreground">
                dapoajibade66@gmail.com
              </span>
            </div>
            {/* Settings button */}
            <Button
              onClick={() => dialogTriggerRef.current?.click()}
              className="h-8 bg-transparent border-darkerBg border 
            text-foreground text-[14px] flex gap-1 hover:bg-darkerBg"
            >
              <SettingsIcon className="w-4 h-4" />
              Settings
            </Button>
          </div>

          {/* log out */}

          <div
            className="border-t 
            text-muted-foreground border-darkerBg 
            w-full text-[14px] py-2 px-3 cursor-pointer
            hover:bg-darkerBg"
          >
            Log out
          </div>
        </div>
        <Settings dialogTriggerRef={dialogTriggerRef} />
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
