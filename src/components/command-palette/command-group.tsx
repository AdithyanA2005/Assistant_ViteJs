import { CommandGroup as CommandGroupPrimitive } from "@/components/ui/command";
import { ICommand } from "@/lib/types";
import { CommandItem } from "./command-item";

interface CommandGroupProps {
  hidden?: boolean;
  heading: string;
  items: ICommand[];
}

export function CommandGroup({ hidden, heading, items }: CommandGroupProps) {
  if (hidden) return null;

  return (
    <CommandGroupPrimitive heading={heading}>
      {items
        .filter((item) => !item.hidden)
        .map((command, index) => (
          <CommandItem command={command} key={index} />
        ))}
    </CommandGroupPrimitive>
  );
}
