"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {LoginSchema} from "../schemas";
import {Suspense, useState, useTransition} from "react";
import {loginWithValues} from "../server/login";
import FormError from "./form-error";
import {signIn} from "next-auth/react";
import {AuthError} from "next-auth";
import {useSearchParams} from "next/navigation";

export default function Login() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const searchParams = useSearchParams();

  const urlError =
    searchParams.get("error") === "CredentialsSignin" &&
    searchParams.get("code") === "credentials"
      ? "Invalid credentials"
      : "";
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("");
    startTransition(() => {
      loginWithValues(values).then((data) => {
        if (data.success) {
          const {email, password} = data.success;

          try {
            signIn("credentials", {
              email: email,
              password,
              redirectTo: "/home",
            });
          } catch (error) {
            if (error instanceof AuthError) {
              switch (error.type) {
                case "CredentialsSignin":
                  return {error: "Invalid credentials!"};
                default:
                  return {error: "Something went wrong!"};
              }
            }

            throw error;
          }
        } else {
          setError(data.error);
        }
      });
    });
  }
  return (
    <Suspense fallback="searching...">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h2 className="text-xl font-semibold text-center mt-2">
            Login to your witty account
          </h2>
          <div className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="email"
                      {...field}
                      disabled={pending}
                      className="h-16 rounded-xl w-[400px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="******"
                      type="password"
                      {...field}
                      disabled={pending}
                      className="h-16 rounded-xl w-[400px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-16 rounded-xl w-[400px]"
              disabled={!form.formState.isValid || pending}
            >
              Submit
            </Button>
            <FormError message={error || urlError || ""} />
          </div>
        </form>
      </Form>
    </Suspense>
  );
}
