import type { Database } from "~/types/supabaseType";

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {

  const status = 'Chờ xử lý';
  const client = await serverSupabaseClient<Database>(event);

  const allNewPackage = await client.from('packages').select(`
        *,
        packageDetails (*),
        packageStatus!inner(*)
    `
  )
    .eq('packageStatus.status', status)
  return allNewPackage.data;
})