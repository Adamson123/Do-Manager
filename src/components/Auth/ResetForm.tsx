"use client";
import { resetSchema } from "@/schemas";
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

const ResetForm = () => {
  const [loading, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleReset = async (email: z.infer<typeof resetSchema>) => {
    if (loading) return;

    setSuccess("");
    setError("");

    startTransition(() => {
      resetAction(email).then((response) => {
        setSuccess(response.successMsg);
        setError(response.errMsg);
      });
    });
  };

  return (
    <Card className="w-[350px] border-darkerBg">
      <CardHeader>
        <CardTitle>Forgot your password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleReset)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-darkerBg"
                      placeholder="alanwall66@gmail.com"
                      {...field}
                    />
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
                "Send reset email"
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

export default ResetForm;
