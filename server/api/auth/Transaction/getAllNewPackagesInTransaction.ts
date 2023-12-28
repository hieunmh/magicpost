import type { Database } from "~/types/supabaseType";

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {


  // lay address cua transaction point
  // tim kiem trong status cua package lay isPassed = False => chua dc xet tiep, trong thop sang trang thai tiep theo r thi isPassed = True

  const client = await serverSupabaseClient<Database>(event);
  const user = await client.auth.getUser();
  const userId = user.data.user?.id;

  const transPoint = await client.from('transaction').select(`
    transaction_points!inner(*)
  `).eq('user_id', userId || '').single();
  const address = transPoint?.data?.transaction_points?.address;
  const status = 'Đang giao hàng';

  const allNewPackage = await client.from('packages').select(`
        *,
        packageDetails (*),
        packageStatus!inner(*)
    `
  )
    .eq('packageStatus.status', status)
    .eq('packageStatus.current_location', address || '')
    .eq('packageStatus.isPassed', false);

  return allNewPackage.data;
})