import { createClient } from "@supabase/supabase-js";

// Values come from .env.local (never commit that file):
//   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
//   VITE_SUPABASE_KEY=<publishable key from Project Settings -> API Keys>
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_KEY in .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
