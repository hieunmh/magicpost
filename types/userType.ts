import { Database } from "./supabaseType";

// export type UserType = Database['public']['Tables']['users']['Row'];

export type UserType = {
  address: string | null
  birthday: string | null
  details: string | null
  email: string | null
  id: string
  More_info: string | null
  phone: string | null
  role: string | null
}