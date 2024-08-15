import { Outlet } from "react-router";

export function AuthWrapper() {
  return (
    <div className="mx-auto mt-10 w-full max-w-[500px] px-4 sm:px-6">
      <Outlet />
    </div>
  );
}
