import { createClient } from "./supabase"

export async function createUserProfile(
  userId: string,
  userData: {
    full_name: string
    color_blind_type: string
  },
) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        id: userId,
        full_name: userData.full_name,
        color_blind_type: userData.color_blind_type,
      },
    ])
    .select()

  if (error) {
    console.error("Error creating user profile:", error)
    throw error
  }

  return data
}

export async function getUserProfile(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    throw error
  }

  return data
}
