import { useState } from "react";
import { Switch } from "../../ui/switch";
import PasswordInput from "./PasswordInputs";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AccountSecurity = () => {
  const hasPassword = useSelector<RootState, boolean>(
    (state) => state.user.userInfo.hasPassword
  ) as boolean;
  const [switchOn, setSwitchOn] = useState(hasPassword);

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
            Set password if you want to be able to sign in without Google.
          </span>
          <Switch
            disabled={hasPassword}
            checked={switchOn}
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
