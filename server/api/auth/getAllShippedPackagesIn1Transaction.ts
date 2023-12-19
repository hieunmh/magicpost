import type { Database } from "~/types/supabaseType";

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {

    const status = 'Đang giao hàng';
    const client = await serverSupabaseClient<Database>(event);

    const allSendedPackage = await client.from('packages').select(`
        *,
        packageDetails (*),
        packageStatus!inner(*)
    `
    )
        .eq('packageStatus.status', status)
    return allSendedPackage.data;
})