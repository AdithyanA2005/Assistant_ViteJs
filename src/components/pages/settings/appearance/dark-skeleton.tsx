import React from "react";
import { cn } from "@/lib/utils";

interface DarkSkeletonProps {
  containerClasses?: string;
  containerStyles?: React.CSSProperties;
}

export function DarkSkeleton({ containerClasses, containerStyles }: DarkSkeletonProps) {
  return (
    <div style={containerStyles} className={cn("space-y-2 rounded-sm bg-slate-950 p-2", containerClasses)}>
      <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
        <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
      </div>
      <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
        <div className="h-4 w-4 rounded-full bg-slate-400" />
        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
      </div>
      <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
        <div className="h-4 w-4 rounded-full bg-slate-400" />
        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
      </div>
    </div>
  );
}
