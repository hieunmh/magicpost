import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';


export default defineEventHandler(async (event) => {

  // lay id cua request status tu body
  // update isPassed = true
  // lay address cua aggregation point tu body
  // Insert vao package status voi status = 'Đang giao hàng' va current_location = se doi sang dia diem cua aggregation point dich


  const client = await serverSupabaseClient<Database>(event);
  const body = await readBody(event);

  const packageStatusId = body.packageStatusId;
  const address = body.address;
  const packageId = body.packageId;

  console.log(packageId);
  console.log(address);
  console.log(packageStatusId);

  const updateOldPk = await client
    .from('packageStatus')
    .update({ isPassed: true })
    .eq('id', packageStatusId || '')

  // get packageId 

  const insertNewPkStatusData = await client
    .from('packageStatus')
    .insert({ package_id: packageId, status: 'Đang giao hàng', current_location: address || '' })


  return insertNewPkStatusData.data;

})