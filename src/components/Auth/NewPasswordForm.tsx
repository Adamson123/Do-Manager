"use client";
import { newPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import PulseLoader from "react-spinners/PulseLoader";
import InlineErrorAlert from "../ui/InlineErrorAlert";
import InlineSuccessAlert from "../ui/InlineSuccessAlert";
import resetAction from "@/actions/resetAction";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import newPasswordAction from "@/actions/newPasswordAction";

const NewPasswordForm = () => {
  const token = useSearchParams().get("token") as string;
  const [loading, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleNewPassword = async ({
    password,
  }: z.infer<typeof newPasswordSchema>) => {
    if (loading) return;

    setSuccess("");
    setError("");

    startTransition(() => {
      newPasswordAction(password, token).then((response) => {
        setSuccess(response?.successMsg);
        setError(response?.errMsg);
      });
    });
  };

  return (
    <Card className="w-[350px] border-darkerBg">
      <CardHeader>
        <CardTitle>New password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNewPassword)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="border-darkerBg"
                        placeholder="•••••••••••••••"
                        {...field}
                        type={!showPassword ? "password" : "text"}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 
                                                hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-[12px]" />
                </FormItem>
              )}
            />
            {error && <InlineErrorAlert error={error} />}
            {success && <InlineSuccessAlert success={success} />}
            <Button type="submit" className="w-full relative">
              {loading ? (
                <PulseLoader
                  size={10}
                  className="absolute top-[50%]
                  translate-y-[-50%] left-[50%] translate-x-[-50%]"
                  color="rgb(var(--darkerBg))"
                />
              ) : (
                "Enter a new password"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-[15px]">
        <Link href={"/signin"} className="underline text-center w-full">
          Back to sign in
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewPasswordForm;
