
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.JS_APP_PLAYDATEFUN_URL
const supabaseKey = process.env.JS_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase