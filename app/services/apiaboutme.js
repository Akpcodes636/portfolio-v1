import supabase from "./supabase";

export async function getAbout() {
  try {
    let { data, error } = await supabase.from("about_me").select("*");

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
