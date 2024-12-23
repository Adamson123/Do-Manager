import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import deleteAccountAction from "@/actions/deleteAccountAction";
import { signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { RawUserTypes } from "@/types/userTypes";

const DeleteAccount = () => {
  const [deleteText, setDeleteText] = useState("");
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState("");
  const { id: userId, image } = useSelector<RootState, RawUserTypes>(
    (state) => state.user.userInfo
  );

  const handleDeleteAccount = () => {
    if (deleteText !== "DELETE") return setError("Input does not match");
    setError("");
    startTransition(() => {
      deleteAccountAction(userId, image as string).then(async (response) => {
        if (response?.errMsg) {
          return setError("Error deleting account");
        }
        signOut({ redirect: true, redirectTo: "/signup" });
      });
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-[16px] border-b pb-2">Deleting Account</h2>

      <div className="flex flex-col gap-2">
        <p className="text-[12px] text-muted-foreground">
          Deleting your account will remove all of your information from the
          database. This cannot be undone.
        </p>
        {/* Confirm Delete */}
        <div className="grid grid-cols-3 gap-2 items-end">
          <div className="col-span-2">
            <span className="text-[12px] text-muted-foreground">
              To confirm this, type <b>"DELETE"</b>
            </span>
            <Input
              onChange={(event) => setDeleteText(event.target.value)}
              value={deleteText}
              type="text"
              className="border border-darkerBg outline-none py-[5px] px-1 rounded
              focus:border-primary flex-grow bg-transparent
              text-[14px] items-center w-full"
            />
          </div>

          <Button
            onClick={handleDeleteAccount}
            variant="destructive"
            className="rounded"
          >
            {loading ? "Deleting..." : "Delete account"}
          </Button>
        </div>
        {error && (
          <span className="text-destructive text-[14px] -translate-y-[6px]">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default DeleteAccount;
