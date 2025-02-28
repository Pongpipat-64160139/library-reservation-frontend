import type { Equipment } from "./equipment";
import type { GetSpecialRoomBooking } from "./specialRoomBooking";

export interface EquipmentBooking {
  eqb_Id: number;

  require: string;

  equipmnet: Equipment;

  srb: GetSpecialRoomBooking;
}
export interface PostEquipmentBooking {
  require?: "ต้องการ";
  equipmnetId: number;
  srbId: number;
}
