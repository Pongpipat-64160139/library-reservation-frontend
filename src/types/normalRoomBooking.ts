import type { Room } from "./room";
import type { UserBooking } from "./userBooking";

export interface NormalRoomBooking {
  nrbId: number;

  startDate: string;

  startTime: string;

  endDate: string;

  endTime: string;

  repeat_Flag: string;

  repeat_End_Flag: string;

  reseve_status: string; // สถานะการจอง

  details: string;

  roomBooking: Room;

  reason: string;
  userBookings: UserBooking[];
}
