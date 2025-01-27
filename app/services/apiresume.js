import supabase from "./supabase";

export async function getResume() {
  try {
    let { data, error } = await supabase.from("resume").select("*");
    console.log(data);

    if (error) {
      console.error("messages couldn't be loaded");
      throw new Error("messages couldn't be loaded");
    }

    return data;
  } catch (error) {
    console.error("An error occurred while fetching chats:", error);
    throw error;
  }
}
