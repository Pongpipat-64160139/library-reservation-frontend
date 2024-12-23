import type { EquipmentBooking } from "./equipmentBooking";

export interface Equipment {
  eq_Id: number;

  equip_Name: string;

  equipmentBookings: EquipmentBooking[];
}
