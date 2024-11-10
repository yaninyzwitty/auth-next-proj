import {auth} from "@/auth";
import SignOutButon from "@/features/auth/components/sign-out-button";
import React from "react";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return (
      <>
        <SignOutButon />
      </>
    );
  }

  return <div>Home</div>;
}
