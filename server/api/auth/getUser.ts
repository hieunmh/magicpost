import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineCachedEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);


  const allUser = await client.from('users').select('*')

  return allUser;

})