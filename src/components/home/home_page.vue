<template class="back-ground">
  <Header_page />

  <v-container fluid class="back-ground ms-kob">
    <h1 class="pt-5 head-title text-center pb-10">ประเภทห้อง</h1>

    <!-- Sheet1 Group Study Room -->
    <v-sheet class="mx-auto study_box">
      <span class="d-flex">
        <h1 class="ps-16 pt-5 head1-title">Group Study Room</h1>
        <router-link
          to="/table_study"
          class="ps-16 pt-4 regular-study-title regularstu-line"
        >
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </router-link>
      </span>

      <v-slide-group show-arrows class="mg-arrow mg-arrowipad">
        <v-slide-group-item
          v-for="(group, index) in groupedStudyRooms"
          :key="index"
        >
          <div
            class="ma-4 d-flex flex-column align-center mg-leftimage"
            @click="openDialog(group)"
          >
            <img :src="group.src" :alt="group.alt" class="slide-image" />
            <span class="mt-2 text-center room-caption">
              ห้องศึกษากลุ่ม ชั้น {{ group.floorNumber }}
            </span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <!-- Sheet2 Entertainment Room -->
    <v-sheet class="mx-auto mt-10 entertain_box">
      <span class="d-flex">
        <h1 class="ps-16 pt-5 head1-title">Entertain Room</h1>
        <router-link
          to="/table_entertain"
          class="pt-4 regular-entertain-title regularstu-line"
        >
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </router-link>
      </span>

      <v-slide-group show-arrows class="mg-arrow mg-arrowipad">
        <v-slide-group-item
          v-for="(group, index) in EntertainRooms"
          :key="index"
        >
          <div
            class="ma-4 d-flex flex-column align-center"
            @click="openDialog(group)"
          >
            <img :src="group.src" :alt="group.alt" class="slide-image" />
            <span class="mt-2 text-center room-caption">
              {{ group.roomName }}
            </span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <!-- Sheet3 Entertainment Room -->
    <v-sheet class="mx-auto mt-10 mb-10 meeting_box">
      <span class="d-flex">
        <h1 class="ps-16 pt-5 head1-title">Meeting Room</h1>
        <router-link
          to="/table_meeting"
          class="ps-16 pt-4 regular-meeting-title regularstu-line"
        >
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </router-link>
      </span>

      <v-slide-group show-arrows class="ms-1 mg-arrow">
        <v-slide-group-item v-for="(group, index) in MeetingRooms" :key="index">
          <div
            class="ma-4 d-flex flex-column align-center"
            @click="openDialog(group)"
          >
            <img :src="group.src" :alt="group.alt" class="slide-image" />
            <span class="mt-2 text-center room-caption">
              {{ group.roomName }}
            </span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <v-dialog v-model="dialog" overlay max-width="900px">
      <v-card class="style_dialog">
        <!-- แสดงชื่อชั้น -->

        <v-card-text>
          <!-- ปุ่มเลือกห้อง (แสดงเฉพาะเมื่อมีห้องจริงๆ) -->
          <div v-if="selectedGroup?.rooms" class="d-flex justify-center mb-4">
            <v-btn
              v-for="(room, index) in selectedGroup.rooms"
              :key="index"
              class="ma-2"
              @click="selectRoom(room)"
              :class="{
                'selected-room':
                  selectedRoom && selectedRoom.roomName === room.roomName,
              }"
            >
              {{ index + 1 }}
            </v-btn>
          </div>

          <!-- ข้อมูลห้องที่เลือก -->
          <div v-if="selectedRoom" class="text-center">
            <h2>{{ selectedRoom.roomName }}</h2>
            <p>
              ที่นั่ง {{ selectedRoom.maxcapacity }} -
              {{ selectedRoom.capacity }} คน
            </p>
            <p>รับกุญแจชั้น {{ selectedRoom.key || "-" }}</p>
            <img
              :src="selectedRoom.src || ''"
              :alt="selectedRoom.caption || 'ไม่มีภาพ'"
              class="dialog-image mx-auto"
            />
          </div>
          <div v-else class="text-center">
            <p>กรุณาเลือกห้อง</p>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
  <Footer_page />
</template>

<script lang="ts">
import { ref } from "vue";
import { useRoomStore } from "@/stores/roomStore";
import { onMounted } from "vue";
import lib from "@/assets/lib.png";

interface Room {
  roomName: string;
  floorNumber: number;
  capacity: number;
  maxcapacity: number;
  maxHours: number;
  status: string;
  src: 'lib';
  alt: string;
  caption?: string;
  key?: string;
}

interface GroupedRoom {
  floorNumber: number;
  rooms: Room[];
}

const selectedRoom = ref<any>(null);

