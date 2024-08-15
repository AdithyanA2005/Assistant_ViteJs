import { useState } from "react";
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { INavItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { NavItem } from "./nav-item.tsx";
import { NavLogo } from "./nav-logo";

interface MobileNavProps {
  navItems: INavItem[];
  className?: string;
}

export function NavSidebar({ navItems, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="sm:max-w-xs">
          <div className="sr-only">
            <DialogTitle>Sidebar</DialogTitle>
            <DialogDescription>Go to different parts of the website</DialogDescription>
          </div>

          <nav className="flex h-full flex-col gap-6 text-lg font-medium">
            <NavLogo />

            {navItems.map((navItem, index) => (
              <div key={index} onClick={() => setOpen(false)} className={cn(navItem.posBottom ? "mt-auto" : "")}>
                <NavItem {...navItem} />
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
