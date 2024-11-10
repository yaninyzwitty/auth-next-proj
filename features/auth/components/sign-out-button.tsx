"use client";
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";
import React from "react";

function SignOutButon() {
  return (
    <Button onClick={() => signOut()} className="w-fit">
      Sign out
    </Button>
  );
}

export default SignOutButon;
