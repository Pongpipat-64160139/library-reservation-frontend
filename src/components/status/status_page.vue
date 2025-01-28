<template>
  <Header_page />

  <v-container fluid class="back-ground ms-kob">
    <h1 class="pt-5 head-title text-center pb-10">สถานะการจอง</h1>

    <!-- Tabs for floors -->
    <v-tabs v-model="selectedFloor" background-color="#cdbba7">
      <v-tab
        v-for="floor in availableFloors"
        :key="floor"
        class="tab-text"
        :value="floor"
      >
        ชั้น {{ floor }}
      </v-tab>
    </v-tabs>

    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="filteredData"
      style="background-color: #cdbba7"
      class="rd-test"
    >
      <template #item="{ item, index }">
        <tr :class="index % 2 === 0 ? 'row-even' : 'row-odd'">
          <td>{{ index + 1 }}</td>
          <td>{{ item.firstName }} - {{ item.lastName }}</td>
          <td>{{ item.floorNumber }}</td>
          <td>{{ item.roomName }}</td>
          <td>{{ item.startDate }}</td>
          <td>{{ item.startTime }} - {{ item.endTime }}</td>
          <td>{{ item.status }}</td>
          <td>
            <v-btn
              color="#F5EDED"
              icon="mdi-magnify"
              width="40"
              height="40"
              class="rd-btndetail"
              @click="showDialog(item)"
            />
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>

  <!-- Dialog รายละเอียดการจองห้อง -->

  <v-dialog v-model="dialog" max-width="600px">
    <v-card class="rd-dialog">
      <span class="head-detailuser">
        <div class="head-detail"><strong>ผู้ใช้</strong> -</div>
      </span>

      <span class="head-detailname">
        <div class="head-detail"><strong>ชื่อ</strong> -</div>
      </span>

      <span class="d-flex head-detaildate1">
        <v-row>
          <v-col cols="5">
            <div class="head-detail">
              <strong>วันที่เริ่ม</strong> {{ selectedItem?.startDate }}
            </div>
          </v-col>
          <v-col>
            <div class="head-detail ms-10">
              <strong>เวลา</strong> {{ selectedItem?.startTime }}
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex head-detaildate2">
        <v-row>
          <v-col cols="5">
            <div class="head-detail">
              <strong>วันที่จบ</strong> {{ selectedItem?.endDate }}
            </div>
          </v-col>
          <v-col>
            <div class="head-detail ms-10">
              <strong>เวลา</strong> {{ selectedItem?.endTime }}
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex head-detailfloor">
        <v-row>
          <v-col cols="5">
            <div class="head-detail">
              <strong>ชั้น</strong> {{ selectedItem?.floorNumber }}
            </div>
          </v-col>
          <v-col>
            <div class="head-detail ms-10">
              <strong>ห้อง</strong> {{ selectedItem?.roomName }}
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex head-detail">
        <div class="head-detail">
          <strong>รายละเอียด</strong> {{ selectedItem?.details }}
        </div>
      </span>

      <span v-if="selectedItem?.cancelReason" class="d-flex head-detail">
        <div class="head-detail">
          <strong>เหตุผลการยกเลิก</strong> {{ selectedItem.cancelReason }}
        </div>
      </span>

      <v-card-text />
      <v-card-actions class="d-flex justify-center mb-8">
        <v-btn
          class="rd-btncanceldia"
          text="ยกเลิกจอง"
          :disabled="
            selectedItem?.status === 'ยกเลิก' ||
            selectedItem?.status === 'อนุมัติ'
          "
          @click="reasonDialog = true"
        >
          ยกเลิกจอง
        </v-btn>

        <v-btn class="rd-btnclose" text="ปิด" @click="dialog = false">
          ปิด
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog กรอกเหตุผลในการยกเลิกจองห้อง -->
  <v-dialog v-model="reasonDialog" max-width="400px">
    <v-card>
      <v-card-title class="text-center mt-5">
        <span>ต้องการ "ยกเลิกการจองห้อง" ใช่หรือไม่ ? </span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="cancelReason"
          label="กรอกเหตุผลในการยกเลิก"
          variant="outlined"
          :rules="[(v) => !!v || '']"
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="d-flex justify-center mt-2">
        <v-btn class="rd-btncancel" @click="() => (reasonDialog = false)"
          >ยกเลิก</v-btn
        >
        <v-btn class="rd-btnconfirm" @click="confirmCancel"> ตกลง </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar
    v-model="snackbar"
    color="#b5cfb7"
    timeout="3000"
    top
    class="text-center"
  >
    ยกเลิกการจองห้องสำเร็จ !
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRoomStore } from "@/stores/roomStore";
import { useNormalRoomBookStore } from "@/stores/nrbStore";

interface BookingDetail {
  numb: number;
  floorNumber: string;
  roomName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: string;
  details: string;
  cancelReason: string;
  cancelTime?: string; // ฟิลด์สำหรับเก็บเวลายกเลิก
}

// Store
const roomStore = useRoomStore();
const nrbStore = useNormalRoomBookStore();

