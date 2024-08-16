import { Separator } from "@/components/ui/separator.tsx";
import { AppearanceForm } from "@/components/settings/appearance/appearance-form.tsx";

export function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">Customize your appearance settings.</p>
      </div>
      <Separator />

      <AppearanceForm />
    </div>
  );
}
