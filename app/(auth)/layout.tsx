import SignInWithGithubButton from "@/features/auth/components/sign-in-with-github";
import React, {PropsWithChildren} from "react";

function AuthLayout({children}: PropsWithChildren<object>) {
  return (
    <div className="w-full flex flex-col space-y-4 items-center justify-center min-h-screen bg-black text-white">
      {children}

      <SignInWithGithubButton />
    </div>
  );
}

export default AuthLayout;
