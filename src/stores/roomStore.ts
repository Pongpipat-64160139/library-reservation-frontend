import { defineStore } from "pinia";
import roomService from "../services/roomService";

export const useRoomStore = defineStore("room", () => {
  const roomservice = roomService;
  async function getAllRooms() {
    const rooms = await roomservice.getAllRooms();
    console.log(rooms.data);
    return rooms;
  }
  async function selectRoomByType(type: string) {
    const room = await roomservice.getRoomTypes(type);
    return room.data;
  }
  return {
    getAllRooms,
    selectRoomByType,
  };
});
