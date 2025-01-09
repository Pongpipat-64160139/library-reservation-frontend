import { defineStore } from "pinia";
import roomService from "../services/roomService";
import { ref } from "vue";
import { GetRoomType } from "../types/getRoomType";
import { CurrentRoom } from "../types/currentRoom";

export const useRoomStore = defineStore("room", () => {
  const roomservice = roomService;

  const currentTypeRoom = ref<CurrentRoom>();

  const groupStudyRooms = ref<GetRoomType[]>([]);
  const studyFloor3 = ref<GetRoomType[]>([]);
  const studyFloor4 = ref<GetRoomType[]>([]);
  const studyFloor5 = ref<GetRoomType[]>([]);

  const entertainRooms = ref<GetRoomType[]>([]);
  const okeRooms = ref<GetRoomType[]>([]);
  const stvRooms = ref<GetRoomType[]>([]);
  const miniTheater = ref<GetRoomType[]>([]);

  const meetingRooms = ref<GetRoomType[]>([]);
  const cyberZoneRooms = ref<GetRoomType[]>([]);
  const room201 = ref<GetRoomType[]>([]);
  const lectureRooms = ref<GetRoomType[]>([]);
  const smartRooms = ref<GetRoomType[]>([]);
  const miniStudioRoom = ref<GetRoomType[]>([]);
  const liveForLifeRoom = ref<GetRoomType[]>([]);
  const meetingRoomFloor7 = ref<GetRoomType[]>([]);
  const meetingRoomFloor6 = ref<GetRoomType[]>([]);
  async function filteredMeetingRooms() {
    const response = await roomservice.getRoomTypes("Meeting");

    const rooms = response.data;
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

  async function getGroupStudyRooms() {
    const response = await roomservice.getRoomTypes("Group Study");
    groupStudyRooms.value = response.data;

    studyFloor3.value = groupStudyRooms.value.filter(
      (room) => room.floorId === 2
    );
    studyFloor4.value = groupStudyRooms.value.filter(
      (room) => room.floorId === 3
    );
    studyFloor5.value = groupStudyRooms.value.filter(
      (room) => room.floorId === 4
    );
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
  }

  async function getMeetingRooms() {
    const response = await roomservice.getRoomTypes("Meeting");
    meetingRooms.value = response.data;

    cyberZoneRooms.value = meetingRooms.value.filter((room) =>
      room.roomName.includes("Cyber Zone")
    );
    room201.value = meetingRooms.value.filter((room) =>
      room.roomName.includes("201")
    );
    lectureRooms.value = meetingRooms.value.filter((room) =>
      room.roomName.includes("Lecture")
    );
    smartRooms.value = meetingRooms.value.filter((room) =>
      room.roomName.includes("Smart Board")
    );
    miniStudioRoom.value = meetingRooms.value.filter((room) =>
      room.roomName.includes("Mini Studio")
    );
    liveForLifeRoom.value = meetingRooms.value.filter((room) =>
      room.roomName.includes("Live for Life")
    );
    meetingRoomFloor7.value = meetingRooms.value.filter(
      (room) => room.floorId === 7
    );
  }
  async function initializeRooms() {
    await getGroupStudyRooms();
    await filteredEntertainRooms();
    await getMeetingRooms();
  }

  async function compiledMeetingRoomsFloor6() {
    const response = await roomservice.getRoomTypes("Meeting");
    meetingRoomFloor6.value = response.data.filter(
      (room: { floorId: number }) => room.floorId === 5
    );
    return meetingRoomFloor6.value;
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
    initializeRooms,
    entertainRooms,
    meetingRooms,
    compiledMeetingRoomsFloor6,
    meetingRoomFloor6,
    currentTypeRoom,
  };
});
