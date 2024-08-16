import { CommandItem as CommandItemPrimitive } from "@/components/ui/command";
import { ICommand } from "@/lib/types";

interface CommandItemProps {
  command: ICommand;
}

export function CommandItem({ command }: CommandItemProps) {
  if (command.hidden) return null;
  return (
    <CommandItemPrimitive onSelect={command.action}>
      <command.Icon className="mr-2 h-4 w-4" />
      <span>{command.title}</span>
    </CommandItemPrimitive>
  );
}
