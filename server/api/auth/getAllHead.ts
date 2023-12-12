import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const  allHead = await client.from('users').select('*').in('role', ['aggregation_point_head', 'transaction_point_head']);

  return allHead.data;

})