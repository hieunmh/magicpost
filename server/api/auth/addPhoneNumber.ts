import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient<Database>(event);

  const userId = body.userId;
  const phone = body.phone;

  const { data, error } = await client.auth.updateUser({ phone: phone });

  if (error) {
    return error;
  }

  const res = await client.from('users').update({ phone: phone.substring(1) }).eq('id', userId);

  return data;
})