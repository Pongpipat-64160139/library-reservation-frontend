export interface Document {
  id: string | number; // ID หลัก เป็น Primary Key

  fileName: string; // ชื่อไฟล์ เช่น "example.pdf"

  documentPath: string; // เก็บ Path ไฟล์ เช่น /uploads/documents/file-xxxxx13486.pdf"
}
