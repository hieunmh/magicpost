import { Database } from "./supabaseType";

// export type PackageType = Database['public']['Tables']['packages']['Row'];

export type PackageType = {
  created_at: string;
  id: string;
  receiver_id: string | null;
  sender_id: string | null;
  updated_at: string | null;
  sender_transaction_address: string | null;
}