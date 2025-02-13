<template>
  <Header_page />

  <v-container fluid class="back-ground mg-toppage">
    <h1 class="topic-text">สถานะการจอง</h1>

    <!-- Tabs for floors -->
    <v-tabs v-model="selectedFloor" background-color="#cdbba7">
      <v-tab
        v-for="floor in availableFloors"
        :key="floor"
        class="tabfloor-text"
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
      class="border-table"
    >
      <template #item="{ item, index }">
        <tr
          :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
          class="table-font"
        >
          <td>{{ index + 1 }}</td>
          <td>-</td>
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
              class="border-btndetail"
              @click="showDialog(item)"
            />
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>

  <!-- Dialog รายละเอียดการจองห้อง -->

  <v-dialog v-model="dialog" max-width="600px">
    <v-card class="border-dialog">
      <span class="user-text">
        <div class="headdialog-text"><strong>ผู้ใช้</strong> -</div>
      </span>

      <span class="name-text">
        <div class="headdialog-text"><strong>ชื่อ</strong> -</div>
      </span>

      <span class="d-flex startdate-text">
        <v-row>
          <v-col cols="7">
            <div class="headdialog-text">
              <strong>วันที่เริ่ม</strong> {{ selectedItem?.startDate }}
            </div>
          </v-col>
          <v-col>
            <div class="headdialog-text ms-10">
              <strong>เวลา</strong> {{ selectedItem?.startTime }}
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex enddate-text">
        <v-row>
          <v-col cols="7">
            <div class="headdialog-text">
              <strong>วันที่จบ</strong> {{ selectedItem?.endDate }}
            </div>
          </v-col>
          <v-col>
            <div class="headdialog-text ms-10">
              <strong>เวลา</strong> {{ selectedItem?.endTime }}
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex floor-text">
        <v-row>
          <v-col cols="7">
            <div class="headdialog-text">
              <strong>ชั้น</strong> {{ selectedItem?.floorNumber }}
            </div>
          </v-col>
          <v-col>
            <div class="headdialog-text ms-10">
              <strong>ห้อง</strong> {{ selectedItem?.roomName }}
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex headdialog-text">
        <div class="headdialog-text">
          <strong>รายละเอียด</strong> {{ selectedItem?.details }}
        </div>
      </span>

      <v-card-text />
      <v-card-actions class="d-flex justify-center mb-8">
        <v-btn
          class="border-btncanceldialog"
          text="ยกเลิกจอง"
          :disabled="
            selectedItem?.status === 'ยกเลิก' ||
            selectedItem?.status === 'อนุมัติ'
          "
          @click="cancelBooking(selectedItem)"
        >
          ยกเลิกจอง
        </v-btn>

        <v-btn class="border-btnclose" text="ปิด" @click="dialog = false">
          ปิด
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar
    v-model="snackbar"
    color="#b5cfb7"
    timeout="3000"
    top
    class="text-center mx-auto"
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
const cancelBooking = async (booking: BookingDetail | null) => {
  if (!booking) return;

  try {
    const cancelTime = getCurrentTime(); // เรียกใช้ฟังก์ชัน

    await nrbStore.cancelReseved(
      booking.numb,
      cancelReason.value || "ยกเลิกโดยผู้ใช้",
      "ยกเลิก",
      cancelTime
    );

    // อัปเดต UI
    booking.status = "ยกเลิก";
    booking.cancelReason = cancelReason.value || "ยกเลิกโดยผู้ใช้";
    booking.cancelTime = cancelTime;

    // แสดงข้อความแจ้งเตือน
    snackbar.value = true;

    // ปิด Dialog
    dialog.value = false;
    reasonDialog.value = false;
  } catch (error) {
    console.error("Error canceling booking:", error);
  }
};

const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

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

.mg-toppage {
  margin-top: -600px;
}

.back-ground {
  background-color: #f9f3ea;
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.back-ground {
  background-color: #f9f3ea;
}

.topic-text {
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 38px;
}

.row-even {
  background-color: #f2efea;
}

.row-odd {
  background-color: #e6dfd5;
}

.tabfloor-text {
  font-weight: 400;
  font-size: 17px;
}

.border-table {
  border-radius: 10px;
  border: 1px solid #cdbba7; /* กำหนดกรอบของตาราง */
  color: #493628;
  border-collapse: collapse; /* ให้กรอบรวมกัน */
  font-weight: 400;
  font-size: 18px;
}

tr {
  font-weight: 400;
  font-size: 17px;
}

.user-text {
  font-weight: 300;
  font-size: 18px;
  margin-top: 40px;
  margin-left: 25px;
}

.name-text {
  font-weight: 300;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 25px;
}

.startdate-text {
  font-weight: 300;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 25px;
}

.enddate-text {
  font-weight: 300;
  font-size: 18px;
  margin-top: -10px;
  margin-left: 25px;
}

.floor-text {
  font-weight: 300;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 25px;
}

.headdialog-text {
  font-weight: 300;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 25px;
}

.border-btndetail {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #493628;
}

.border-dialog {
  background-color: #f5eded;
  border-radius: 20px;
}
.border-btncanceldialog {
  font-weight: 400;
  font-size: 16px;
  color: #493628;
  background-color: #ea8a8a;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  margin-right: 30px;
}

.border-btncancel {
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

.border-btnclose {
  font-weight: 400;
  font-size: 16px;
  background-color: #dad0c2;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
}
</style>
