import { Document } from "./document";
import { EquipmentBooking } from "./equipmentBooking";
import { OrderDetail } from "./orderDetail";
import { Room } from "./room";
import type { User } from "./user";

export interface SpecialRoomBooking {
  srb_Id: number;

  people_Count: number;

  contract_Number: string;

  start_Date: string;

  start_Time: string;

  end_Date: string;

  end_Time: string;

  stage_Name: string;

  reseve_status: string;

  equip_Descript: string;

  order_Description: string;

  document: Document;

  user: User;

  room: Room;

  reason: string;

  orderDetails: OrderDetail[];

  equipmentBookings: EquipmentBooking[];
}
