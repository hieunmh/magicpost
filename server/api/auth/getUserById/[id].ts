import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineCachedEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const user = await client.from('users').select('*').eq('id', String(event.context.params?.id)).single();

  return user.data;

})