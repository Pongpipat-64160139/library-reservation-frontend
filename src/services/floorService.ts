import http from "../axios";
import type { Floor } from "../types/floor";

export function getAllFlors() {
  return http.get("/floors");
}
export function getFloorById(id: number) {
  return http.get(`/floors/${id}`);
}
export function updateFloors(id: number, floors: Floor) {
  return http.patch(`/floors/${id}`, floors);
}
export function deleteFloors(id: number) {
  return http.delete(`/floors/${id}`);
}

export function createFloor(floor: Floor) {
  return http.post("/floors", floor);
}
export default {
  getAllFlors,
  getFloorById,
  updateFloors,
  deleteFloors,
  createFloor,
};
