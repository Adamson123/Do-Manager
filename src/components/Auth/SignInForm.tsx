"use client";
import { signInSchema } from "@/schemas";
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
import { AlertTriangle, EyeIcon, EyeOffIcon } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import Link from "next/link";
import userServices from "@/services/userServices";
import signInAction from "@/actions/signInAction";
import delayTest from "@/utils/delayTest";
import PulseLoader from "react-spinners/PulseLoader";

const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, startTransition] = useTransition();
    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSignIn = async (user: z.infer<typeof signInSchema>) => {
        //const res = await userServices.signin(user);
        if (loading) return;
        setError("");
        startTransition(() => {
            signInAction(user).then((responds) => {
                if (responds) {
                    setError(responds.errMsg);
                }
            });
        });
    };

    return (
        <Card className="w-[350px] border-darkerBg">
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
                <CardDescription>
                    Sign in to your acount account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSignIn)}
                        className="space-y-3"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-darkerBg"
                                            placeholder="email"
                                            {...field}
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
                                                placeholder="password"
                                                {...field}
                                                type={
                                                    !showPassword
                                                        ? "password"
                                                        : "text"
                                                }
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full px-3 py-2 
                                                 hover:bg-transparent"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                aria-label={
                                                    showPassword
                                                        ? "Hide password"
                                                        : "Show password"
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
                        {error && (
                            <Alert className="bg-destructive/15 text-destructive  border-none">
                                <AlertDescription>
                                    <AlertTriangle className="inline w-4 h-4 -translate-y-[1px]" />{" "}
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" className="w-full relative">
                            {loading ? (
                                <PulseLoader
                                    size={10}
                                    className="absolute top-[50%]
                                    translate-y-[-50%] left-[50%] translate-x-[-50%]"
                                    color="rgb(var(--darkerBg))"
                                />
                            ) : (
                                "Sign In"
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
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-background px-2 text-muted-foreground">
                            OR SIGN IN WITH
                        </span>
                    </div>
                </div>
                <Button variant="outline" className="w-full">
                    Sign in with Google
                </Button>
                <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link href={"/signup"} className="underline">
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default SignInForm;
