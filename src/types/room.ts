import { Floor } from "./floor";
export interface Room {
  roomId: number;

  room_Name: string;

  capacity: number;

  max_hours: number;

  room_Status: string;

  room_Type: string;

  room_Minimum: number;

  orderFood: string;

  RoomKey: string;

  imagePath: string;

  DetailRoom: string;

  floor: Floor;

  // confirmations: Confirmation[];

  // normalRoomBookings: NormalRoomBooking[];

  // roleRoomAccesses: RoleRoomAccess[];

  // specialRoomBookings: SpecialRoomBooking[];
}
export interface SelectedRoom {
  roomId: number; // รหัสห้อง
  roomName: string; // ชื่อห้อง
  capacity: number; // ความจุสูงสุด
  maxHours: number; // จำนวนชั่วโมงสูงสุดที่สามารถจองได้
  roomStatus: string; // สถานะห้อง (ว่าง, ไม่ว่าง)
  roomType: string; // ประเภทห้อง (Meeting, Group study, ฯลฯ)
  roomMinimum: number; // จำนวนขั้นต่ำของคนที่ต้องการจอง
  roomOrder: string; // การอนุญาตสั่งอาหาร (Yes/No)
  roomKey: string; // กุญแจห้อง (ถ้ามี)
  imagePath: string; // พาธรูปภาพของห้อง
  detailRoom: string; // รายละเอียดเพิ่มเติมของห้อง
}
