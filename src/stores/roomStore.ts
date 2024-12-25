import { defineStore } from "pinia";
import roomService from "../services/roomService";
import { ref } from "vue";
import { GetRoomType } from "../types/getRoomType";

export const useRoomStore = defineStore("room", () => {
  const roomservice = roomService;
  const groupStudyRooms = ref<GetRoomType[]>([]);
  const meetingRoom = ref<GetRoomType[]>([]);
  const entertainRoom = ref<GetRoomType[]>([]);
  const newRooms = ref<GetRoomType[]>([]);
  async function getAllRooms() {
    const rooms = await roomservice.getAllRooms();
    console.log(rooms.data);
    return rooms;
  }
  async function selectRoomByType(nameType: string) {
    try {
      const rooms= await roomservice.getRoomTypes(nameType);
      return rooms;
    } catch (error) {
      throw new Error("Not found");
    }
  }
  function setRoom(rooms: GetRoomType[]) {
    newRooms.value = rooms;
  }
  const getRoomsByType = (type: string): GetRoomType[] => {
    return newRooms.value.filter((room) => room.roomType === type);
  };
  function saveRooms(rooms: GetRoomType[]) {}

  return {
    getAllRooms,
    selectRoomByType,
    groupStudyRooms,
    meetingRoom,
    entertainRoom,
    saveRooms,
    newRooms,
    getRoomsByType,
    setRoom,
  };
});
