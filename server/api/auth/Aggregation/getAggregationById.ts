import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const body = await readBody(event);
  const id = body.id;

  const allAgg = await client.from('aggregation').select(`
    *,
    users!inner(*)
  `
  )
  .eq('aggregation_point_id', String(id))
  .eq('users.role', 'aggregation_point_head').single();

  return allAgg.data;

})