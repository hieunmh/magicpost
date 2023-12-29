import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';
import { Packages } from "#build/components";

// chuc nang them cua customer thoi
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient<Database>(event);

  const sender_name = body.sender_name;
  const receiver_name = body.receiver_name;
  // const sender_address = body.sender_address;
  const receiver_address = body.receiver_address;
  const sender_phone_no = body.sender_phone_no;
  const receiver_phone_no = body.receiver_phone_no;
  const notes = body.notes;
  const sender_address = body.sender_address;
  const package_info = body.package_info;
  const mainCharge = body.mainCharge;
  const totalCharge = body.totalCharge;
  const transportCharge = body.transportCharge;
  const totalWeight = body.totalWeight;
  const id = body.id;
  const receiver_id = body.receiver_id;


  // get sender_id 
  const user = await client.auth.getUser();
  const sender_id = user.data.user?.id;


  // tao ra package truoc lay ra package_id
  // can insert vao bang package sau do lay ra last_id vua tao
  // gan id vua tao vao bang packageDetails
  // insert du lieu vao bang packageDetails


  //insert du lieu vao bang package status, voi address cua transaction dang gui
  const newPackage = await client.from('packages').insert({
    sender_id: sender_id,
    // receiver_id: receiver_id,
  }).select('*').single();


  const transPoint = await client.from('transaction').select(`
    transaction_points!inner(*)
  `).eq('user_id', sender_id || '').single();
  const address = transPoint?.data?.transaction_points?.address;

  const newId = newPackage.data?.id


  const data = await client.from('packageDetails').insert({
    id: String(newId),
    package_info: package_info,
    receiver_address: receiver_address,
    receiver_name: receiver_name,
    receiver_phone_no: receiver_phone_no,
    sender_name: sender_name,
    sender_address: sender_address,
    sender_phone_no: sender_phone_no,
    transportCharge: transportCharge,
    totalWeight: totalWeight,
    mainCharge: mainCharge,
    totalCharge: totalCharge,
    notes: notes
  })

  const newStatus = await client.from('packageStatus').insert({
    package_id: newId,
    current_location: address,
    status: 'Đang giao hàng',
  })

  if (newPackage && data && newStatus) {
    console.log('true');
  }
})