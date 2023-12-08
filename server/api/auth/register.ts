import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';
import { serverSupabaseUser } from "#supabase/server";


export default defineCachedEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { user } = await readBody(event);

  const { data } = await client.from('users').insert(user);

})