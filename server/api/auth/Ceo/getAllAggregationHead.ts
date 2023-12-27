import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const allAggHead = await client.from('aggregation').select(`
    *,
    users!inner(*)
  `
  )
  .eq('users.role', 'aggregation_point_head');

  return allAggHead.data;

})