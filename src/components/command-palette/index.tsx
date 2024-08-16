import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LogIn, LogOut, SunMoon, User, UserPlus } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandInput, CommandList, CommandSeparator } from "@/components/ui/command";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "@/components/providers/theme-provider.tsx";
import { ETheme } from "@/lib/enums";
import { ICommand } from "@/lib/types";
import { useSignOutDialog } from "@/store/overlays/use-sign-out-dialog";
import { useAuth } from "@/store/use-auth";
import { CommandGroup } from "./command-group";
import { TriggerButton } from "./trigger-button";

export function CommandPallet() {
  const signOutDialog = useSignOutDialog();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();
  const { authStatus } = useAuth();

  const toggle = () => setOpen((open) => !open);
  const commandAction = (func: () => void) => {
    func();
    setOpen(false);
  };

  const commandGroups: { [key: string]: ICommand[] } = {
    notAuthCommands: [
      {
        title: "Sign In",
        Icon: LogIn,
        action: () => commandAction(() => navigate("/signin")),
      },
      {
        title: "Register",
        Icon: UserPlus,
        action: () => commandAction(() => navigate("/signup")),
      },
    ],
    settingsCommands: [
      {
        title: "Profile",
        Icon: User,
        action: () => commandAction(() => navigate("/settings/profile")),
      },
      {
        title: "Appearance",
        Icon: SunMoon,
        action: () => commandAction(() => navigate("/settings/appearance")),
      },
    ],
    otherAuthCommands: [
      {
        title: "Sign Out",
        Icon: LogOut,
        action: () => commandAction(signOutDialog.open),
      },
    ],
    otherCommands: [
      {
        title: "Toggle Theme",
        Icon: SunMoon,
        action: () =>
          commandAction(() => {
            if (theme === ETheme.Light) setTheme(ETheme.Dark);
            else if (theme == ETheme.Dark) setTheme(ETheme.Light);
            else setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
          }),
      },
    ],
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <TriggerButton onClick={toggle} />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <DialogTitle>Command Pallet</DialogTitle>
          <DialogDescription>Easily do tasks with Command Pallet</DialogDescription>
        </VisuallyHidden>

        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Auth" items={commandGroups.notAuthCommands} hidden={authStatus} />
          <CommandGroup heading="Settings" items={commandGroups.settingsCommands} hidden={!authStatus} />

          <CommandSeparator />

          <CommandGroup
            heading="Others"
            items={[...(authStatus ? commandGroups.otherAuthCommands : []), ...commandGroups.otherCommands]}
          />
        </CommandList>
      </CommandDialog>
    </>
  );
}
