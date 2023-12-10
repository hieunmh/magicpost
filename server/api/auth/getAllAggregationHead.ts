import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const  allAggregationHead = await client.from('users').select('*').eq('role', 'aggregation_point_head');

  return allAggregationHead.data;

})