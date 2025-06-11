"use client";
import { useGetAuthUserQuery } from "@/state/api";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

export function useAuthenticatedUser() {
  const { getToken, userId, isSignedIn, isLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      if (isLoaded && isUserLoaded && userId && isSignedIn) {
        try {
          setIsTokenLoading(true);
          const clerkToken = await getToken();
          setToken(clerkToken);
        } catch (error) {
          console.error("Error fetching token:", error);
        } finally {
          setIsTokenLoading(false);
        }
      } else if (isLoaded && isUserLoaded) {
        // Clerk has loaded but user is not signed in
        setIsTokenLoading(false);
      }
    };

    fetchToken();
  }, [userId, isSignedIn, getToken, isLoaded, isUserLoaded]);

  const role = user?.publicMetadata?.role as string;

  // Use skipToken when any required data is missing
  const shouldSkip =
    !userId || !role || !token || !isSignedIn || isTokenLoading;

  const userData = {
    id: user?.id!,
    email: user?.emailAddresses[0].emailAddress!,
    fullName: user?.fullName!,
    phoneNumber: user?.primaryPhoneNumber?.phoneNumber!,
    image_url: user?.imageUrl!,
  };

  const queryResult = useGetAuthUserQuery(
    shouldSkip
      ? skipToken
      : {
          user: userData!,
          role: role!,
          token: token!,
        }
  );

  return {
    ...queryResult,
    token,
    userId,
    isLoaded,
    isUserLoaded,
    role,
    isSignedIn,
    isTokenLoading,
  };
}
