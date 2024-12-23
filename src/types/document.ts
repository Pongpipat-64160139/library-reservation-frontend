import type { SpecialRoomBooking } from "./specialRoomBooking";
import { Buffer } from "buffer";
export interface Document {
  id: number; // ID หลัก เป็น Primary Key

  fileName: string; // ชื่อไฟล์ เช่น "example.pdf"

  fileType: string; // ประเภทไฟล์ เช่น "application/pdf"

  fileSize: number; // ขนาดไฟล์ในหน่วย Byte เช่น 1024

  // ใช้ longblob สำหรับเก็บไฟล์ใหญ่ ๆ
  data: Buffer; // ตัวไฟล์จริงในรูปแบบ Binary

  srb: SpecialRoomBooking;
}
