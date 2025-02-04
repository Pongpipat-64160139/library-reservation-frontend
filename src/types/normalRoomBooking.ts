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

  roomBooking: Room;

  reason?: string;

  cancelTime?: string;
}

export interface PostNormalReseved {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  repeat_Flag: string;
  repeat_End_Flag: string;
  reseve_status: string;
  details: string;
  reason: string;
  cancelTime: string;
  roomId: number;
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
  cancelTime: string;
}
export interface UpdateNormalRoomBooking {
  startDate: string; // วันที่เริ่มต้น (รูปแบบ DD-MM-YYYY)
  startTime: string; // เวลาที่เริ่มต้น (รูปแบบ HH:MM:SS)
  endDate: string; // วันที่สิ้นสุด (รูปแบบ DD-MM-YYYY)
  endTime: string; // เวลาสิ้นสุด (รูปแบบ HH:MM:SS)
  repeat_Flag: string; // ตัวบ่งบอกว่าการจองทำซ้ำหรือไม่ (Yes/No)
  repeat_End_Flag: string; // วันที่สิ้นสุดของการทำซ้ำ (ถ้ามี)
  reseve_status: string; // สถานะการจอง (รอ, อนุมัติ, ยกเลิก ฯลฯ)
  details: string; // รายละเอียดของการจอง
  reason: string; // เหตุผลสำหรับการเปลี่ยนแปลง/ยกเลิก (ถ้ามี)
  roomId: number; // รหัสของห้องที่ถูกจอง
  cancelTime: string;
}
