import { defineStore } from "pinia";
import roomService from "../services/roomService";
import { ref } from "vue";
import { GetRoomType } from "../types/getRoomType";

export const useRoomStore = defineStore("room", () => {
  const roomservice = roomService;
  const groupStudyRooms = ref<GetRoomType[]>([]);
  const studyFloor3 = ref<GetRoomType[]>([]);
  const studyFloor4 = ref<GetRoomType[]>([]);
  const studyFloor5 = ref<GetRoomType[]>([]);
  const cyberZoneRooms = ref<GetRoomType[]>([]);
  const room201 = ref<GetRoomType[]>([]);
  const lectureRooms = ref<GetRoomType[]>([]);
  const smartRooms = ref<GetRoomType[]>([]);
  const miniStudioRoom = ref<GetRoomType[]>([]);
  const liveForLifeRoom = ref<GetRoomType[]>([]);
  const meetingRoomFloor7 = ref<GetRoomType[]>([]);
  const okeRooms = ref<GetRoomType[]>([]);
  const stvRooms = ref<GetRoomType[]>([]);
  const miniTheater = ref<GetRoomType[]>([]);
  async function filteredMeetingRooms() {
    // ดึงข้อมูลจาก Service
    const response = await roomservice.getRoomTypes("Meeting");

    // เข้าถึงข้อมูลใน data
    const rooms = response.data;
    // คัดแยกข้อมูลห้องที่ต้องการ
    cyberZoneRooms.value = rooms.filter(
      (room: { roomName: string | string[] }) =>
        room.roomName.includes("CYBER ZONE")
    );
    room201.value = rooms.filter((room: { roomName: string | string[] }) =>
      room.roomName.includes("201")
    );
    lectureRooms.value = rooms.filter((room: { roomName: string | string[] }) =>
      room.roomName.includes("Lecture's room")
    );
    smartRooms.value = rooms.filter((room: { roomName: string | string[] }) =>
      room.roomName.includes("Smart Board")
    );
    miniStudioRoom.value = rooms.filter(
      (room: { roomName: string | string[] }) =>
        room.roomName.includes("Mimi Studios")
    );
    liveForLifeRoom.value = rooms.filter(
      (room: { roomName: string | string[] }) =>
        room.roomName.includes("Live for Life")
    );
    meetingRoomFloor7.value = rooms.filter(
      (room: { roomName: string }) =>
        room.roomName === "ห้อง 706" || room.roomName === "ห้อง 707"
    );

    console.log("Filtered Rooms:", cyberZoneRooms.value);
    console.log("Filtered Rooms:", room201.value);
    console.log("Filtered Rooms:", lectureRooms.value);
    console.log("Filtered Rooms:", smartRooms.value);
    console.log("Filtered Rooms:", miniStudioRoom.value);
    console.log("Filtered Rooms:", liveForLifeRoom.value);
    console.log("Filtered Rooms:", meetingRoomFloor7.value);
    // ส่งข้อมูลที่คัดแยกกลับ
    return cyberZoneRooms;
  }
  async function getAllRooms() {
    const rooms = await roomservice.getAllRooms();
    console.log(rooms.data);
    return rooms;
  }
  async function getRoomGroupStudy() {
    const rooms = await roomservice.getRoomTypes("Group study");
    groupStudyRooms.value = rooms.data;
    studyFloor3.value = groupStudyRooms.value.filter(
      (room) => room.floorId === 2
    );
    studyFloor4.value = groupStudyRooms.value.filter(
      (room) => room.floorId === 3
    );
    studyFloor5.value = groupStudyRooms.value.filter(
      (room) => room.floorId === 4
    );
    return { studyFloor3, studyFloor4, studyFloor5 };
  }
  async function filteredEntertainRooms() {
    const response = await roomservice.getRoomTypes("Entertain");
    const rooms = response.data;
    okeRooms.value = rooms.filter((room: { roomName: string | string[] }) =>
      room.roomName.includes("คาราโอเกะ")
    );
    stvRooms.value = rooms.filter((room: { roomName: string | string[] }) =>
      room.roomName.includes("Room STV")
    );
    miniTheater.value = rooms.filter((room: { roomName: string | string[] }) =>
      room.roomName.includes("Mimi theater")
    );
    console.log("Filtered Rooms:", okeRooms.value);
    console.log("Filtered Rooms:", stvRooms.value);
    console.log("Filtered Rooms:", miniTheater.value);
  }
  return {
    getAllRooms,
    groupStudyRooms,
    getRoomGroupStudy,
    studyFloor3,
    studyFloor4,
    studyFloor5,
    cyberZoneRooms,
    filteredMeetingRooms,
    room201,
    lectureRooms,
    smartRooms,
    miniStudioRoom,
    liveForLifeRoom,
    meetingRoomFloor7,
    filteredEntertainRooms,
    okeRooms,
    stvRooms,
    miniTheater,
  };
});
