"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { ButtonWithSpinner } from "@/components/button-with-spinner";
import { useTheme } from "@/components/providers/theme-provider.tsx";
import { auth } from "@/lib/appwrite/auth";
import { ETheme } from "@/lib/enums";
import { DarkSkeleton } from "./dark-skeleton";
import { LightSkeleton } from "./light-skeleton";
import { ThemeFormItem } from "./theme-form-item";

const themeItemDimensions = {
  height: 148,
  width: 202.66,
  tilt: 30,
};

const formSchema = z.object({
  theme: z.nativeEnum(ETheme, {
    required_error: "Please select a theme.",
  }),
});

export function AppearanceForm() {
  const { theme, setTheme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: (theme as ETheme) || "system",
    },
  });
  const { isValid, isSubmitting } = form.formState;
  const formValuesChanged = form.watch("theme") !== theme;

  const getTailwindTransformRotateValue = (tilt: number): string => {
    return `translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(${tilt}deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`;
  };
  const onSubmit = form.handleSubmit(async ({ theme }) => {
    setTheme(theme);
    toast({
      title: "Appearance Updated",
      description: "Your appearance settings have been updated.",
    });
  });

  useEffect(() => {
    (async function () {
      try {
        const themePref = await auth.getPreference<ETheme>("theme");
        if (themePref) form.setValue("theme", themePref);
        else if (theme) form.setValue("theme", theme as ETheme);
      } catch (error) {
        console.error("AppearanceForm() :: useEffect :: " + (error as { message: string }).message);
      }
    })();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>Select the theme for the dashboard.</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-wrap gap-4 pt-2 sm:gap-8"
              >
                <ThemeFormItem value={ETheme.Light} title="Light" dimensions={themeItemDimensions}>
                  <LightSkeleton />
                </ThemeFormItem>

                <ThemeFormItem value={ETheme.Dark} title="Dark" dimensions={themeItemDimensions}>
                  <DarkSkeleton />
                </ThemeFormItem>

                <ThemeFormItem value={ETheme.System} title="System" dimensions={themeItemDimensions}>
                  <div className="relative size-full overflow-clip rounded-[inherit]">
                    <div className="absolute -inset-full flex rotate-[30deg]">
                      <div className="- relative w-1/2 overflow-clip">
                        <LightSkeleton
                          containerStyles={{
                            width: `${themeItemDimensions.width}px`,
                            transform: getTailwindTransformRotateValue(-themeItemDimensions.tilt),
                          }}
                          containerClasses="translate-x-1/2 right-0 absolute top-1/2 -translate-y-1/2"
                        />
                      </div>
                      <div className="relative w-1/2 overflow-clip">
                        <DarkSkeleton
                          containerStyles={{
                            width: `${themeItemDimensions.width}px`,
                            transform: getTailwindTransformRotateValue(-themeItemDimensions.tilt),
                          }}
                          containerClasses="-translate-x-1/2 left-0 absolute top-1/2 -translate-y-1/2"
                        />
                      </div>
                    </div>
                  </div>
                </ThemeFormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <ButtonWithSpinner
          type="submit"
          isLoading={isSubmitting}
          disabled={!isValid || !formValuesChanged}
          btnText="Update Appearance"
        />
      </form>
    </Form>
  );
}
