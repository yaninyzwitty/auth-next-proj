"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useActionState} from "react";
import {registerWithValues} from "../server/register";
import Link from "next/link";
import FormSuccess from "./form-success";
import FormError from "./form-error";

const initialValues = {
  name: "",
  email: "",
  password: "",
  success: "",
};

export default function Register() {
  const [result, formAction, pending] = useActionState(
    registerWithValues,
    initialValues
  );
  return (
    <div className="flex flex-col ">
      <h2 className="text-xl font-semibold text-center mt-2">
        Register with your witty account
      </h2>
      <form action={formAction} className="space-y-6">
        <Input
          required
          placeholder="Enter name"
          defaultValue={result.name}
          name="name"
          disabled={pending}
          autoComplete="name"
          className="h-16 rounded-xl w-[400px]"
        />
        <Input
          required
          placeholder="Enter email"
          defaultValue={result?.email}
          type="email"
          name="email"
          disabled={pending}
          autoComplete="email"
          className="h-16 rounded-xl w-[400px]"
        />
        <Input
          required
          disabled={pending}
          name="password"
          defaultValue={result?.password}
          placeholder="Enter password"
          autoComplete="password"
          type="password"
          className="h-16 rounded-xl w-[400px]"
        />
        <Button
          disabled={pending}
          className="h-16 text-lg rounded-xl w-[400px]"
        >
          Log in
        </Button>
      </form>
      <FormSuccess message={result.success || ""} />
      <FormError message={result?.error || ""} />

      <Link href={"/login"} className="my-2 text-center text-sm">
        Already have an account?{" "}
        <span className="text-blue-500 text-base">Login</span>
      </Link>
    </div>
  );
}
