"use client";
import { useState } from "react";
import { Switch } from "../../ui/switch";
import PasswordInput from "./PasswordInputs";

const AccountSecurity = () => {
  const [switchOn, setSwitchOn] = useState(false);
  console.log(switchOn);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-[16px] border-b pb-2">Account security </h2>

      {/* Email */}
      <div className="flex flex-col items-start">
        <span className="text-[13px]">Email</span>

        <span className="text-[12px] text-muted-foreground">
          dapoajibade66@gmail.com
        </span>
      </div>
      {/* Password */}
      <div className="flex flex-col gap-2 items-start">
        <span className="text-[13px]">Password</span>

        <div className="flex w-full justify-between items-center">
          <span className="text-[12px] text-muted-foreground">
            Set password if you want to be able to login without Google.
          </span>
          <Switch
            onCheckedChange={() => {
              setSwitchOn(!switchOn);
            }}
          />
        </div>
        <br />
        {/* Set a password */}

        {switchOn && <PasswordInput />}
      </div>
    </div>
  );
};

export default AccountSecurity;
