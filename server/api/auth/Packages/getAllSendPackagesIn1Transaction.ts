import type { Database } from "~/types/supabaseType";

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {

    const status = 'Đang vận chuyển';
    const client = await serverSupabaseClient<Database>(event);

    const allSendPackage = await client.from('packages').select(`
        *,
        packageDetails (*),
        packageStatus!inner(*)
    `
    )
        .eq('packageStatus.status', status)
    return allSendPackage.data;
})