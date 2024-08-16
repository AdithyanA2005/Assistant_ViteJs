import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/appwrite/auth";
import { avatars } from "@/lib/appwrite/avatars";
import { storage } from "@/lib/appwrite/storage";
import { useSignOutDialog } from "@/store/overlays/use-sign-out-dialog";

export function NavDropdownMenu() {
  const [avatar, setAvatar] = useState<string>("");
  const signOutDialog = useSignOutDialog();

  useEffect(() => {
    (async function () {
      try {
        // Set the user's avatar if it exists
        const photoId = await auth.getPreference<string>("photoFileId");
        if (photoId) return setAvatar(storage.getProfilePhotoUrl({ photoId }));

        // If the user doesn't have an avatar, set their initials
        const user = await auth.getCurrentUser();
        if (user) setAvatar(String(avatars.avatars.getInitials(user?.name)));
      } catch (error) {
        console.error("NavDropdownMenu :: useEffect() :: ", error);
      }
    })();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
          {avatar ? (
            <img src={avatar} alt="User avatar" width={40} height={40} className="rounded-full" />
          ) : (
            <User2 className="size-5" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <NavLink to="/settings">Settings</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button onClick={signOutDialog.open} className="w-full">
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

NavDropdownMenu.Skeleton = function NavDropdownMenuSkeleton() {
  return <div className="h-10 w-10 animate-pulse rounded-full bg-accent" />;
};
