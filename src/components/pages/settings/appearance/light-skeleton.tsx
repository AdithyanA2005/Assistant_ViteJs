import React from "react";
import { cn } from "@/lib/utils";

interface LightSkeletonProps {
  containerClasses?: string;
  containerStyles?: React.CSSProperties;
}

export function LightSkeleton({ containerClasses, containerStyles }: LightSkeletonProps) {
  return (
    <div style={containerStyles} className={cn("space-y-2 rounded-sm bg-slate-50 p-2", containerClasses)}>
      <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
        <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
      </div>
      <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
      </div>
      <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
      </div>
    </div>
  );
}
