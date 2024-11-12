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
import { AlertTriangle, EyeIcon, EyeOffIcon } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import Link from "next/link";
import userServices from "@/services/userServices";
import signUpAction from "@/actions/signUpAction";
import { useRouter } from "next/navigation";
import PulseLoader from "react-spinners/PulseLoader";
import delayTest from "@/utils/delayTest";

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
    const router = useRouter();

    const handleSignUp = async (user: z.infer<typeof signUpSchema>) => {
        // const res = await userServices.signup(user);
        // console.log(res);

        if (loading) return;
        setError("");
        startTransition(() => {
            signUpAction(user).then((responds) => {
                if (!responds) return;
                if (responds.errMsg) {
                    setError(responds.errMsg);
                } else {
                    router.push("/");
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
                                            placeholder="username"
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
                                            placeholder="email"
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
                        <span className="bg-background px-2 text-muted-foreground">
                            Or sign up with
                        </span>
                    </div>
                </div>
                <Button variant="outline" className="w-full">
                    Sign up with Google
                </Button>
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
