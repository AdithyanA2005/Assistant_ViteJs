import { Home, LogInIcon, PaletteIcon, UserIcon, UserRoundPlusIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { INavItem } from "@/lib/types";
import { useAuth } from "@/store/use-auth";
import { NavDropdownMenu } from "./nav-dropdown-menu";
import { NavSidebar } from "./nav-sidebar";
import { NavThemeToggle } from "./nav-theme-toggle";

const navItems: INavItem[] = [
  {
    title: "SignIn",
    Icon: LogInIcon,
    url: "/signin",
    authRequired: false,
  },
  {
    title: "Register",
    Icon: UserRoundPlusIcon,
    url: "/signup",
    authRequired: false,
  },
  {
    title: "Home",
    Icon: Home,
    url: "/",
    authRequired: true,
  },
  {
    title: "Profile",
    Icon: UserIcon,
    url: "/settings/profile",
    authRequired: true,
  },
  {
    title: "Appearances",
    Icon: PaletteIcon,
    url: "/settings/appearances",
    authRequired: true,
  },
];

export function Navbar() {
  const { isAuthLoading, authStatus } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex-1">
        <Logo />
      </div>

      <NavThemeToggle />
      <NavSidebar navItems={navItems} />
      {isAuthLoading ? <NavDropdownMenu.Skeleton /> : authStatus ? <NavDropdownMenu /> : null}
    </header>
  );
}
