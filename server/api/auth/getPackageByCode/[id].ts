import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const packageInfo = await client.from('packages').select(`
    *,
    packageDetails (*),
    packageStatus (*)
  `
  ).eq('id', String(event.context.params?.id)).single();

  return packageInfo.data;

})