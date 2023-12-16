import { Database } from "./supabaseType";

// export type PackageStatusType = Database['public']['Tables']['packageStatus']['Row'];

export type PackageStatusType = {
  created_at: string;
  current_location: string | null;
  id: string ;
  package_id: string | null;
  status: string | null;
  updated_at: string | null;
}