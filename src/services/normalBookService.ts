import http from "../axios";
import { NormalRoomBooking } from "../types/normalRoomBooking";

export function getAllRNB() {
  return http.get("/normal-room-booking");
}
export function getNRBById(id: number) {
  return http.get(`/normal-room-booking/${id}`);
}

export function createNRB(nrb: NormalRoomBooking) {
  return http.post("/normal-room-booking", nrb);
}

export function updateNRB(id: number, nrb: NormalRoomBooking) {
  return http.put(`/normal-room-booking/${id}`, nrb);
}
export function deleteNRB(id: number) {
  return http.delete(`/normal-room-booking/${id}`);
}
export default {
  getAllRNB,
  getNRBById,
  createNRB,
  updateNRB,
  deleteNRB,
};
