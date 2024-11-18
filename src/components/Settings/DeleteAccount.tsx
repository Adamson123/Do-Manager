import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
        <div className="grid grid-cols-3 gap-2 items-end">
          <div className="col-span-2">
            <span className="text-[12px] text-muted-foreground">
              To confirm this, type <b>"DELETE"</b>
            </span>
            <Input
              type="text"
              className="border border-darkerBg outline-none py-[5px] px-1 rounded
              focus:border-primary flex-grow bg-transparent
              text-[14px] items-center w-full"
            />
          </div>

          <Button variant="destructive" className="rounded">
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
