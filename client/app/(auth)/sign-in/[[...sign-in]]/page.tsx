"use client";

import Logo from "@/components/Logo";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen relative w-full">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/bg-sign-in.jpg')]" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex w-full min-h-screen items-center px-4 py-8 sm:justify-center lg:px-8">
        <SignIn.Root>
          {/* Sign In */}
          <SignIn.Step
            name="start"
            className="w-full max-w-2xl mx-auto space-y-6 rounded-2xl bg-secondary-100 backdrop-blur-sm px-6 py-10 sm:px-8 shadow-2xl"
          >
            <header className="text-center">
              <div className="bg-gray-100 flex items-center justify-center rounded-3xl">
                <Logo />
              </div>
              <h1 className="mt-4 text-xl font-light tracking-tight text-neutral-950">
                Sign in to{" "}
                <span className="font-bold text-gray-500">Oikia</span>
              </h1>
            </header>
            <Clerk.GlobalError className="block text-sm text-red-600" />
            <Clerk.Field name="identifier">
              <Clerk.Label className="sr-only">Email</Clerk.Label>
              <Clerk.Input
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-xl border-b border-neutral-200 bg-white ps-3 md:ps-4 lg:ps-6 py-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
              />
              <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="relative w-full rounded-md bg-neutral-600 bg-gradient-to-b from-neutral-500 to-neutral-600 py-1.5 text-sm font-medium text-white shadow-[0_1px_1px_0_theme(colors.white/10%)_inset,0_1px_2.5px_0_theme(colors.black/36%)] outline-none ring-1 ring-inset ring-neutral-600 before:absolute before:inset-0 before:rounded-md before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:bg-neutral-600 active:text-white/60 active:before:opacity-0"
            >
              Sign In
            </SignIn.Action>
            <div className="rounded-xl bg-secondary-300 p-5">
              <p className="mb-4 text-center text-sm/5 text-zinc-800">
                Alternatively, sign in with these platforms
              </p>
              <div className="space-y-2">
                <Clerk.Connection
                  name="google"
                  className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 text-sm font-medium text-neutral-950 shadow outline-none ring-1 ring-black/5 hover:to-neutral-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60"
                >
                  <Clerk.Icon />
                  Login with Google
                </Clerk.Connection>
                <Clerk.Connection
                  name="github"
                  className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 text-sm font-medium text-neutral-950 shadow outline-none ring-1 ring-black/5 hover:to-neutral-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60"
                >
                  <Clerk.Icon />
                  Sign Up with Github
                </Clerk.Connection>
              </div>
            </div>
            <p className="text-center text-sm text-zinc-800">
              Don&apos;t have an account?{" "}
              <Link
                href="sign-up"
                className="rounded px-1 py-0.5 text-black underline outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100"
              >
                Sign up
              </Link>
            </p>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
}
