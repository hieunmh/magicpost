import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const allAgg = await client.from('aggregation_points').select('*');

  return allAgg.data;

})