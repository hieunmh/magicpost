import { type Database } from "./supabaseType";

export type UsersType = Database['public']['Tables']['users']['Row']

export type RolesType = Database['public']['Tables']['roles']['Row']