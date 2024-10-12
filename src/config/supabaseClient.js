
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_PLAYDATEFUN_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
