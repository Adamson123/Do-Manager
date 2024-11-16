import { Button } from "../ui/button";

const DeleteAccount = () => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-[16px] border-b pb-2">Deleting Account</h2>

      <div className="flex flex-col gap-2">
        <p className="text-[12px] text-muted-foreground">
          Deleting your account will remove all of your information from the
          database. This cannot be undone.
        </p>
        {/* Confirm Delete */}
        <div className="flex gap-2 items-end">
          <div className="flex-2">
            <span className="text-[12px] text-muted-foreground">
              To confirm this, type <b>"DELETE"</b>
            </span>
            <input
              type="text"
              className="border border-darkerBg
            outline-none py-[5px] px-1 rounded
            focus:border-primary flex-grow bg-transparent
            text-[14px] items-center w-full"
            />
          </div>

          <Button variant="destructive" className="h-[33px] rounded flex-1">
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
