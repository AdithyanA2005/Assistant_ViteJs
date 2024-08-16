import { Home } from "lucide-react";
import { Logo } from "@/components/logo.tsx";
import { NavSidebar } from "@/components/navbar/nav-sidebar.tsx";
import { NavThemeToggle } from "@/components/navbar/nav-theme-toggle.tsx";
import { INavItem } from "@/lib/types.ts";

const navItems: INavItem[] = [
  {
    title: "Home",
    Icon: Home,
    url: "/",
    authRequired: true,
  },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex-1">
        <Logo />
      </div>

      <NavThemeToggle />
      <NavSidebar navItems={navItems} />
    </header>
  );
}
