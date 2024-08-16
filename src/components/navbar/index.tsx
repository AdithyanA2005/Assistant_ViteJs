import { Home, LogInIcon, UserRoundPlusIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { INavItem } from "@/lib/types.ts";
import { useAuth } from "@/store/use-auth.ts";
import { NavDropdownMenu } from "./nav-dropdown-menu.tsx";
import { NavSidebar } from "./nav-sidebar.tsx";
import { NavThemeToggle } from "./nav-theme-toggle.tsx";

const navItems: INavItem[] = [
  {
    title: "Home",
    Icon: Home,
    url: "/",
    authRequired: true,
  },
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
