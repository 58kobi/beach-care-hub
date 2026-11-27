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

/* ------------------------------------------------------------------ *
 * Evidence uploads (photos / receipts / PDFs)
 *
 * Flow: the claim is saved first (submitClaim) and returns a reference.
 * The browser then asks for one-time signed upload URLs (requestEvidenceUploads),
 * uploads straight to the private `claim-evidence` bucket, and finally tells
 * the server which files arrived (recordEvidence). Both calls require the claim
 * reference AND the email it was filed with.
 * ------------------------------------------------------------------ */

const EVIDENCE_BUCKET = "claim-evidence";
const EVIDENCE_MAX_FILES = 5;
const EVIDENCE_MAX_PER_CLAIM = 10;
const EVIDENCE_MAX_BYTES = 10 * 1024 * 1024;
const EVIDENCE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

const claimKeySchema = z.object({
  reference: z.string().trim().min(4).max(40),
  email: z.string().trim().email().max(200),
});

const uploadRequestSchema = claimKeySchema.extend({
  files: z
    .array(
      z.object({
        name: z.string().trim().min(1).max(200),
        type: z.string().refine((t) => EVIDENCE_TYPES.includes(t), "Unsupported file type"),
        size: z.number().int().positive().max(EVIDENCE_MAX_BYTES),
      }),
    )
    .min(1)
    .max(EVIDENCE_MAX_FILES),
});

export const requestEvidenceUploads = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => uploadRequestSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: claim } = await supabaseAdmin
      .from("claims")
      .select("id")
      .eq("reference", data.reference.toUpperCase())
      .eq("email", data.email.toLowerCase())
      .maybeSingle();
    if (!claim) throw new Error("Claim not found.");

    const { count } = await supabaseAdmin
      .from("claim_attachments")
      .select("id", { count: "exact", head: true })
      .eq("claim_id", claim.id);
    if ((count ?? 0) + data.files.length > EVIDENCE_MAX_PER_CLAIM) {
      throw new Error("This claim already has the maximum number of files.");
    }

    const uploads: { path: string; token: string; name: string }[] = [];
    for (const file of data.files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
      const path = `${claim.id}/${crypto.randomUUID()}-${safeName}`;
      const { data: signed, error } = await supabaseAdmin.storage
        .from(EVIDENCE_BUCKET)
        .createSignedUploadUrl(path);
      if (error || !signed) throw new Error("We couldn't prepare your upload.");
      uploads.push({ path: signed.path, token: signed.token, name: file.name });
    }
    return { uploads };
  });

const recordSchema = claimKeySchema.extend({
  files: z
    .array(z.object({ path: z.string().min(10).max(400), name: z.string().trim().min(1).max(200) }))
    .min(1)
    .max(EVIDENCE_MAX_FILES),
});

export const recordEvidence = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => recordSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: claim } = await supabaseAdmin
      .from("claims")
      .select("id")
      .eq("reference", data.reference.toUpperCase())
      .eq("email", data.email.toLowerCase())
      .maybeSingle();
    if (!claim) throw new Error("Claim not found.");

    // Only record files that really arrived in this claim's own folder.
    const { data: listed } = await supabaseAdmin.storage
      .from(EVIDENCE_BUCKET)
      .list(claim.id, { limit: 100 });
    const present = new Set((listed ?? []).map((f) => `${claim.id}/${f.name}`));

    const rows = data.files
      .filter((f) => f.path.startsWith(`${claim.id}/`) && present.has(f.path))
      .map((f) => ({ claim_id: claim.id, file_path: f.path, file_name: f.name }));

    if (rows.length > 0) {
      const { error } = await supabaseAdmin.from("claim_attachments").insert(rows);
      if (error) throw new Error("We couldn't save your files.");
    }
    return { saved: rows.length };
  });
