import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import * as z from "zod";
import updatePasswordAction from "@/actions/updatePasswordAction";
import { RawUserTypes } from "@/types/userTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState, useTransition } from "react";
import InlineErrorAlert from "@/components/ui/InlineErrorAlert";
import { updateUser } from "@/features/userSlice";
import InlineSuccessAlert from "@/components/ui/InlineSuccessAlert";

const PasswordInputs = () => {
  const { hasPassword, id: userId } = useSelector<RootState, RawUserTypes>(
    (state) => state.user.userInfo
  );
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      hasPassword,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      userId,
    },
  });
  const dispatch = useDispatch();

  const handlePasswordUpdate = (
    passwordInput: z.infer<typeof passwordSchema>
  ) => {
    // Handle password update logic here
    
    if (loading) return;
    setSuccess("");
    setError("");
    startTransition(() => {
      updatePasswordAction(passwordInput).then((response) => {
        const responseErr = response as { errMsg: string };
        if (responseErr.errMsg) {
          setError(responseErr.errMsg);
        } else {
          dispatch(updateUser(response));
          setSuccess("Password successfully updated");
          form.reset({
            hasPassword: true,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            userId,
          });
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form
        className="space-y-3 w-full"
        onSubmit={form.handleSubmit(handlePasswordUpdate)}
      >
        {form.getValues().hasPassword && (
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="space-y-2 w-full">
                <FormLabel className="text-muted-foreground text-[13px]">
                  Current password
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="space-y-2 w-full">
              <FormLabel className="text-muted-foreground text-[13px]">
                New password
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-2 w-full">
              <FormLabel className="text-muted-foreground text-[13px]">
                Confirm password
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {success && <InlineSuccessAlert success={success} />}
        {error && <InlineErrorAlert error={error} />}
        <Button type="submit" className="mt-4">
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </Form>
  );
};

export default PasswordInputs;
