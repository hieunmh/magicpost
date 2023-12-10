import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient<Database>(event);

  const { data, error } = await client.from('users').update({ More_info: body.More_info }).eq('id', body.userId);

  return data;

})