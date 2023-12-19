import type { Database } from "~/types/supabaseType";

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event);

    const allPackage = await client.from('packages').select(`
        *,
        packageDetails (*),
        packageStatus (*)
    `    
    );

    return allPackage.data;
})