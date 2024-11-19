import { DEFAULT_SIGNIN_REDIRECT } from "../../../route";
import { Button } from "./button";
import { signIn } from "next-auth/react";

const GoogleSignIn = () => {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: DEFAULT_SIGNIN_REDIRECT })}
      variant="outline"
      className="w-full"
    >
      Continue with Google
    </Button>
  );
};

export default GoogleSignIn;
