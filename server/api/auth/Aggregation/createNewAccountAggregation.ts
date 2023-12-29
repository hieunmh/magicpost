import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient<Database>(event);
  const user = await client.auth.getUser();
  const userId = user.data.user?.id;

  const aggPoint = await client.from('aggregation').select('*').eq('user_id', userId || '').single();
  const aggPointId = aggPoint?.data?.aggregation_point_id;
  const email = body.email;
  const phone = body.phone;
  const password = body.password

  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
  })

  if (error) {
    return error;
  }

  const insertNewEmployee = await client.from('users').insert({
    address: '',
    birthday: '',
    details: '',
    email: email,
    id: String(data?.user?.id),
    More_info: '',
    phone: phone,
    role: 'aggregation_employee',
  })

  console.log(aggPointId);
  console.log(data?.user?.id);

  const insertIntoAggregation = await client.from('aggregation').insert({
    aggregation_point_id: aggPointId,
    user_id: String(data?.user?.id),
  })

  if (insertNewEmployee && insertIntoAggregation) {
    return true;
  }
})