"use client";

import Logo from "@/components/Logo";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen relative w-full">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/bg-sign-up.jpg')]" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex w-full min-h-screen items-center px-4 py-8 sm:justify-center lg:px-8">
        <SignUp.Root>
          {/* Sign In */}
          <SignUp.Step
            name="start"
            className="w-full max-w-2xl mx-auto space-y-6 rounded-2xl bg-secondary-100 backdrop-blur-sm px-6 py-10 sm:px-8 shadow-2xl"
          >
            <header className="text-center">
              <div className="bg-gray-100 flex items-center justify-center rounded-3xl">
                <Logo />
              </div>
              <h1 className="mt-4 text-xl font-light tracking-tight text-neutral-950">
                Create an account{" "}
              </h1>
            </header>
            <Clerk.GlobalError className="block text-sm text-red-600" />
            <div className="space-y-4">
              <Clerk.Field name="emailAddress" className="space-y-2">
                <Clerk.Label className="sr-only">Email</Clerk.Label>
                <Clerk.Input
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full rounded-xl border-b border-neutral-200 bg-white ps-3 md:ps-4 lg:ps-6 py-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
                />
                <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
              </Clerk.Field>
              <Clerk.Field name="password" className="space-y-2">
                <Clerk.Label className="sr-only">Password</Clerk.Label>
                <Clerk.Input
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full rounded-xl border-b border-neutral-200 bg-white ps-3 md:ps-4 lg:ps-6 py-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
                />
                <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
              </Clerk.Field>
            </div>
            <SignUp.Action
              submit
              className="relative w-full rounded-md bg-neutral-600 bg-gradient-to-b from-neutral-500 to-neutral-600 py-1.5 text-sm font-medium text-white shadow-[0_1px_1px_0_theme(colors.white/10%)_inset,0_1px_2.5px_0_theme(colors.black/36%)] outline-none ring-1 ring-inset ring-neutral-600 before:absolute before:inset-0 before:rounded-md before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:bg-neutral-600 active:text-white/60 active:before:opacity-0"
            >
              Sign Up
            </SignUp.Action>

            <div className="rounded-xl bg-secondary-300 p-5">
              <p className="mb-4 text-center text-sm/5 text-zinc-800">
                Alternatively, sign up with these platforms
              </p>
              <div className="space-y-2">
                <Clerk.Connection
                  name="google"
                  className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 text-sm font-medium text-neutral-950 shadow outline-none ring-1 ring-black/5 hover:to-neutral-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60"
                >
                  <Clerk.Icon />
                  Sign Up with Google
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
              Already have an account?{" "}
              <Link
                href="sign-in"
                className="rounded px-1 py-0.5 text-black underline outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100"
              >
                Sign In
              </Link>
            </p>
          </SignUp.Step>

          {/* Email Verification */}
          <SignUp.Step
            name="verifications"
            className="w-full space-y-6 rounded-2xl bg-secondary-100 bg-[radial-gradient(circle_at_50%_0%,theme(colors.white/10%),transparent)] px-4 py-10 ring-1 ring-inset ring-white/5 sm:w-96 sm:px-8"
          >
            <header className="text-center">
              <div className="bg-gray-100 flex items-center justify-center rounded-3xl">
                <Logo />
              </div>
              <h1 className="mt-4 text-xl font-medium tracking-tight text-black">
                Verify email code
              </h1>
            </header>
            <Clerk.GlobalError className="block text-sm text-red-400" />
            <SignUp.Strategy name="email_code">
              <Clerk.Field name="code" className="space-y-2">
                <Clerk.Label className="text-sm font-medium text-black">
                  Email code
                </Clerk.Label>
                <Clerk.Input
                  required
                  className="w-full rounded-xl border-b border-neutral-200 bg-white ps-3 md:ps-4 lg:ps-6 py-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
                />
                <Clerk.FieldError className="block text-sm text-red-400" />
              </Clerk.Field>
              <SignUp.Action
                submit
                className="relative isolate w-full rounded-md bg-blue-500 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-white/5 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70 active:before:bg-black/10"
              >
                Finish registration
              </SignUp.Action>
            </SignUp.Strategy>
            <p className="text-center text-sm text-zinc-800">
              Have an account?{" "}
              <Clerk.Link
                navigate="sign-in"
                className="font-medium text-black underline decoration-white/20 underline-offset-4 outline-none hover:underline focus-visible:underline"
              >
                Sign in
              </Clerk.Link>
            </p>
          </SignUp.Step>
        </SignUp.Root>
      </div>
    </div>
  );
}
