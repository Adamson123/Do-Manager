import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import Profile from "./Profile";
import AccountSecurity from "./AccountSecurity/AccountSecurity";
import DeleteAccount from "./DeleteAccount";
import { Dispatch, SetStateAction } from "react";

interface SettngsProps {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const Settings = ({ setDialogOpen, dialogOpen }: SettngsProps) => {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="w-0 h-0 p-0 opacity-0 pointer-events-none"></DialogTrigger>

      <DialogContent
        //closeDialogStyle="top-9"
        className=" max-w-lg px-6
          flex flex-col gap-4 border-none
          overflow-x-hidden py-5 bg-background border-darkerBg
          overflow-y-auto h-full"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Settings</DialogTitle>
          <DialogDescription>Edit your profile settings</DialogDescription>
        </DialogHeader>
        {/* SETTINGS */}
        <div className="flex flex-col gap-3">
          {/* Profile */}
          <Profile />
          {/* Account security */}
          <AccountSecurity />
          {/* Delete Account */}
          <DeleteAccount />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
