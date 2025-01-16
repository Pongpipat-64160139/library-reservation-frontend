import { NormalRoomBooking } from "./normalRoomBooking";
import type { User } from "./user";

export interface UserBooking {
  userbooking_Id: number;

  user: User;

  normalRoomBooking: NormalRoomBooking;

  // participants: Participant[];
}

export interface UBPostpayload {
  userId: number;
  nrbBookingId: number;
}
