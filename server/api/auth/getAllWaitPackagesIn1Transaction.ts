import type { Database } from "~/types/supabaseType";

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {

    const status = 'Chờ giao hàng';
    const client = await serverSupabaseClient<Database>(event);

    const allWaitPackage = await client.from('packages').select(`
        *,
        packageDetails (*),
        packageStatus!inner(*)
    `
    )
        .eq('packageStatus.status', status)
    return allWaitPackage.data;
})