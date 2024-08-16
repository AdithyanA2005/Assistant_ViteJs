import { SignOutAlertDialog } from "@/components/overlays/sign-out-alert-dialog";

export function OverlaysProvider() {
  return (
    <>
      {/*Auth*/}
      <SignOutAlertDialog />
    </>
  );
}
