import http from "../axios";
import type { Room } from "../types/room";

export function getAllRooms() {
  return http.get("/rooms");
}
export function getRoomById(id: number) {
  return http.get(`/rooms/${id}`);
}

export function createRoom(rooms: Room) {
  return http.post("/rooms", rooms);
}

export function updateRoom(id: number, rooms: Room) {
  return http.put(`/rooms/${id}`, rooms);
}
export function deleteRoom(id: number) {
  return http.delete(`/rooms/${id}`);
}

export function getRoomTypes(types: string) {
  return http.get(`/rooms/get-roomType`, {
    params: { roomType: types }, // ใช้ params เพื่อส่ง Query String
  });
}

export function selectedRoom(floorNumber: number, roomName: string) {
  return http.get(`/rooms/selectedRoom`, {
    params: { floorNumber: floorNumber, roomName: roomName }, // ใช้ params เพื่อส่ง Query String
  });
}

export default {
  selectedRoom,
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomTypes,
};
