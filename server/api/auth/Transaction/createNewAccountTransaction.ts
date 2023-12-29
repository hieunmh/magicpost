import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient<Database>(event);
  const user = await client.auth.getUser();
  const userId = user.data.user?.id;

  const transPoint = await client.from('transaction').select('*').eq('user_id', userId || '').single();
  const transPointId = transPoint?.data?.transaction_point_id;
  const email = body.email;
  const phone = body.phone;
  const password = body.password;

  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
  })

  if (error) {
    return false;
  }

  const insertNewEmployee = await client.from('users').insert({
    address: '',
    birthday: '',
    details: '',
    email: email,
    id: String(data?.user?.id),
    More_info: '',
    phone: phone,
    role: 'transaction_employee',
  })
  const insertIntoTrans = await client.from('transaction').insert({
    transaction_point_id: transPointId,
    user_id: String(data?.user?.id),
  })

  if (insertNewEmployee && insertIntoTrans) {
    return true;
  }
})