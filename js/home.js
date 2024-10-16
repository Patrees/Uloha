import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://fofnbmqesopnfgwrniqb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZm5ibXFlc29wbmZnd3JuaXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NTYwNDMsImV4cCI6MjA0NDIzMjA0M30.vunzKEgi_zHtBwHh2IGpIxYbBmsKZJnarfqaY3VWBKQ";
const supabase = createClient(supabaseUrl, supabaseKey);

// Nacitanie dat z databazy //

export async function fetchCardsDatabase() {
  const { data, error } = await supabase
  .from("cards")
  .select("*");
  if (error) {
    console.log("Error", error);
    return [];
  }

  return data;
}

// Vlozenie dat do databazy  z formulara //
export async function insertCardsDatabase(heading, paragraph) {
  const { data, error } = await supabase
    .from("cards")
    .insert([{ heading: heading, paragraph: paragraph }])
    .select("id");
  if (error) {
    console.log("Error", error);
    return [];
  }

  return data[0].id;
}

// Vymazanie dat z databazy  //
export async function deleteCardsDatabase(cardID) {
  const { data, error } = await supabase
    .from("cards")
    .delete()
    .match({ id: cardID });
  if (error) {
    console.log("Error", error);
    return false;
  }

  return true;
}


// Uprava dat z databazy  //

export async function updateCardsDatabase(cardID, updateField) {
  const { data, error } = await supabase
    .from("cards")
    .update(updateField)
    .match({ id: cardID });

  if (error) {
    console.log("Error", error);
    return false;
  }

  return true;
}