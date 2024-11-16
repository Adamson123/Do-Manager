import { ChevronDown, SettingsIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { RawUserTypes } from "@/types/userTypes";
import clientSignOut from "@/lib/signOut-action";
import Image from "next/image";
const Settings = dynamic(() => import("../Settings/Settings"), { ssr: false });

const UserProfile = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { email, name, image } = useSelector<RootState, RawUserTypes>(
    (state) => state.user.userInfo
  );

  const userImg = image ? `/images/${image}.webp` : "/images/defaultImg.webp";
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex gap-1 items-center cursor-pointer">
          {/* Avatar */}
          <span className="relative w-[25px] h-[25px]">
            <Image
              src={userImg}
              alt="Profile image"
              className="object-cover rounded-full"
              fill
            />
          </span>
          {/* Name */}
          <span className="text-[13px] text-center">{name}</span>
          <ChevronDown className="w-4 h-4 translate-y-[1px]" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto -translate-x-5 md:-translate-x-9 translate-y-3
        shadow-md border-darkerBg pt-3 pb-0 px-0 flex flex-col items-center"
      >
        <div
          className="relative min-w-[60px]
           min-h-[60px]"
        >
          <Image
            src={userImg}
            alt="Profile image"
            className="object-cover rounded-full"
            fill
          />
        </div>
        {/* Username , Email and Settings, Log out */}

        <div className="flex flex-col gap-2 pt-3">
          <div className="flex flex-col gap-2 items-center px-3">
            {/* Username and Email */}
            <div className="flex flex-col items-center">
              <span>{name}</span>
              <span className="text-[12px] text-muted-foreground">{email}</span>
            </div>
            {/* Settings button */}
            <Button
              onClick={() => setSettingsOpen(true)}
              className="h-8 bg-transparent border-darkerBg border 
              text-foreground text-[14px] flex gap-1 hover:bg-darkerBg"
            >
              <SettingsIcon className="w-4 h-4" />
              Settings
            </Button>
          </div>

          {/* log out */}

          <div
            onClick={async () => {
              await clientSignOut();
              window.location.href = "/signin";
            }}
            className="border-t 
            text-muted-foreground border-darkerBg 
            w-full text-[14px] py-2 px-3 cursor-pointer
            hover:bg-darkerBg"
          >
            Sign out
          </div>
        </div>
        {settingsOpen && (
          <Settings dialogOpen={settingsOpen} setDialogOpen={setSettingsOpen} />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
