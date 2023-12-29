import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient<Database>(event);
  const supabase = serverSupabaseServiceRole(event);

  const id = body.id
  const newEmail = body.newEmail;
  const newPhone = body.newPhone;

  const { data, error } = await supabase.auth.admin.updateUserById(String(id), { email: newEmail, phone: newPhone })

  if (error) {
    return error;
  }

  const update = await client.from('users').update({ email: newEmail, phone: newPhone }).eq('id', String(id));

  return data;
})