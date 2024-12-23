import type { SpecialRoomBooking } from "./specialRoomBooking";

export interface OrderDetail {
  orders_ID: number;

  Serve_Time: string;

  Serve_Name: string;

  Serve_Categories: string;

  Quantity: number;

  CostPerson: number;

  srb: SpecialRoomBooking;
}
