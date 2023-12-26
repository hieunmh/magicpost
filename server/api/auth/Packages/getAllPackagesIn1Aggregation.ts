import type { Database } from "~/types/supabaseType";

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {

    // lay auth_id cua user
    // check xem user nay co role la gi
    // neu role la aggregation
    // thi moi cho lay du lieu
    // truy cap bang aggregation lay ra aggregation_points cua nguoi nay dang lam 
    // tu bang aggregation_points lay ra address tim kiem cac package co address nay

    const address = 'Thôn Cổ Điển - Xã Hải Bối - Đông Anh - Hà Nội'; 
    const client = await serverSupabaseClient<Database>(event);

    const allPackage = await client.from('packages').select(`
        *,
        packageDetails (*),
        packageStatus!inner(*)
    `    
    ).eq('packageStatus.current_location', address);


    return allPackage.data;
})