import { SettingsFormData, settingsSchema } from "@/lib/schemas";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { CustomFormField } from "./FormField";
import { Button } from "./ui/button";

const SettingsForm = ({
  initialData,
  onSubmit,
  userType,
}: SettingsFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      form.reset(initialData);
    }
  };

  const handleSubmit = async (data: SettingsFormData) => {
    await onSubmit(data);
    setEditMode(false);
  };
  return (
    <div className="pt-8 pb-5 px-8">
      <div className="mb-5">
        <h1 className="text-xl font-semibold">
          {`${userType.charAt(0).toUpperCase() + userType.slice(1)} Settings`}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account preferences and personal information
        </p>
      </div>

      <Card>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <CustomFormField name="name" label="Name" disabled={!editMode} />
              <CustomFormField
                name="email"
                label="Email"
                type="email"
                disabled={!editMode}
              />
              <CustomFormField
                name="phoneNumber"
                label="Phone Number"
                disabled={!editMode}
              />

              <div className="pt-4 flex justify-between">
                <Button
                  type="button"
                  onClick={toggleEditMode}
                  className={`${
                    editMode
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-secondary-700 hover:bg-secondary-600"
                  } text-white `}
                >
                  {editMode ? "Cancel" : "Edit"}
                </Button>

                {editMode && (
                  <Button
                    type="submit"
                    className="bg-primary-700 text-white hover:bg-primary-800"
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsForm;
