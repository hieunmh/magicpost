import { Database } from "./supabaseType";

// export type AggregationType = Database['public']['Tables']['aggregation']['Row'];

export type AggregationType = {
  aggregation_point_id: string | null;
  created_at: string;
  id: string | null;
  user_id: string | null;
}