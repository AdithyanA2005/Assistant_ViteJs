"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, XIcon } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { ButtonWithSpinner } from "@/components/button-with-spinner";
import { auth } from "@/lib/appwrite/auth";
import { avatars } from "@/lib/appwrite/avatars";
import { storage } from "@/lib/appwrite/storage";
import { SUPPORTED_IMAGE_FORMATS } from "@/lib/constants";
import { IUser } from "@/lib/types";
import { PasswordConfirmCard } from "./password-confirm-card";

const formSchema = z.object({
  photo: z.any().optional(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must not be longer than 30 characters."),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone: z
    .string()
    .optional() // Makes the field optional
    .transform((val) => val?.trim()) // Trim whitespace if a value is provided
    .refine((val) => (val?.length && val.length > 10) || val?.length === 0, "Phone number must be 10 characters long.")
    .refine(
      (val) => (val?.length && val.length <= 15) || val?.length === 0,
      "Phone number must not be longer than 15 characters.",
    ),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface InputResetButtonProps {
  reset: () => void;
}

function InputResetButton({ reset }: InputResetButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="sm" type="button" variant="ghost" onClick={reset} className="absolute right-2 h-6 w-6 p-0">
            <XIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete change</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    mode: "onChange",
  });
  const fileRef = form.register("photo");
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | null>(null);
  const [avatar, setAvatar] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState("");

  const name = form.watch("name");
  const email = form.watch("email");
  const phone = form.watch("phone");
  const photo = form.watch("photo");
  const { isValid, isSubmitting } = form.formState;

  const isPasswordNeeded = user?.email !== email || user?.phone !== phone;
  const formValuesChanged = user?.name !== name || user?.email !== email || user?.phone !== phone || photo[0];

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value == "") setPasswordError("Password is required");
    else setPasswordError("");
    setPassword(value);
  };

  const onSubmit = form.handleSubmit(async ({ name, email, phone, photo }) => {
    try {
      if (user?.name !== name && name) setUser(await auth.updateName({ name }));
      if (user?.email !== email && email) setUser(await auth.updateEmail({ email, password }));
      if (user?.phone !== phone && phone) setUser(await auth.updatePhone({ phone, password }));
      if (photo[0]) {
        const file = photo[0];
        const oldPhotoId = await auth.getPreference<string>("photoFileId");
        const newPhotoId = await storage.createProfilePhoto({ file });

        setUser(await auth.updatePreference<string>("photoFileId", newPhotoId));
        setAvatar(storage.getProfilePhotoUrl({ photoId: newPhotoId }));

        if (oldPhotoId) await storage.deleteProfilePhoto({ photoId: oldPhotoId });
      }

      toast({
        title: "Profile updated",
        description: `Your profile has been updated successfully. ${photo[0] ? "Refresh to see changes in action" : ""}`,
        action: photo[0] && (
          <ToastAction altText="Refresh Now" onClick={() => window.location.reload()}>
            Refresh Now
          </ToastAction>
        ),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Uh oh! Something went wrong.`,
        description: (error as { message: string }).message,
      });
    }
  });

  useEffect(() => {
    (async () => {
      try {
        const user = await auth.getCurrentUser();

        // If user is not found, redirect to home page
        if (!user) {
          toast({
            variant: "destructive",
            title: `Uh oh! Something went wrong.`,
            description: "Unable to fetch current user",
          });
          navigate("/");
          return;
        }

        form.setValue("name", user?.name || "");
        form.setValue("email", user?.email || "");
        form.setValue("phone", user?.phone || "");

        const photoId = user?.prefs?.photoFileId;
        const url = photoId ? storage.getProfilePhotoUrl({ photoId }) : null;
        setAvatar(url || String(avatars.avatars.getInitials(user?.name)) || "");
        setUser(user);
      } catch {
        toast({
          variant: "destructive",
          title: `Uh oh! Something went wrong.`,
          description: "Unable to fetch current user",
        });
        navigate("/");
      }
    })();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="photo"
          render={() => (
            <FormItem className="items-center gap-4">
              <FormLabel>Profile Photo</FormLabel>
              <FormControl className="text-base-semibold text-gray-200">
                <>
                  <div className="flex flex-col items-center gap-5 pt-1 sm:flex-row">
                    <div className="aspect-square size-32 shrink-0 overflow-hidden rounded-full outline outline-accent">
                      {avatar ? (
                        <img src={avatar} alt={avatar} width={100} height={100} className="size-full object-contain" />
                      ) : (
                        <User className="size-full p-4 md:p-6" />
                      )}
                    </div>

                    <div>
                      <Input
                        type="file"
                        accept={SUPPORTED_IMAGE_FORMATS.join()}
                        className=""
                        placeholder="Add profile photo"
                        {...fileRef}
                      />
                    </div>
                  </div>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input className="pr-8" {...field} />
                  {name !== user?.name ? (
                    <InputResetButton reset={() => form.setValue("name", user?.name || "")} />
                  ) : null}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input className="pr-8" type="email" placeholder="Your Email" {...field} />
                  {email !== user?.email ? (
                    <InputResetButton reset={() => form.setValue("email", user?.email || "")} />
                  ) : null}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone No</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input className="pr-8" type="tel" placeholder="Your Phone No" {...field} />
                  {phone !== user?.phone ? (
                    <InputResetButton reset={() => form.setValue("phone", user?.phone || "")} />
                  ) : null}
                </div>
              </FormControl>
              <FormDescription>Please enter your phone number starting with your country code.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isPasswordNeeded && !isSubmitting && formValuesChanged && isValid ? (
          <PasswordConfirmCard
            title="Password"
            description="You have updated fields that require you to enter your value"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
          />
        ) : null}

        {/*Submit Button*/}
        <ButtonWithSpinner
          type="submit"
          disabled={!formValuesChanged || !isValid || (isPasswordNeeded ? !password || !!passwordError : false)}
          isLoading={isSubmitting}
          className="mt-2"
          btnText="Update Profile"
        />
      </form>
    </Form>
  );
}
