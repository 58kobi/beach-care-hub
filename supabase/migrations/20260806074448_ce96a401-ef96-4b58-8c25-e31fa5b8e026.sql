-- 1. Restrict claim submission so internal fields cannot be spoofed
DROP POLICY IF EXISTS "Anyone can submit a claim" ON public.claims;

CREATE POLICY "Anyone can submit a claim"
ON public.claims
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'submitted'::claim_status
  AND assigned_agent_id IS NULL
  AND admin_notes IS NULL
  AND (user_id IS NULL OR user_id = auth.uid())
);

-- 2. Let submitters read their own claims
CREATE POLICY "Users read own claims"
ON public.claims
FOR SELECT
TO authenticated
USING (user_id IS NOT NULL AND user_id = auth.uid());

-- 3. Attachments: owners can read their own, and may only attach to their own claim
CREATE POLICY "Users read own claim attachments"
ON public.claim_attachments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.claims c
    WHERE c.id = claim_attachments.claim_id
      AND c.user_id IS NOT NULL
      AND c.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Anyone can attach to a claim" ON public.claim_attachments;

CREATE POLICY "Users attach to their own claim"
ON public.claim_attachments
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.claims c
    WHERE c.id = claim_attachments.claim_id
      AND c.user_id IS NOT NULL
      AND c.user_id = auth.uid()
  )
);

-- 4. Trigger-only SECURITY DEFINER functions must not be callable from the API.
--    Triggers still run them as the table owner.
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_claim_status_change() FROM PUBLIC, anon, authenticated;

-- has_role stays callable by signed-in users: RLS policies and the admin gate
-- evaluate it as the calling role.
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;