// State
const bookingDetails = ref<BookingDetail[]>([]);
const dialog = ref(false);
const selectedItem = ref<BookingDetail | null>(null);
const reasonDialog = ref(false);
const cancelReason = ref("");
const snackbar = ref(false);
const selectedFloor = ref(2); // ค่าเริ่มต้นของแท็บ (2)
const availableFloors = ref<number[]>([2, 3, 4, 5, 6, 7]); // รายการชั้นที่มี

// ฟังก์ชันช่วย
const formatTime = (time: string): string => {
  return time.slice(0, 5);
};

const formatThaiDate = (dateString: string | number | Date) => {
  const dateObj = new Date(dateString);
  const days = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const day = days[dateObj.getDay()];
  const date = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear() + 543; // แปลงเป็น พ.ศ.

  return `${day} ${date} ${month} ${year}`;
};

// Data Table Headers
const headers = [
  { title: "ลำดับ", align: "start", key: "numb" },
  { title: "ชื่อ", key: "details" },
  { title: "ชั้น", key: "floorNumber" },
  { title: "ห้อง", key: "roomName" },
  { title: "วันที่", key: "startDate" },
  { title: "เวลา", key: "startTime" },
  { title: "สถานะ", key: "status" },
];

// Computed Data
const filteredData = computed(() => {
  return bookingDetails.value.filter(
    (item) => parseInt(item.floorNumber) === selectedFloor.value
  );
});

// Lifecycle Hook
onMounted(async () => {
  try {
    const reserveResponse = await nrbStore.getAllReserve();
    if (reserveResponse.data && reserveResponse.data.length > 0) {
      for (const booking of reserveResponse.data) {
        const roomId = booking.roomBooking?.roomId;
        if (roomId) {
          const roomResponse = await roomStore.getRoomByID(roomId);
          bookingDetails.value.push({
            numb: booking.nrbId,
            floorNumber: roomResponse.floor?.floor_Number || "ไม่มีข้อมูลชั้น",
            roomName: roomResponse.room_Name || "ไม่มีชื่อห้อง",
            startDate: formatThaiDate(booking.startDate),
            startTime: formatTime(booking.startTime),
            endDate: formatThaiDate(booking.endDate),
            endTime: formatTime(booking.endTime),
            status: booking.reseve_status || "ไม่มีสถานะ",
            details: booking.details || "ไม่มีรายละเอียด",
            cancelReason: booking.reason || "",
          });
        }
      }
      bookingDetails.value.sort((a, b) => b.numb - a.numb);
      // สร้างรายการชั้นอัตโนมัติ
      const floors = Array.from(
        new Set(bookingDetails.value.map((item) => parseInt(item.floorNumber)))
      ).sort((a, b) => a - b);
      availableFloors.value = floors;
      if (!floors.includes(selectedFloor.value)) {
        selectedFloor.value = floors[0];
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// ฟังก์ชันแสดง Dialog
const showDialog = (item: BookingDetail) => {
  selectedItem.value = item;
  dialog.value = true;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.row-even {
  background-color: #f2efea;
}

.row-odd {
  background-color: #e6dfd5;
}

.head-title {
  font-weight: 600;
  font-size: 24px;
}

th {
  background-color: #cdbba7;
  font-weight: bold;
  font-size: 16px;
}

.back-ground {
  background-color: #f9f3ea;
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.ms-kob {
  margin-top: -600px;
}

.head-detailuser {
  font-weight: 300;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 25px;
}

.head-detailname {
  font-weight: 300;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 25px;
}

.head-detaildate1 {
  font-weight: 300;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 25px;
}

.head-detaildate2 {
  font-weight: 300;
  font-size: 18px;
  margin-top: -10px;
  margin-left: 25px;
}

.head-detailfloor {
  font-weight: 300;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 25px;
}

.head-detailrepeat {
  font-weight: 300;
  font-size: 18px;
  margin-top: -10px;
  margin-left: 25px;
}

.head-detail {
  font-weight: 300;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 25px;
}
.back-ground {
  background-color: #f9f3ea;
}

.ms-kob {
  margin-top: -600px;
}

.rd-btndetail {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #493628;
}

.rd-dialog {
  background-color: #f5eded;
  border-radius: 20px;
}
.rd-btncanceldia {
  font-weight: 400;
  font-size: 16px;
  color: #493628;
  background-color: #ea8a8a;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  margin-right: 30px;
}

.rd-btncancel {
  font-weight: 400;
  font-size: 16px;
  color: #493628;
  background-color: #dad0c2;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  margin-right: 30px;
  margin-top: -40px;
}

.rd-btnconfirm {
  font-weight: 400;
  font-size: 16px;
  color: #493628;
  background-color: #b5cfb7;
  width: 100px;
  border-radius: 10px;
  margin-top: -40px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
}

.rd-btnclose {
  font-weight: 400;
  font-size: 16px;
  background-color: #dad0c2;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
}

.rd-test {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #cdbba7; /* กำหนดกรอบของตาราง */
  border-collapse: collapse; /* ให้กรอบรวมกัน */
}

.tab-text {
  font-weight: 400;
  font-size: 15px;
}
</style>
