"use client";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { userId, sessionClaims, sessionId } = useAuth();

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100 text-6xl text-zinc-900">
        Welcome
      </div>
    </>
  );
}
