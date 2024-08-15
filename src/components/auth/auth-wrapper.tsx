import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/store/use-auth.ts";

export function AuthWrapper() {
  const { authStatus, isAuthLoading } = useAuth();

  if (!isAuthLoading && authStatus) return <Navigate to={"/"} replace={true} />;
  else
    return (
      <div className="mx-auto mt-10 w-full max-w-[500px] px-4 sm:px-6">
        <Outlet />
      </div>
    );
}
