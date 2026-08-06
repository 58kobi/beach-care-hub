import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/agents")({
  head: () => ({ meta: [{ title: "Agents — OnTheBeachCare Admin" }] }),
  component: AgentsPage;
});

function AgentsPage() {
  return null;
}
