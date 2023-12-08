import { Database } from "./supabaseType";

// export type NotificationType = Database['public']['Tables']['notifications']['Row'];

export type NotificationType = {
  created_at: string;
  id: string;
  package_id: string | null;
  type: string | null;
  updated_at: string | null;
  user_id: string | null;
}