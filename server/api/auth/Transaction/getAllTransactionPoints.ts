import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const allTrans = await client.from('transaction_points').select('*');

  return allTrans.data;

})