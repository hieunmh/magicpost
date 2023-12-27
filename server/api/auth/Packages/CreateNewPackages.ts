import type { Database } from "@/types/supabaseType";

import { serverSupabaseClient } from '#supabase/server';
import { Packages } from "#build/components";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient<Database>(event);

  const receiver_address = body.receiver_address;
  const id = body.id;
  const mainCharge = body.mainCharge;
  const notes = body.notes;
  const package_info = body.package_info;
  const receiver_name = body.receiver_name;
  const receiver_phone_no = body.receiver_phone_no;
  const sender_name = body.sender_name;
  const sender_phone_no = body.sender_phone_no;
  const created_at = body.created_at;
  const totalCharge = body.totalCharge;

  const data = await client.from('packageDetails').insert({
    created_at: created_at,
    id: id,
    mainCharge: mainCharge,
    notes: notes,
    package_id: '',
    package_info: package_info,
    receiver_address: receiver_address,
    receiver_name: receiver_name,
    receiver_phone_no: receiver_phone_no,
    sender_name: sender_name,
    sender_phone_no: string | null,
    totalCharge: totalCharge,
    updated_at: string | null,
  })
})