import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';


export default defineEventHandler(async (event) => {
  
  const client = await serverSupabaseClient<Database>(event);
  const user = await client.auth.getUser();
  const userId = user.data.user?.id;

  const transPoint = await client.from('aggregation').select('aggregation_point_id').eq('user_id', userId || '').single();
  const aggregationPointId = transPoint?.data?.aggregation_point_id;

  const allTransactionEmployee = await client.from('users').select(`
    *,
    aggregation!inner(*)
  `)
    .eq('aggregation.aggregation_point_id', aggregationPointId || '')
    .eq('role', 'aggregation_employee')
  
  return allTransactionEmployee.data;

})