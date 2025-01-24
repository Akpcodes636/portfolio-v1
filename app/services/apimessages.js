import supabase from "./supabase";

export async function getMessages() {
  const { data, error } = await supabase.from("messages").select("*");
  console.log(data);
  if (error) {
    console.error("messages couldnt be loaded");
    throw new Error("messages couldnt be loaded");
  }

  return data;
}
