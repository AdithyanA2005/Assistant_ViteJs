import * as React from "react";
import { Models } from "appwrite";
import { LucideIcon, LucideProps } from "lucide-react";
import { ETheme } from "@/lib/enums";

export interface INavItem {
  url: string;
  title: string;
  Icon: React.FC<LucideProps>;
  posBottom?: boolean;
  authRequired: boolean;
}

export type IChatOwners = "user" | "bot";

export type IChatStatus = "success" | "failure";

export interface IChat {
  text: string;
  owner: IChatOwners;
  status: IChatStatus;
}

export interface ICommand {
  title: string;
  Icon: LucideIcon;
  action: () => void;
  hidden?: boolean;
}

// APPWRITE
export interface IUserPreferences {
  theme?: ETheme;
  photoFileId?: string;
}

export type IUser = Models.User<IUserPreferences>;
