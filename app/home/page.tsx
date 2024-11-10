import {auth} from "@/auth";
import SignOutButon from "@/features/auth/components/sign-out-button";
import {redirect} from "next/navigation";
import React from "react";

async function HomePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  console.log("session", session);

  return (
    <div className="flex flex-col">
      Sign out button
      <SignOutButon />
    </div>
  );
}

export default HomePage;
