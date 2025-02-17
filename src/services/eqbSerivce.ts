import http from "../axios";
import { PostEquipmentBooking } from "../types/equipmentBooking";

export function createQuipmentBook(qeBook: PostEquipmentBooking) {
  return http.post("/equipment-booking", qeBook);
}
export default {
  createQuipmentBook,
};
