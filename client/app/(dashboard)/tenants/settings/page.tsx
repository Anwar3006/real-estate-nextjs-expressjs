"use client";
import SettingsForm from "@/components/SettingsForm";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { SettingsFormData } from "@/lib/schemas";
import { useUpdateTenantMutation } from "@/state/api";
import { useAuth } from "@clerk/nextjs";
import React from "react";

const ManagerSettingsPage = () => {
  const { data: response, isLoading } = useAuthenticatedUser();

  if (isLoading) return <>Loading...</>;

  const userData = response?.data;
  const initialData = {
    name: userData?.name,
    email: userData?.email,
    phoneNumber: userData?.phoneNumber,
  };

  const [updateTenant] = useUpdateTenantMutation();

  const handleSubmit = async (data: typeof initialData) => {
    await updateTenant({
      clerkId: userData?.clerkUserId,
      token: sessionToken,
      ...data,
    });
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
