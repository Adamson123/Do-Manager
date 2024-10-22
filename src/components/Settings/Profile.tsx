import { Button } from "@/components/ui/button";
import Image from "next/image";

const Profile = () => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-[16px] border-b pb-2">Profile</h2>

      {/* Username */}
      <div className="flex flex-col items-start gap-1">
        <div className="flex gap-2 items-center w-full justify-between">
          <span className="text-muted-foreground text-[13px]">Username</span>
          <span className="text-[13px] text-primary">5 / 40</span>
        </div>
        {/* input */}
        <input
          type="text"
          className="border border-darkerBg
          outline-none py-[5px] px-1 rounded
          focus:border-primary flex-grow bg-transparent 
          text-[14px] w-full"
        />
      </div>
      {/* Avatar */}
      <div className="flex flex-col items-start gap-1">
        <span className="text-muted-foreground text-[13px]">Avatar</span>
        {/* Avatar */}
        <div className="flex flex-col gap-2">
          <div className="relative h-[80px] w-[80px]">
            <Image
              src="/images/spi 2.jpg"
              alt="Profile image"
              className="object-cover rounded border border-darkerBg"
              fill
              quality={100}
            />
          </div>
          <Button
            className="text-[12px] h-7 rounded-[2px]
            bg-transparent border text-foreground
            border-darkerBg hover:bg-darkerBg"
          >
            Choose Avatar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
