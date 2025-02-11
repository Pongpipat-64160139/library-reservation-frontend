<template>
  <!-- ส่วน Header ของหน้า -->
  <Header_page />

  <v-container fluid class="back-ground mg-toppage">
    <!-- ชื่อหน้าหลัก -->
    <h1 class="toppic-font mg-btmtoppic">ประเภทห้อง</h1>

    <!-- 🔹 Section: Group Study Room -->
    <v-sheet class="mx-auto study_sheet">
      <span class="d-flex">
        <h1 class="type_font">Group Study Room</h1>
        <!-- ปุ่มไปหน้าจองห้อง -->
        <router-link to="/table_study" class="bookingstudy-font">
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </router-link>
      </span>

      <!-- แสดงรายการห้อง Group Study -->
      <v-slide-group show-arrows class="mg-slidegroup">
        <v-slide-group-item
          v-for="(group, index) in groupedStudyRooms"
          :key="index"
        >
          <div
            class="pd-slidegroup flex-column align-center"
            @click="openDialog(group)"
          >
            <img :src="lib" alt="Study Room" class="size-image" />
            <span class="room-caption"
              >ห้องศึกษากลุ่ม ชั้น {{ group.floorNumber }}</span
            >
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <!-- 🔹 Section: Entertainment Room -->
    <v-sheet class="mx-auto entertain_sheet">
      <span class="d-flex">
        <h1 class="type_font">Entertain Room</h1>
        <!-- ปุ่มไปหน้าจองห้อง -->
        <router-link to="/table_entertain" class="bookingentertain-font">
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </router-link>
      </span>

      <!-- แสดงรายการห้อง Entertainment -->
      <v-slide-group show-arrows class="mg-slidegroup">
        <v-slide-group-item
          v-for="(group, index) in EntertainRooms"
          :key="index"
        >
          <div
            class="pd-slidegroup flex-column align-center"
            @click="openDialog(group)"
          >
            <img :src="lib" alt="Entertain Room" class="size-image" />
            <span class="room-caption">{{ group.roomName }}</span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <!-- 🔹 Section: Meeting Room -->
    <v-sheet class="mx-auto meeting_sheet">
      <span class="d-flex">
        <h1 class="type_font">Meeting Room</h1>
        <!-- ปุ่มไปหน้าจองห้อง -->
        <router-link to="/table_meeting" class="bookingmeeting-font">
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </router-link>
      </span>

      <!-- แสดงรายการห้อง Meeting -->
      <v-slide-group show-arrows class="mg-slidegroupmeeting">
        <v-slide-group-item v-for="(group, index) in MeetingRooms" :key="index">
          <div
            class="pd-slidegroup flex-column align-center"
            @click="openDialog(group)"
          >
            <img :src="lib" alt="Meeting Room" class="size-image" />
            <span class="room-caption">{{ group.roomName }}</span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <!-- 🔹 Dialog สำหรับแสดงรายละเอียดห้อง -->
    <v-dialog v-model="dialog" overlay max-width="900px">
      <v-card class="style_dialog">
        <v-card-text>
          <!-- ✅ ปุ่มเลือกห้อง (ถ้ามีห้องให้เลือก) -->
          <div v-if="selectedGroup?.rooms" class="d-flex justify-center mb-4">
            <v-btn
              v-for="(room, index) in selectedGroup.rooms"
              :key="index"
              class="ma-2"
              @click="selectRoom(room)"
              :class="{
                'selected-room': selectedRoom?.room_Name === room.room_Name,
              }"
            >
              {{ index + 1 }}
            </v-btn>
          </div>

          <!-- ✅ แสดงข้อมูลห้องที่เลือก -->
          <div v-if="selectedRoom" class="text-center">
            <h2 class="room_fontdialog">{{ selectedRoom.room_Name }}</h2>
            <v-row>
              <v-col>
                <v-img :src="couch" class="size-imageicon mx-auto" />
                <p>ที่นั่ง {{ selectedRoom.capacity }} คน</p>
              </v-col>
              <v-col>
                <router-link to="/table_study">
                  <img
                    :src="`${linkBaseURL}${selectedRoom.imagePath}`"
                    :alt="selectedRoom.imagePath || 'ไม่มีภาพ'"
                    class="dialog-image mx-auto"
                    title="คลิกเพื่อจองห้อง"
                  />
                </router-link>
              </v-col>
              <v-col>
                <v-img :src="holdinghandkey" class="size-imageicon mx-auto" />
                <p>รับกุญแจชั้น {{ selectedRoom.RoomKey || "-" }}</p>
              </v-col>
            </v-row>
            <p class="detail-roomfont">รายละเอียดห้อง {{ selectedRoom.RoomKey || "-" }}</p>
            <p class="detail-roomfont">สิทธิ์ในการจองห้อง {{ selectedRoom.RoomKey || "-" }}</p>
          </div>

        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>

  <!-- Footer ของหน้า -->
  <Footer_page />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoomStore } from "@/stores/roomStore";
