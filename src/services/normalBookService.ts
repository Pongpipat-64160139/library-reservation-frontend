import http from "../axios";
import type {
  PostNormalReseved,
  UpdateNormalRoomBooking,
} from "../types/normalRoomBooking";

export function getAllRNB() {
  return http.get("/normal-room-booking");
}
export function getNRBById(id: number) {
  return http.get(`/normal-room-booking/${id}`);
}

export function createNRB(nrb: PostNormalReseved) {
  return http.post("/normal-room-booking", nrb);
}

export function updateNRB(
  id: number,
  updateData: Partial<UpdateNormalRoomBooking>
) {
  return http.patch(`/normal-room-booking/${id}`, updateData);
}

export function deleteNRB(id: number) {
  return http.delete(`/normal-room-booking/${id}`);
}
export function getReservedRoom(currentDate: string) {
  return http.get(`/normal-room-booking/getReserved`, {
    params: { currentDate: currentDate }, // ใช้ params เพื่อส่ง Query String
  });
}

export function getAllReserved() {
  return http.get("/normal-room-booking/getAllReserved");
}
export default {
  getAllReserved,
  getAllRNB,
  getNRBById,
  createNRB,
  updateNRB,
  deleteNRB,
  getReservedRoom,
};
