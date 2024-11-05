import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
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
        closeDialogStyle="top-9"
        className=" max-w-lg px-3
                border-none bg-transparent flex  h-[calc(100vh-10px)]"
      >
        <div
          className="px-6 rounded flex flex-col gap-4
           bg-background border-darkerBg overflow-y-auto 
             overflow-x-hidden py-5"
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

          <Button>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
