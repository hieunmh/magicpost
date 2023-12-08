import { Database } from "./supabaseType";

// export type AggregationPointType = Database['public']['Tables']['aggregation_points']['Row'];

export type AggregationPointType = {
  address: string | null;
  code: string | null;
  created_at: string;
  email: string | null;
  id: string;
  list_incoming_package: string[] | null;
  list_outgoing_package: string[] | null;
  name: string | null;
  notes: string | null;
  phone: string | null;
  status: string | null;
  updated_at: string | null;
}