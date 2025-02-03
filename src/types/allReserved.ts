export interface AllReserve {
  reserved_Id: number;
  user_name: string;
  floor_number: number;
  room_name: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  reseve_status: string;
  coalesce_time?: string;
  reason?: string;
  details?: string;
  equip_Descript?: string;
  order_Description?: string;
  room_Type: string;
  formReserved: string;
}
