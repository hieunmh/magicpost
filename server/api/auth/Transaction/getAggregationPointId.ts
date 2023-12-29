import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user = await client.auth.getUser();
  const userId = user.data.user?.id;

  const transPoint = await client.from('transaction').select('transaction_point_id').eq('user_id', userId || '').single();
  const aggregationPointId = await client.from('transaction_points').select('aggregation_id').eq('id', transPoint.data?.transaction_point_id || '').single();

  return aggregationPointId.data;
})