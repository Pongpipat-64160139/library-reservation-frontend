import { Buffer } from "buffer";

export interface DocumentFile {
  id: string | number; // ID หลัก เป็น Primary Key

  fileName: string; // ชื่อไฟล์ เช่น "example.pdf"

  fileType: string; // ประเภทไฟล์ เช่น "application/pdf"

  fileSize: number; // ขนาดไฟล์ในหน่วย Byte เช่น 1024

  uploadedAt: Date; // วันที่อัปโหลดไฟล์

  data?: Buffer; // ตัวไฟล์จริงในรูปแบบ Binary (ใช้ `LONGBLOB` ใน MySQL)
}
