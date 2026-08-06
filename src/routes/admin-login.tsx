import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy path — the admin sign-in page now lives at /admin/login. */
export const Route = createFileRoute("/admin-login")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/login" });
  },
});
