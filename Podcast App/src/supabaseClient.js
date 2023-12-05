import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  'https://qhmmltxflxtoufwkkiet.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobW1sdHhmbHh0b3Vmd2traWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3ODA4NjQsImV4cCI6MjAxNzM1Njg2NH0.UPOPTmaQUddYYjyDk3vNJH6TMdZaRWTQQUDLLT65HDk', // Supabase API key
);
