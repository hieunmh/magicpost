import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const allAg = await client.from('aggregation_points').select('*');

  console.log(allAg.data);
  return allAg.data;

})