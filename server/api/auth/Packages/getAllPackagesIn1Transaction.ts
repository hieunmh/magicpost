import type { Database } from "~/types/supabaseType";

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {

    // lay auth_id cua user
    // check xem user nay co role la gi
    // neu role la transaction
    // thi moi cho lay du lieu
    // truy cap bang transaction lay ra transaction_points cua nguoi nay dang lam 
    // tu bang transaction_points lay ra address tim kiem cac package co current_location nay
    // tu do xdinh dc vi tri cua don hang


    // test
    const address = '114 La Thành - TX Sơn Tây - Hà Nội';
    const client = await serverSupabaseClient<Database>(event);

    const allPackage = await client.from('packages').select(`
        *,
        packageDetails (*),
        packageStatus!inner(*)
    `
    ).eq('packageStatus.current_location', address)


    return allPackage.data;
})