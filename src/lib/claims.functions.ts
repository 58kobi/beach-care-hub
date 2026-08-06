import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const submitSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
  issue_type: z.enum([
    "booking",
    "payment_refund",
    "flight_transfer",
    "hotel_resort",
    "cancellation",
    "beach_hazard",
    "other",
  ]),
  location: z.string().trim().min(2).max(200),
  description: z.string().trim().min(10).max(4000),
});

export const submitClaim = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submitSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("claims")
      .insert({
        full_name: data.full_name,
        email: data.email.toLowerCase(),
        phone: data.phone || null,
        issue_type: data.issue_type,
        location: data.location,
        description: data.description,
      })
      .select("reference")
      .single();

    if (error) throw new Error("We couldn't save your report. Please try again.");
    return { reference: row.reference as string };
  });

const trackSchema = z.object({
  reference: z.string().trim().min(4).max(40),
  email: z.string().trim().email().max(200),
});

export const trackClaim = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => trackSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("claims")
      // never expose admin_notes or internal ids to the customer
      .select("reference, full_name, issue_type, location, status, created_at, updated_at")
      .eq("reference", data.reference.toUpperCase())
      .eq("email", data.email.toLowerCase())
      .maybeSingle();

    if (!row) return { found: false as const };
    return { found: true as const, claim: row };
  });
