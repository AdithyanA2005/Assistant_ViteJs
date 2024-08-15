import { NavThemeToggle } from "@/components/navbar/nav-theme-toggle.tsx";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:px-6">
      <div className="flex-1"></div>
      <NavThemeToggle />
    </header>
  );
}
