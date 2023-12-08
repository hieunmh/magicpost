import { Database } from "./supabaseType";

// export type TransactionType = Database['public']['Tables']['transaction']['Row'];

export type TransactionType = {
  created_at: string;
  id: string;
  transaction_point_id: string | null;
  user_id: string | null;
}