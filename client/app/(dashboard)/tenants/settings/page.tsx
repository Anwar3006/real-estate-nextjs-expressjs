"use client";
import SettingsForm from "@/components/SettingsForm";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { SettingsFormData } from "@/lib/schemas";
import { useUpdateTenantMutation } from "@/state/api";
import { useAuth } from "@clerk/nextjs";
import React from "react";

const ManagerSettingsPage = () => {
  const {
    data: response,
    isLoading,
    error,
    token,
    isLoaded,
    isUserLoaded,
    isSignedIn,
    userId,
  } = useAuthenticatedUser();

  const [updateTenant] = useUpdateTenantMutation();

  // Show loading while Clerk is initializing
  if (!isLoaded || !isUserLoaded) {
    return <div>Initializing authentication...</div>;
  }

  // Show message if not signed in
  if (!isSignedIn) {
    return <div>Please sign in to access this page.</div>;
  }

  // Show loading while fetching user data
  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  // Show error if there's an authentication error
  if (error) {
    console.error("Authentication error:", error);
    return <div>Error loading user data: {JSON.stringify(error)}</div>;
  }

  // Show message if no response data
  if (!response?.data) {
    return <div>No user data found. Response: {JSON.stringify(response)}</div>;
  }

  const userData = response.data;
  const initialData = {
    name: userData?.name,
    email: userData?.email,
    phoneNumber: userData?.phoneNumber,
  };

  const handleSubmit = async (data: typeof initialData) => {
    try {
      await updateTenant({
        clerkId: userData?.clerkUserId,
        token: token,
        ...data,
      });
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <SettingsForm
        initialData={initialData}
        userType={userData?.role}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ManagerSettingsPage;
