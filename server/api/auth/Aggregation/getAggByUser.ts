import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const user = await client.auth.getUser();
  const userId = user.data.user?.id;

  const data = await client.from('aggregation').select("*").eq('user_id', String(userId)).single();

  return data.data?.aggregation_point_id;
})