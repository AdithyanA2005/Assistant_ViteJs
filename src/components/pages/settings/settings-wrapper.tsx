import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils.ts";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
];

export function SettingsWrapper() {
  return (
    <div className="space-y-6 px-10 pb-16 pt-3 sm:pt-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {/*Sidebar*/}
        <aside className="-mx-4 shrink-0 lg:w-1/5">
          <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1")}>
            {sidebarNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({ variant: "ghost" }),
                    isActive ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
                    "justify-start",
                  )
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/*Main Content*/}
        <main className="flex-1 lg:max-w-2xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
