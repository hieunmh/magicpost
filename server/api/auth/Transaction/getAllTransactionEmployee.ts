import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user = await client.auth.getUser();
  const userId = user.data.user?.id;

  const transPoint = await client.from('transaction').select('transaction_point_id').eq('user_id', userId || '').single();
  const aggregationPointId = transPoint?.data?.transaction_point_id;

  const allTransactionEmployee = await client.from('users').select(`
    *,
    transaction!inner(*)
  `)
    .eq('transaction.transaction_point_id', aggregationPointId || '')
    .eq('role', 'transaction_employee')
  
  return allTransactionEmployee.data;

  // const  allTransactionEmployee = await client.from('users').select('*').in('role', ['transaction_employee']);

  // return allTransactionEmployee.data;

})