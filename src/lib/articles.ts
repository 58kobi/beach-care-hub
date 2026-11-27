// Help articles now live in the Supabase `articles` table and are edited from
// the admin console (/admin/articles). This file only keeps the shared type.
export type Article = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
};
