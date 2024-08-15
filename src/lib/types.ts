import React from "react";
import { LucideProps } from "lucide-react";

export interface INavItem {
  url: string;
  title: string;
  Icon: React.FC<LucideProps>;
  posBottom?: boolean;
  authRequired: boolean;
}
