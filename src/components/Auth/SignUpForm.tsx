"use client";
import { signUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import signUpAction from "@/actions/signUpAction";
import PulseLoader from "react-spinners/PulseLoader";
import InlineErrorAlert from "../ui/InlineErrorAlert";
import GoogleSignIn from "../ui/GoogleSignIn";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const handleSignUp = async (user: z.infer<typeof signUpSchema>) => {
    if (loading) return;
    setError("");
    startTransition(() => {
      signUpAction(user).then((response) => {
        if (response) {
          setError(response.errMsg);
        }
      });
    });
  };

  return (
    <Card className="w-[350px] border-darkerBg">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-darkerBg"
                      placeholder="Alan wall"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px]" />
                </FormItem>
              )}
            />
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
                      type="email"
                    />
                  </FormControl>
                  <FormMessage className="text-[12px]" />
                </FormItem>
              )}
            />
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
            <Button type="submit" className="w-full relative">
              {loading ? (
                <PulseLoader
                  size={10}
                  className="absolute top-[50%]
                  translate-y-[-50%] left-[50%] translate-x-[-50%]"
                  color="rgb(var(--darkerBg))"
                />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <GoogleSignIn />
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
