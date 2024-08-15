import { NavLink } from "react-router-dom";
import { INavItem } from "@/lib/types.ts";
import { cn } from "@/lib/utils.ts";

export function NavItem({ url, title, Icon }: INavItem) {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-4 px-2.5",
          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        )
      }
    >
      <Icon className="h-5 w-5" />
      {title}
    </NavLink>
  );
}
