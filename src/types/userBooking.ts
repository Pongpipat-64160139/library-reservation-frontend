import { NormalRoomBooking } from "./normalRoomBooking";
import { Participant } from "./participant";
import type { User } from "./user";

export interface UserBooking {
  userbooking_Id: number;

  user: User;

  normalRoomBooking: NormalRoomBooking;

  participants: Participant[];
}
