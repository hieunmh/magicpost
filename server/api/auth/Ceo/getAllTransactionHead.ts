import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';


export default defineEventHandler(async (event) => {
  
  const client = await serverSupabaseClient<Database>(event);
  // const body = await readBody(event);
  // const aggregationPointId = body?.aggregationPointId;

  const allTransacHeads = await client.from('transaction').select(`
    *,
    users!inner(*)
  `)
    .eq('users.role', 'transaction_point_head')
  
  return allTransacHeads.data;

})