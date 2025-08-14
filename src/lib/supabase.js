import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pkitmlnjmdfwwyerwwvg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraXRtbG5qbWRmd3d5ZXJ3d3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMzMwMjYsImV4cCI6MjA2NjkwOTAyNn0.ruae0uHz_VWEB1Guz6PsuL70qqrU76fRyTwObfE6zCQ";
export const supabase = createClient(supabaseUrl, supabaseKey);
