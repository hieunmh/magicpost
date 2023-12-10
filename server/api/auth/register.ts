import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient<Database>(event);

  const email = body.email;
  const phone = body.phone;
  const id = body.id;

  const data = await client.from('users').insert({ 
    address: '',
    birthday: '',
    details: '',
    email: email,
    id: id,
    More_info: '',
    phone: phone,
    role: 'customer',
   })

   return data;
})