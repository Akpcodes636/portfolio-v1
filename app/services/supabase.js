import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://lhcxfsotpjglncxikfej.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoY3hmc290cGpnbG5jeGlrZmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NTk2MTgsImV4cCI6MjA1MzEzNTYxOH0.I1RPzdNVGUA-HMfJmdxMFB66lwXLDQuPjy6-zBGVGDI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
