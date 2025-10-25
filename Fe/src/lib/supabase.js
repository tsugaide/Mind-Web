import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pkitmlnjmdfwwyerwwvg.supabase.co";
const supabaseKey = "sb_publishable_MR7_5cMTpBcAyD0DvYjb3A_CI9ejstI";
export const supabase = createClient(supabaseUrl, supabaseKey);
