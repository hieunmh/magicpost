import { Database } from "./supabaseType";

// export type PackageDetailType = Database['public']['Tables']['packageDetails']['Row'];

export type PackageDetailType = {
  created_at: string;
  id: string;
  mainCharge: number | null;
  notes: string | null;
  package_id: string | null;
  package_info: string | null;
  receiver_address: string;
  receiver_name: string | null;
  receiver_phone_no: string | null;
  sender_name: string | null;
  sender_phone_no: string | null;
  totalCharge: number | null;
  updated_at: string | null;
}