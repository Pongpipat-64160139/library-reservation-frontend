import type { Room } from "./room";
import type { UserBooking } from "./userBooking";

export interface NormalRoomBooking {
  nrbId?: number;

  startDate: string;

  startTime: string;

  endDate: string;

  endTime: string;

  repeat_Flag: string;

  repeat_End_Flag: string;

  reseve_status?: string;

  details: string;

  roomId: number;

  reason?: string;
  
  cancelTime?: string;
}
export interface getStatusReserved {
  userId: number;
  user_name: string;
  room_id: number;
  normal_room_booking: number;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  re_status: string;
}

export interface BookingDetail {
  nrb_id: number;
  floorNumber: string;
  roomName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: string;
  details: string;
  cancelReason: string;
  cancelTime?: string; // ฟิลด์สำหรับเก็บเวลายกเลิก
}

export interface GetBookingById {
  nrbId?: number;

  startDate: string;

  startTime: string;

  endDate: string;

  endTime: string;

  repeat_Flag: string;

  repeat_End_Flag: string;

  reseve_status?: string;

  details: string;

  reason?: string;

  roomBooking: Room[];
}
