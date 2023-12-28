import type { Database } from "~/types/supabaseType";

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const status = 'Đã giao hàng';
  // da gui sent = 1

  //chua gui sent = 0

  const allPackages:any = await client
    .from('packages')
    .select(`
      *, 
      packageStatus(*)
    `);

  const packagesWithSentStatus = allPackages.data.map((pk: { packageStatus: string | any[]; }) => ({
    ...pk,
    Sent: pk.packageStatus?.length > 0 && pk.packageStatus[pk.packageStatus?.length - 1].status === status ? 1 : 0
  }));  
  
  return packagesWithSentStatus;
})