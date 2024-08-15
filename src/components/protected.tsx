import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/store/use-auth.ts";

export function Protected() {
  const { authStatus, isAuthLoading } = useAuth();
  if (isAuthLoading) return;

  if (authStatus) return <Outlet />;
  else return <Navigate to="/signin" replace={true} />;
}
