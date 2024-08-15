import { Outlet } from "react-router";
import { LoadingScreen } from "@/components/loading/loading-screen.tsx";
import { useAuth } from "@/store/use-auth.ts";

export function LoadingWrapper() {
  const { isAuthLoading } = useAuth();
  if (isAuthLoading) return <LoadingScreen />;
  else return <Outlet />;
}
