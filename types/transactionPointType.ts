import { Database } from "./supabaseType";

// export type TransactionPointType = Database['public']['Tables']['transaction_points']['Row'];

export type TransactionPointType = {
  address: string;
  aggregation_id: string | null;
  code: string | null;
  created_at: string;
  email: string | null;
  id: string;
  list_incoming_package: string[] | null;
  list_outgoing_package: string[] | null;
  name: string | null;
  phone: string | null;
  updated_at: string | null;
}