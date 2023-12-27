import type { Database } from "~/types/supabaseType";

import { serverSupabaseClient } from "#supabase/server";

// Post de lay 
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const body = await readBody(event);

  const status = 'Đang giao hàng';
  const address = body.address;

  const allNewPackages = await client.from('packages').select(`
        *,
        packageDetails (*),
        packageStatus!inner(*)
    `
  )
    .eq('packageStatus.status', status)
    .eq('packageStatus.current_location', address || '')
    
  return allNewPackages.data;
})