import lib from "@/assets/lib.png";
import type { Room } from "@/types/room";
import http from "@/axios/index";
import couch from "@/assets/couch.png";
import holdinghandkey from "@/assets/holding-hand-key.png";
const roomStore = useRoomStore();
const groupedByType = ref<Record<string, Room[]>>({});
const dialog = ref(false);
const selectedGroup = ref<{ roomName?: string; rooms: Room[] }>({ rooms: [] });
const selectedRoom = ref<Room | null>(null);
const linkBaseURL = ref(http.defaults.baseURL);
onMounted(async () => {
  try {
    const rooms = await roomStore.getAllRooms();
    const roomTypeMap: Record<string, Room[]> = {};

    rooms.data.forEach((room: any) => {
      const type = room.room_Type;
      const floorId = room.floor.floorId;

      if (!roomTypeMap[type]) {
        roomTypeMap[type] = [];
      }

      if (type === "Group study" && [2, 3, 4].includes(floorId)) {
        roomTypeMap[type].push(room);
      }

      if (type === "Entertain" && floorId === 5) {
        roomTypeMap[type].push(room);
      }

      if (type === "Meeting" && [1, 4, 5, 6].includes(floorId)) {
        roomTypeMap[type].push(room);
      }
    });

    if (roomTypeMap["Group study"]) {
      roomTypeMap["Group study"].sort(
        (a, b) => a.floor.floor_Number - b.floor.floor_Number
      );
    }

    groupedByType.value = roomTypeMap;
    console.log("📌 ห้องแยกตามประเภท:", groupedByType.value);
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
  }
});

const groupedStudyRooms = computed(() => {
  const roomMap = new Map();
  groupedByType.value["Group study"]?.forEach((room) => {
    if (!roomMap.has(room.floor.floor_Number)) {
      roomMap.set(room.floor.floor_Number, []);
    }
    roomMap.get(room.floor.floor_Number).push(room);
  });

  return Array.from(roomMap.entries()).map(([floorNumber, rooms]) => ({
    floorNumber,
    rooms,
  }));
});

const EntertainRooms = computed(() => {
  return processRoomsByCategory("Entertain");
});

const MeetingRooms = computed(() => {
  return processRoomsByCategory("Meeting");
});

function processRoomsByCategory(category: string) {
  const roomMap = new Map();
  groupedByType.value[category]?.forEach((room) => {
    const mainRoomName = getMainRoomName(room.room_Name);
    if (!roomMap.has(mainRoomName)) {
      roomMap.set(mainRoomName, []);
    }
    roomMap.get(mainRoomName).push(room);
  });
  return Array.from(roomMap.entries()).map(([roomName, rooms]) => ({
    roomName,
    rooms,
  }));
}

function getMainRoomName(roomName: string) {
  if (roomName.includes("LIBRA OKE")) return "LIBRA OKE";
  if (roomName === "Mini theater") return "Mini theater";
  if (roomName.includes("STV")) return "ห้องศึกษากลุ่มมัลติมีเดีย STV";
  if (roomName.includes("Lecture's room")) return "Lecture's room";
  if (roomName.includes("640 Smart Board")) return "640 Smart Board";
  if (roomName.includes("Mini Studio")) return "Mini Studio";
  if (roomName.includes("CYBER ZONE")) return "CYBER ZONE";
  if (roomName.includes("Live for Life")) return "Live for Life";
  if (roomName.includes("ห้อง 201")) return "ห้อง 201";
  return roomName;
}

function openDialog(group: { roomName?: string; rooms: Room[] }) {
  selectedGroup.value = group || { rooms: [] };
  dialog.value = true;
  selectedRoom.value = selectedGroup.value.rooms[0] || null;
}

