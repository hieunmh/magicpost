import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const  allTransactionEmployee = await client.from('users').select('*').in('role', ['transaction_employee']);

  return allTransactionEmployee.data;

})