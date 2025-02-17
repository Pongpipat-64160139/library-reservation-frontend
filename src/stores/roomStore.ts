import { defineStore } from "pinia";
import roomService from "../services/roomService";
import { ref } from "vue";
import { GetRoomType } from "../types/getRoomType";

export const useRoomStore = defineStore("room", () => {
  const roomservice = roomService;

  const currentTypeRoom = ref<GetRoomType>(
    JSON.parse(localStorage.getItem("currentTypeRoom") || "null")
  );

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
  const holidays = ref<string[]>([]);

  function setCurrentRoom(room: GetRoomType) {
    currentTypeRoom.value = room;
    localStorage.setItem("currentTypeRoom", JSON.stringify(room)); // เก็บใน LocalStorage
  }

  function getCurrentRoom() {
    const storedRoom = localStorage.getItem("currentTypeRoom");
    if (storedRoom) {
      currentTypeRoom.value = JSON.parse(storedRoom);
    }
    return currentTypeRoom;
  }

  async function filteredMeetingRooms() {
    const response = await roomservice.getRoomTypes("Meeting");

    const rooms = response.data;
    meetingRooms.value = rooms;
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
        room.roomName.includes("Mini Studio")
    );
    liveForLifeRoom.value = rooms.filter(
      (room: { roomName: string | string[] }) =>
        room.roomName.includes("Live for Life")
    );
    meetingRoomFloor7.value = rooms.filter(
      (room: { roomName: string }) =>
        room.roomName === "ห้อง 706" || room.roomName === "ห้อง 707"
    );
    return meetingRooms;
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
    entertainRooms.value = [];
    //
    okeRooms.value = rooms.filter((room: { roomName: string | string[] }) =>
      room.roomName.includes("LIBRA OKE")
    );
    stvRooms.value = rooms.filter((room: { roomName: string | string[] }) =>
      room.roomName.includes("STV")
    );
    miniTheater.value = rooms.filter((room: { roomName: string | string[] }) =>
      room.roomName.includes("Mini theater")
    );
    for (let i = 0; i <= stvRooms.value.length; i++) {
      entertainRooms.value.push(stvRooms.value[i]);
    }
    for (let i = 0; i <= okeRooms.value.length; i++) {
      entertainRooms.value.push(okeRooms.value[i]);
    }
    for (let i = 0; i <= miniTheater.value.length; i++) {
      entertainRooms.value.push(miniTheater.value[i]);
    }
    //แยกค่่า undefined ออกจาก Array entertainments
    entertainRooms.value = entertainRooms.value.filter(
      (r) => r != undefined && r.roomName
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

  async function getRoomByID(id: number) {
    const response = await roomservice.getRoomById(id);
    const findRoom = response.data;
    return findRoom;
  }
  async function selectedRoom(floor: number, name: string) {
    const res = await roomservice.selectedRoom(floor, name);
    return res;
  }
  return {
    getAllRooms,
    selectedRoom,
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
    holidays,
    setCurrentRoom,
    getCurrentRoom,
    getRoomByID,
    getMeetingRooms,
  };
});
