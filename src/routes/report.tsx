import { createFileRoute, redirect } from "@tanstack/react-router";

/** The full report form lives on /claim (with the track tab beside it). */
export const Route = createFileRoute("/report")({
  beforeLoad: () => {
    throw redirect({ to: "/claim" });
  },
});
