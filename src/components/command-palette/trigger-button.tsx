import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EModifierKey } from "@/lib/enums";

interface TriggerButtonProps {
  onClick: () => void;
}

export function TriggerButton({ onClick }: TriggerButtonProps) {
  return (
    <Button onClick={onClick} variant="outline" className="1text-muted-foreground ml-auto gap-2 px-2">
      <div className="flex items-center">
        <Terminal className="h-4" />
        <span>Command</span>
      </div>

      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-sm">{EModifierKey.Mac}</span>K
      </kbd>
    </Button>
  );
}
