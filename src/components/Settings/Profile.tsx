import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "../ui/input";

const Profile = () => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-[16px] border-b pb-2">Profile</h2>

      {/* Username */}
      <div className="flex flex-col items-start gap-1">
        <span className="text-muted-foreground text-[13px]">Username</span>

        {/* input */}
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
