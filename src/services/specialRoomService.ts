import http from "../axios";
import { PostSpecialRoom, UpdateSpecialRoom } from "../types/specialRoomBooking";
export function getAllSpecialRoom() {
  return http.get("/special-room-bookings");
}

export function getOneById(id: number) {
  return http.get(`/special-room-bookings/${id}`);
}

export function createSpecialRoomBooking(specialRoomBooking: PostSpecialRoom) {
  return http.post("/special-room-bookings", specialRoomBooking);
}

export function updateSpecialRoomBooking(
  id: number,
  specialRoomBooking: Partial<UpdateSpecialRoom>
) {
  return http.patch(`/special-room-bookings/${id}`, specialRoomBooking);
}
export function deleteSpecialRoomBooking(id: number) {
  return http.delete(`/special-room-bookings/${id}`);
}
export default {
  getAllSpecialRoom,
  getOneById,
  createSpecialRoomBooking,
  updateSpecialRoomBooking,
  deleteSpecialRoomBooking,
};
