import { Database } from "./supabaseType";

// export type UserType = Database['public']['Tables']['users']['Row'];

export type UserType = {
  address: string | null;
  birthday: string | null;
  created_at: string;
  details: string | null;
  id: string;
  More_info: string | null;
  role: string | null;
  updated_at: string | null;
}