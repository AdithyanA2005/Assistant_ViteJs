import React from "react";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { ETheme } from "@/lib/enums";

interface ThemeFormItemProps {
  children: React.ReactNode;
  value: ETheme;
  title: string;
  dimensions: {
    height: number;
    width: number;
  };
}

export function ThemeFormItem({ children, value, title, dimensions }: ThemeFormItemProps) {
  return (
    <FormItem>
      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
        <FormControl>
          <RadioGroupItem value={value} className="sr-only" />
        </FormControl>
        <div
          style={{
            height: `${dimensions.height}px`,
            width: `${dimensions.width}px`,
          }}
          className="mx-auto rounded-md border-2 border-muted bg-popover p-1 hover:border-accent hover:bg-accent hover:text-accent-foreground"
        >
          {children}
        </div>
        <span className="block w-full p-2 text-center font-normal">{title}</span>
      </FormLabel>
    </FormItem>
  );
}