export default {
  name: "SlideGroupWithStaticImages",

  data() {
    return {
      dialog: false,
      selectedGroup: { rooms: [] as Room[] },
      selectedRoom: null as Room | null,
      lib
    };
  },
  setup() {
    const roomStore = useRoomStore();
    const groupedByType = ref<any>({});

    onMounted(async () => {
      try {
        const rooms = await roomStore.getAllRooms();

        const roomTypeMap: { [key: string]: any[] } = {};

        rooms.data.forEach((room: any) => {
          const type = room.room_Type;
          const floorId = room.floor.floorId;

          if (!roomTypeMap[type]) {
            roomTypeMap[type] = [];
          }

          if (
            type === "Group study" &&
            (floorId === 2 || floorId === 3 || floorId === 4)
          ) {
            roomTypeMap[type].push({
              roomName: room.room_Name,
              floorNumber: room.floor.floor_Number,
              capacity: room.capacity,
              maxcapacity: room.room_Minimum,
              maxHours: room.max_hours,
              status: room.room_Status,
            });
          }

          if (type === "Entertain" && floorId === 5) {
            roomTypeMap[type].push({
              roomName: room.room_Name,
              floorNumber: room.floor.floor_Number,
              capacity: room.capacity,
              maxcapacity: room.room_Minimum,
              maxHours: room.max_hours,
              status: room.room_Status,
            });
          }

          if (
            type === "Meeting" &&
            (floorId === 1 || floorId === 4 || floorId === 5 || floorId === 6)
          ) {
            roomTypeMap[type].push({
              roomName: room.room_Name,
              floorNumber: room.floor.floor_Number,
              capacity: room.capacity,
              maxcapacity: room.room_Minimum,
              maxHours: room.max_hours,
              status: room.room_Status,
            });
          }
        });

        if (roomTypeMap["Group study"]) {
          roomTypeMap["Group study"].sort(
            (a, b) => a.floorNumber - b.floorNumber
          );
        }

        groupedByType.value = roomTypeMap;
        console.log("📌 ห้องแยกตามประเภท:", groupedByType.value);
      } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    });

    return {
      groupedByType,
    };
  },

  computed: {
    groupedStudyRooms() {
      const roomMap = new Map();

      this.groupedByType["Group study"]?.forEach((room: any) => {
        if (!roomMap.has(room.floorNumber)) {
          roomMap.set(room.floorNumber, []);
        }
        roomMap.get(room.floorNumber).push(room);
      });

      const floors = Array.from(roomMap.keys());

      floors.sort((a, b) => a - b);

      return floors.map((floorNumber) => {
        return {
          floorNumber,
          rooms: roomMap.get(floorNumber) || [],
        };
      });
    },
    EntertainRooms() {
      const roomMap = new Map();

      this.groupedByType["Entertain"]?.forEach((room: any) => {
        let mainRoomName = "";

        if (room.roomName.includes("LIBRA OKE")) {
          mainRoomName = "LIBRA OKE";
        } else if (room.roomName === "Mini theater") {
          mainRoomName = "Mini theater";
        } else if (room.roomName.includes("STV")) {
          mainRoomName = "ห้องศึกษากลุ่มมัลติมีเดีย STV";
        }

        if (room.floorNumber) {
          if (!roomMap.has(mainRoomName)) {
            roomMap.set(mainRoomName, []);
          }

          roomMap.get(mainRoomName).push(room);
        }
      });

      const mainRoomNames = Array.from(roomMap.keys());
      mainRoomNames.sort();

      return mainRoomNames.map((roomName) => {
        return {
          roomName,
          rooms: roomMap.get(roomName) || [],
        };
      });
    },
    MeetingRooms() {
      const roomMap = new Map();

      this.groupedByType["Meeting"]?.forEach((room: any) => {
        let mainRoomName = "";

        if (room.roomName.includes("ห้อง 201")) {
          mainRoomName = "ห้อง 201";
        } else if (room.roomName.includes("Lecture's room")) {
          mainRoomName = "Lecture's room";
        } else if (room.roomName.includes("640 Smart Board")) {
          mainRoomName = "640 Smart Board";
        } else if (room.roomName.includes("Mini Studio")) {
          mainRoomName = "Mini Studio";
        } else if (room.roomName.includes("CYBER ZONE")) {
          mainRoomName = "CYBER ZONE";
        } else if (room.roomName.includes("Live for Life")) {
          mainRoomName = "Live for Life";
        } else if (room.roomName.includes("ห้อง")) {
          mainRoomName = "ห้อง";
        }

        if (room.floorNumber) {
          if (!roomMap.has(mainRoomName)) {
            roomMap.set(mainRoomName, []);
          }

          roomMap.get(mainRoomName).push(room);
        }
      });

      const mainRoomNames = Array.from(roomMap.keys());
      mainRoomNames.sort();

      return mainRoomNames.map((roomName) => {
        return {
          roomName,
          rooms: roomMap.get(roomName) || [],
        };
      });
    },
  },

  methods: {
    openDialog(group: any) {
      this.selectedGroup = group || { roomName: "ไม่พบข้อมูลห้อง", rooms: [] };
      this.dialog = true;

      if (this.selectedGroup.rooms && this.selectedGroup.rooms.length > 0) {
        this.selectedRoom = this.selectedGroup.rooms[0];
      }
    },
    selectRoom(room: any) {
      this.selectedRoom = room || null;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.head-title {
  font-weight: 600;
  font-size: 24px;
}

.head1-title {
  font-weight: 600;
  font-size: 20px;
}

.mg-arrow {
  margin-left: 50px;
}

.regular-study-title {
  font-weight: 400;
  font-size: 16px;
  margin-left: 355px;
  margin-top: 8px;
}

.regular-entertain-title {
  font-weight: 400;
  font-size: 16px;
  margin-left: 447px;
  margin-top: 8px;
}

.regular-meeting-title {
  font-weight: 400;
  font-size: 16px;
  margin-left: 395px;
  margin-top: 8px;
}

.room-caption {
  font-weight: 500;
  font-size: 16px;
}

.slide-image {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.slide-image:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.text-center {
  text-align: center;
}

.text-bold {
  font-weight: 600;
}

.mt-2 {
  margin-top: 10px;
}

.v-slide-group__controls {
  z-index: 10;
}

.back-ground {
  background-color: #f9f3ea;
  /* พื้นหลังสีหลัก */
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.ms-kob {
  margin-top: -615px;
}

.align-center {
  text-align: center;
}

.regularstu-line {
  cursor: pointer;
  text-decoration: none;
  color: #493628;
  transition: text-decoration 0.2s ease-in-out;
  position: relative;
  z-index: 10;
}

.icon-gif {
  width: 70px;
  height: 70px;
  margin-top: 10px;
}

.study_box {
  background-color: #ead8c0;
  border-radius: 16px;
  max-width: 800px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
}

.entertain_box {
  background-color: #ead8c0;
  border-radius: 16px;
  max-width: 800px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
}

.meeting_box {
  background-color: #ead8c0;
  border-radius: 16px;
  max-width: 800px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
}

.style_dialog {
  background-color: #fff;
  max-width: 900px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
}

.mg-textdialogs {
  margin-left: 50px;
}

.mg-textdialoge {
  margin-right: 50px;
}

.mg-topdialog {
  margin-top: 50px;
}

.mg-bottomdialog {
  margin-bottom: 10px;
}

.selected-room {
  background-color: #493628;
  color: white;
}

/* ipad */

@media (max-width: 1024px) {
  .head-title {
    font-weight: 600;
    font-size: 20px;
  }

  .head1-title {
    font-weight: 600;
    font-size: 20px;
    margin-left: 40px;
  }

  .mg-leftimage {
    margin-left: 100px;
  }

  .regular-study-title {
    font-weight: 400;
    font-size: 16px;
    margin-left: 255px;
    margin-top: 8px;
  }

  .regular-entertain-title {
    font-weight: 400;
    font-size: 16px;
    margin-left: 347px;
    margin-top: 8px;
  }

  .regular-meeting-title {
    font-weight: 400;
    font-size: 16px;
    margin-left: 295px;
    margin-top: 8px;
  }

  .room-caption {
    font-weight: 500;
    font-size: 13px;
  }

  .slide-image {
    width: 170px;
    height: 170px;
    border-radius: 10px;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
  }

  .ms-kob {
    margin-top: -900px;
  }

  .mg-arrow {
    margin-left: 1px;
  }

  .mg-arrowipad {
    margin-left: 85px;
  }

  .dialog-image {
    width: 300px;
    height: 300px;
    margin: auto;
  }

  .icon-gif {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }

  .text-left {
    font-size: 16px;
  }

  .mg-textdialogs {
    margin-left: 0px;
  }

  .mg-textdialoge {
    margin-right: 0px;
  }

  .mg-topdialog {
    margin-top: 20px;
  }

  .mg-bottomdialog {
    margin-bottom: 10px;
  }
}

/* phone */
@media (max-width: 768px) {
  .head-title {
    font-weight: 600;
    font-size: 20px;
  }

  .head1-title {
    font-weight: 600;
    font-size: 14px;
    margin-left: -40px;
  }

  .regular-study-title {
    font-weight: 400;
    font-size: 14px;
    margin-left: 40px;
    margin-top: 5px;
  }

  .regular-entertain-title {
    font-weight: 400;
    font-size: 14px;
    margin-left: 123px;
    margin-top: 5px;
  }

  .regular-meeting-title {
    font-weight: 400;
    font-size: 14px;
    margin-left: 68px;
    margin-top: 5px;
  }

  .room-caption {
    font-weight: 500;
    font-size: 13px;
  }

  .slide-image {
    width: 170px;
    height: 170px;
    border-radius: 10px;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
  }

  .ms-kob {
    margin-top: -550px;
  }

  .mg-arrow {
    margin-left: 1px;
  }

  .dialog-image {
    width: 170px;
    height: 170px;
    margin: auto;
    padding: 10px;
  }

  .icon-gif {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }

  .text-left {
    font-size: 11px;
  }

  .mg-textdialogs {
    margin-left: 0px;
  }

  .mg-textdialoge {
    margin-right: 0px;
  }

  .mg-topdialog {
    margin-top: 20px;
  }

  .mg-bottomdialog {
    margin-bottom: 10px;
  }
}
</style>
