import { Database } from "./supabaseType";

// export type RoleType = Database['public']['Tables']['roles']['Row'];

export type RoleType = {
  created_at: string;
  id: string;
  name: string | null;
}