function selectRoom(room: Room) {
  selectedRoom.value = room || null;
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.back-ground {
  background-color: #f9f3ea;
  /* พื้นหลังสีหลัก */
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.toppic-font {
  font-weight: 600;
  font-size: 24px;
  text-align: center;
}

.mg-btmtoppic {
  margin-top: 35px;
  margin-bottom: 50px;
}

.study_sheet {
  background-color: #ead8c0;
  border-radius: 16px;
  max-width: 800px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
}

.type_font {
  font-weight: 600;
  font-size: 20px;
  margin-left: 65px;
  margin-top: 20px;
}

.bookingstudy-font {
  font-weight: 400;
  font-size: 16px;
  margin-left: 415px;
  margin-top: 25px;
  cursor: pointer;
  text-decoration: none;
  color: #493628;
  transition: text-decoration 0.2s ease-in-out;
  position: relative;
  z-index: 10;
}

.mg-slidegroup {
  margin-left: 50px;
}

.pd-slidegroup {
  padding: 16px;
  display: flex;
}

.size-image {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.room-caption {
  font-weight: 500;
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
}

.entertain_sheet {
  background-color: #ead8c0;
  border-radius: 16px;
  max-width: 800px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  margin-top: 40px;
}

.bookingentertain-font {
  font-weight: 400;
  font-size: 16px;
  margin-left: 447px;
  margin-top: 25px;
  cursor: pointer;
  text-decoration: none;
  color: #493628;
  transition: text-decoration 0.2s ease-in-out;
  position: relative;
  z-index: 10;
}

.meeting_sheet {
  background-color: #ead8c0;
  border-radius: 16px;
  max-width: 800px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  margin-top: 40px;
}

.bookingmeeting-font {
  font-weight: 400;
  font-size: 16px;
  margin-left: 455px;
  margin-top: 25px;
  cursor: pointer;
  text-decoration: none;
  color: #493628;
  transition: text-decoration 0.2s ease-in-out;
  position: relative;
  z-index: 10;
}

.mg-slidegroupmeeting {
  margin-left: 50px;
  margin-left: -2px;
}

.size-image:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.v-slide-group__controls {
  z-index: 10;
}

.mg-toppage {
  margin-top: -615px;
}

.align-center {
  text-align: center;
}

.style_dialog {
  background-color: #fff;
  max-width: 800px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
}

.room_fontdialog {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
}

.size-imageicon {
  margin-top: 100px;
  margin-bottom: 10px;
  width: 50px;
  height: 50px;
}

.detail-roomfont {
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 5px;
}

.selected-room {
  background-color: #493628;
  color: white;
}

/* ipad แนวนอน*/
@media only screen and (min-width: 1025px) and (max-width: 1440px) {
  .toppic-font {
    font-weight: 600;
    font-size: 24px;
    text-align: center;
  }

  .mg-btmtoppic {
    margin-top: 35px;
    margin-bottom: 50px;
  }

  .study_sheet {
    background-color: #ead8c0;
    border-radius: 16px;
    max-width: 800px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  }

  .type_font {
    font-weight: 600;
    font-size: 20px;
    margin-left: 65px;
    margin-top: 20px;
  }

  .bookingstudy-font {
    font-weight: 400;
    font-size: 16px;
    margin-left: 415px;
    margin-top: 25px;
    cursor: pointer;
    text-decoration: none;
    color: #493628;
    transition: text-decoration 0.2s ease-in-out;
    position: relative;
    z-index: 10;
  }

  .mg-slidegroup {
    margin-left: 50px;
  }

  .pd-slidegroup {
    padding: 16px;
    display: flex;
  }

  .size-image {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
  }

  .room-caption {
    font-weight: 500;
    font-size: 16px;
    margin-top: 10px;
    text-align: center;
  }

  .entertain_sheet {
    background-color: #ead8c0;
    border-radius: 16px;
    max-width: 800px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
    margin-top: 40px;
  }

  .bookingentertain-font {
    font-weight: 400;
    font-size: 16px;
    margin-left: 447px;
    margin-top: 25px;
    cursor: pointer;
    text-decoration: none;
    color: #493628;
    transition: text-decoration 0.2s ease-in-out;
    position: relative;
    z-index: 10;
  }

  .meeting_sheet {
    background-color: #ead8c0;
    border-radius: 16px;
    max-width: 800px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
    margin-top: 40px;
  }

  .bookingmeeting-font {
    font-weight: 400;
    font-size: 16px;
    margin-left: 455px;
    margin-top: 25px;
    cursor: pointer;
    text-decoration: none;
    color: #493628;
    transition: text-decoration 0.2s ease-in-out;
    position: relative;
    z-index: 10;
  }

  .mg-slidegroupmeeting {
    margin-left: 50px;
    margin-left: -2px;
  }

  .size-image:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  .v-slide-group__controls {
    z-index: 10;
  }

  .mg-toppage {
    margin-top: -615px;
  }

  .align-center {
    text-align: center;
  }

  .style_dialog {
    background-color: #fff;
    max-width: 800px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  }

  .selected-room {
    background-color: #493628;
    color: white;
  }
}
</style>
