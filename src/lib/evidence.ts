import { supabase } from "@/integrations/supabase/client";

export const EVIDENCE_BUCKET = "claim-evidence";
export const EVIDENCE_ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";
export const EVIDENCE_MAX_FILES = 5;
export const EVIDENCE_MAX_BYTES = 10 * 1024 * 1024;

type RequestUploads = (args: {
  data: {
    reference: string;
    email: string;
    files: { name: string; type: string; size: number }[];
  };
}) => Promise<{ uploads: { path: string; token: string; name: string }[] }>;

type RecordUploads = (args: {
  data: { reference: string; email: string; files: { path: string; name: string }[] };
}) => Promise<{ saved: number }>;

/** Returns an error message, or null when the selection is fine. */
export function validateEvidence(files: File[]): string | null {
  if (files.length > EVIDENCE_MAX_FILES) {
    return `Please attach no more than ${EVIDENCE_MAX_FILES} files.`;
  }
  const allowed = EVIDENCE_ACCEPT.split(",");
  for (const f of files) {
    if (!allowed.includes(f.type)) {
      return `"${f.name}" isn't a supported file. Use JPG, PNG, WebP or PDF.`;
    }
    if (f.size > EVIDENCE_MAX_BYTES) {
      return `"${f.name}" is larger than 10 MB.`;
    }
  }
  return null;
}

/** Collects the files chosen in a form (empty file inputs are ignored). */
export function filesFromForm(form: FormData, field = "evidence"): File[] {
  return form.getAll(field).filter((v): v is File => v instanceof File && v.size > 0);
}

/**
 * Uploads evidence for an already-saved claim. Returns how many files were
 * saved; throws only if nothing could be uploaded.
 */
export async function uploadEvidence(opts: {
  reference: string;
  email: string;
  files: File[];
  requestUploads: RequestUploads;
  recordUploads: RecordUploads;
}): Promise<number> {
  const { reference, email, files } = opts;
  if (files.length === 0) return 0;

  const { uploads } = await opts.requestUploads({
    data: {
      reference,
      email,
      files: files.map((f) => ({ name: f.name, type: f.type, size: f.size })),
    },
  });

  const done: { path: string; name: string }[] = [];
  for (let i = 0; i < uploads.length; i++) {
    const target = uploads[i];
    const file = files[i];
    if (!target || !file) continue;
    const { error } = await supabase.storage
      .from(EVIDENCE_BUCKET)
      .uploadToSignedUrl(target.path, target.token, file, { contentType: file.type });
    if (!error) done.push({ path: target.path, name: target.name });
  }

  if (done.length === 0) throw new Error("Upload failed");
  const res = await opts.recordUploads({ data: { reference, email, files: done } });
  return res.saved;
}
