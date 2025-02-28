import type { Document } from "./document";
import type { EquipmentBooking } from "./equipmentBooking";
import type { OrderDetail } from "./orderDetail";
import type { Room } from "./room";
import type { User } from "./user";

export interface GetSpecialRoomBooking {
  srb_Id?: number;

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

  reason: string;

  cancelTime: string;

  user: User;

  room: Room;

  document: Document;

  orderDetails: OrderDetail;

  equipmentBookings: EquipmentBooking;
}

export interface PostSpecialRoom {
  people_Count: number; // จำนวนคนที่เข้าร่วม
  contract_Number: string; // เบอร์โทรศัพท์ติดต่อ
  start_Date: string; // วันที่เริ่มต้น (YYYY-MM-DD)
  start_Time: string; // เวลาที่เริ่ม (HH-MM-SS)
  end_Date: string; // วันที่สิ้นสุด (YYYY-MM-DD)
  end_Time: string; // เวลาที่สิ้นสุด (HH-MM-SS)
  stage_Name: string; // ชื่อเวที (ถ้ามี)
  reseve_status: string; // สถานะการจอง
  equip_Descript: string; // รายละเอียดอุปกรณ์ที่ต้องการ
  order_Description: string; // คำอธิบายการสั่งอาหาร
  document: number; // จำนวนเอกสารที่แนบ
  userId: number; // รหัสผู้ใช้
  reason: string; // เหตุผลในการจอง (หรือยกเลิก)
  cancelTime: string; // เวลาที่ยกเลิก
  roomId: number; // รหัสห้องที่จอง
}

export interface UpdateSpecialRoom {
  people_Count?: number; // จำนวนคนที่ใช้ห้อง
  contract_Number?: string; // หมายเลขติดต่อ
  start_Date?: string; // วันที่เริ่มต้น (YYYY-MM-DD)
  start_Time?: string; // เวลาเริ่มต้น (HH-MM-SS)
  end_Date?: string; // วันที่สิ้นสุด (YYYY-MM-DD)
  end_Time?: string; // เวลาสิ้นสุด (HH-MM-SS)
  stage_Name?: string; // ชื่อเวที (ถ้ามี)
  equip_Descript?: string; // รายละเอียดอุปกรณ์ที่ต้องการ
  order_Description?: string; // คำอธิบายการสั่งอาหาร
  document?: number | null; // ไฟล์เอกสารแนบ (อาจเป็นไฟล์ ID หรือ null)
  userId?: number; // รหัสผู้ใช้ที่จอง
  reason?: string; // เหตุผลในการจอง หรือยกเลิก (อาจว่าง)
  cancelTime?: string; // เวลาที่ยกเลิก (อาจว่าง)
  roomId?: number; // รหัสห้องที่จอง
  reseve_status?: string; //
}
