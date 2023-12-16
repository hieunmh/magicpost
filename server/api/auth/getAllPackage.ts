import type { Database } from "~/types/supabaseType";

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event);

    const allPackage = await client.from('package').select('*').in('packageStatus', ['status'])

    return allPackage.data;
})