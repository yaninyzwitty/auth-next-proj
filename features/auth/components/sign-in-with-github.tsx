"use client";

import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {FaGithub} from "react-icons/fa6";

function SignInWithGithubButton() {
  const signInWithGithub = (provider: "github") => {
    signIn(provider);
  };
  return (
    <Button
      className="h-16 text-lg rounded-xl w-[400px]"
      onClick={() => signInWithGithub("github")}
    >
      <FaGithub className="mr-2 size-8" />
      Sign in with github
    </Button>
  );
}

export default SignInWithGithubButton;
