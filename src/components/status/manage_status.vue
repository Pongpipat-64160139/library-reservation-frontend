<template>
  <Header_page />
  <v-container fluid class="back-ground ms-kob">
    <!-- Breadcrumbs -->
    <v-breadcrumbs :items="items" divider=">" class="head-title mg-table">
      <template #item="{ item }" class="head-title">
        <router-link
          v-if="!item.disabled && item.href"
          :to="item.href"
          class="breadcrumb-link head-title"
        >
          {{ item.title }}
        </router-link>

        <span v-else class="breadcrumb-disabled head-title">
          {{ item.title }}
        </span>
      </template>
    </v-breadcrumbs>

    <!-- Tabs for Floors -->
    <v-tabs v-model="selectedFloor" background-color="#cdbba7">
      <v-tab
        v-for="floor in [2, 3, 4, 5, 6, 7]"
        :key="floor"
        class="text-col"
        :value="floor"
      >
        ชั้น {{ floor }}
      </v-tab>
    </v-tabs>

    <!-- Data Table -->
    <v-data-table
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="filteredData"
      style="background-color: #cdbba7"
      class="rd-test text-col"
    >
      <template #item="{ item, index }">
        <tr :class="index % 2 === 0 ? 'row-even' : 'row-odd'">
          <td class="text-col">
            {{ index + 1 }}
          </td>
          <td class="text-col">
            {{ item.details }}
          </td>
          <td class="text-col">
            {{ item.floorNumber }}
          </td>
          <td class="text-col">
            {{ item.roomName }}
          </td>
          <td class="text-col">
            {{ item.startDate }}
          </td>
          <td class="text-col">{{ item.startTime }} - {{ item.endTime }}</td>
          <td class="align-center justify-center">
            <v-select
              :model-value="item.status"
              :items="['รอ', 'อนุมัติ', 'ยกเลิก']"
              variant="outlined"
              density="compact"
              class="cl-dropd mt-6"
              @update:model-value="(val) => handleStatusChange(item, val)"
            />
          </td>
          <td class="text-col">
            {{ getDetailMessage(item.status, item) }}
          </td>

          <td>
            <v-btn
              color="#F5EDED"
              icon="mdi-magnify"
              width="40"
              height="40"
              class="rd-btndetail ms-1"
              @click="showDialog(item)"
            />
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>

  <v-dialog v-model="dialog" max-width="620px" max-height="600px">
    <v-card class="rd-dialog">
      <span class="head-detailuser">
        <div class="head-detail">
          <strong>ผู้ใช้</strong>
        </div>
      </span>

      <span class="head-detailname">
        <div class="head-detail">
          <strong>ชื่อ</strong>
        </div>
      </span>

      <span class="d-flex head-detaildate1">
        <v-row>
          <v-col cols="6">
            <div class="head-detail">
              <strong>วันที่เริ่ม</strong> {{ selectedItem?.startDate }}
            </div>
          </v-col>
          <v-col>
            <div class="head-detail wth-btnedittime d-flex ms-10">
              <strong class="me-1">เวลาเริ่ม</strong>
              <v-select
                v-if="editMode"
                v-model="editedStartTime"
                :items="startTimeOptions"
                variant="outlined"
                density="compact"
                class="time-select"
              />
              <span v-else>{{ selectedItem?.startTime }}</span>
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex head-detaildate2">
        <v-row>
          <v-col cols="6">
            <div class="head-detail">
              <strong>วันที่จบ</strong> {{ selectedItem?.endDate }}
            </div>
          </v-col>
          <v-col>
            <div class="head-detail d-flex wth-btnedittime ms-10">
              <strong class="me-1">เวลาจบ</strong>
              <v-select
                v-if="editMode"
                v-model="editedEndTime"
                :items="endTimeOptions"
                density="compact"
                variant="outlined"
                class="time-select"
              />
              <span v-else>{{ selectedItem?.endTime }}</span>
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex head-detailfloor">
        <v-row>
          <v-col cols="6">
            <div class="head-detail wth-btnedit">
              <strong class="me-1">ชั้น</strong>
              <v-select
                v-if="editMode"
                v-model="editedFloor"
                :items="Object.keys(floorRooms)"
                density="compact"
                variant="outlined"
                @update:model-value="updateAvailableRooms"
              />
              <span v-else>{{ selectedItem?.floorNumber }}</span>
            </div>
          </v-col>
          <v-col>
            <div class="head-detail wth-btnedit ms-10">
              <strong class="me-1">ห้อง</strong>
              <v-select
                v-if="editMode"
                v-model="editedRoom"
                :items="availableRooms"
                density="compact"
                variant="outlined"
              />
              <span v-else>{{ selectedItem?.roomName }}</span>
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex head-detailrepeat">
        <v-row>
          <v-col cols="6">
            <div class="head-detail"><strong>ทำซ้ำ</strong> ไม่</div>
          </v-col>
          <v-col>
            <div class="head-detail ms-10">
              <strong>สิ้นสุด</strong> {{ selectedItem?.date }}
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex head-detail ms-6">
        <div class="head-detail">
          <strong>รายละเอียด</strong> {{ selectedItem?.details }}
        </div>
      </span>

      <span
        v-if="selectedItem?.status === 'ยกเลิก'"
        class="d-flex head-detail ms-6"
      >
        <div class="head-detail">
          <strong>เหตุผลการยกเลิก</strong>
          {{ selectedItem?.cancelReason || "ยกเลิกการจอง" }}
        </div>
      </span>

      <span v-if="selectedItem?.status === 'ยกเลิก'" class="d-flex mg-top ms-6">
        <div class="mg-top">
          <strong>ยกเลิกโดย</strong>
        </div>
      </span>

      <span v-if="selectedItem?.status === 'ยกเลิก'" class="d-flex mg-top ms-6">
        <div class="mg-top">
          <strong>เวลาที่ยกเลิก</strong>
          {{ selectedItem?.cancelTime || "ไม่มีข้อมูล" }}
        </div>
      </span>

      <v-card-text />
      <v-card-actions class="d-flex justify-center mb-8">
        <v-btn
          class="rd-btncanceldia"
          :style="{
            backgroundColor: editMode ? '#ea8a8a' : '#dad0c2',
            color: '#493628',
          }"
          @click="handleCancel"
        >
          {{ editMode ? "ยกเลิก" : "ปิด" }}
        </v-btn>

        <v-btn
          class="rd-btnclose"
          :style="{
            backgroundColor: editMode ? '#B5CFB7' : '#f0c8a4',
            color: '#493628',
          }"
          @click="toggleEditMode"
        >
          {{ editMode ? "บันทึก" : "แก้ไข" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="statusChangeDialog" max-width="500px">
    <v-card>
      <v-card-text>
        <div class="text-center mt-5">
          ต้องการเปลี่ยนสถานะเป็น "{{ newStatus }}" ใช่หรือไม่ ?
        </div>

        <v-text-field
          v-if="newStatus === 'ยกเลิก'"
          v-model="cancelReason"
          label="กรอกเหตุผลในการยกเลิก"
          variant="outlined"
          :rules="[(v) => !!v || '']"
          class="mt-5"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-center mt-2">
        <v-btn class="rd-btncancel" text @click="clearCancelReason">
          ยกเลิก
        </v-btn>
        <v-btn
          class="rd-btnconfirm"
          :disabled="newStatus === 'ยกเลิก' && !cancelReason"
          @click="confirmStatusChange"
        >
          ยืนยัน
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { useRoomStore } from "@/stores/roomStore";
import { useNormalRoomBookStore } from "@/stores/nrbStore";

const roomStore = useRoomStore(); // เชื่อม store ห้อง
const nrbStore = useNormalRoomBookStore(); // เชื่อม store การจอง

// 1. นิยาม Type ของข้อมูล
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

// 2. เปลี่ยน `bookingDetails` ให้รองรับ `BookingDetail[]`
const bookingDetails = ref<BookingDetail[]>([]);

// 3. ใน `onMounted` เพิ่มข้อมูลที่มีโครงสร้างตรงกับ `BookingDetail`
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
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const sortBy = ref([
  { key: "index", order: "asc" },
  { key: "name", order: "asc" },
  { key: "floor", order: "asc" },
  { key: "room", order: "asc" },
  { key: "date", order: "asc" },
  { key: "time", order: "asc" },
  { key: "status", order: "asc" },
]);

const headers = ref([
  { title: "ลำดับ", align: "start", key: "index" },
  { title: "ชื่อ", key: "name" },
  { title: "ชั้น", key: "floor" },
  { title: "ห้อง", key: "room" },
  { title: "วันที่", key: "date" },
  { title: "เวลา", key: "time" },
  { title: "สถานะ", key: "status" },
  { title: "รายละเอียด", key: "details" },
  { title: "เพิ่มเติม", key: "more" },
]);

const getDetailMessage = (status: string, currentItem: any) => {
  if (status === "รอ") {
    return "รอดำเนินการ";
  } else if (status === "อนุมัติ") {
    return "กำลังใช้งาน";
  } else if (status === "ยกเลิก") {
    return "ยกเลิกการจอง";
  }

  return "-";
};

const formatThaiDate = (dateString) => {
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

const items = [
  { title: "อนุมัติสถานะการจอง", disabled: true, href: "/" },
  { title: "สถานะห้อง", disabled: false, href: "/manage_room" },
];

const selectedFloor = ref(2); // ค่าเริ่มต้นให้ตรงกับชั้นแรกที่มีในแท็บ

const filteredData = computed(() => {
  return bookingDetails.value.filter(
    (item) => parseInt(item.floorNumber) === selectedFloor.value
  );
});

const dialog = ref(false);
const selectedItem = ref<any>(null);
const editMode = ref(false);

// Add these refs after other ref declarations
const statusChangeDialog = ref(false);
const newStatus = ref("");
const itemToUpdate = ref<any>(null);
const cancelReason = ref("");

const clearCancelReason = () => {
  cancelReason.value = "";
  statusChangeDialog.value = false;
};

const handleStatusChange = (item: any, newStatusValue: string) => {
  itemToUpdate.value = item;
  newStatus.value = newStatusValue;
  statusChangeDialog.value = true;
  // Revert the v-select value until confirmed
  item.status = item.status;
};

const confirmStatusChange = () => {
  if (itemToUpdate.value) {
    if (newStatus.value === "ยกเลิก" && !cancelReason.value.trim()) {
      alert("กรุณากรอกเหตุผลในการยกเลิก");
      return;
    }
    itemToUpdate.value.status = newStatus.value;
    itemToUpdate.value.cancelReason = cancelReason.value;
    if (newStatus.value === "ยกเลิก") {
      const now = new Date();
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      itemToUpdate.value.cancelTime = formattedTime; // เก็บเวลา
    }
  }
  statusChangeDialog.value = false;
  cancelReason.value = ""; // Reset reason
};

const editedFloor = ref<number>(0);
const editedRoom = ref("");
const editedStartTime = ref("");
const editedEndTime = ref("");

const startTimeOptions = ref([
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
]);

const endTimeOptions = ref([
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
]);

const availableRooms = computed(() => {
  return floorRooms[editedFloor.value as keyof typeof floorRooms] || [];
});

const updateAvailableRooms = () => {
  const rooms = floorRooms[editedFloor.value as keyof typeof floorRooms];
  editedRoom.value = rooms ? rooms[0] : "";
};

watch(
  () => editedFloor.value,
  (newFloor) => {
    const rooms = floorRooms[newFloor as keyof typeof floorRooms];
    editedRoom.value = rooms ? rooms[0] : "";
  }
);

const floorRooms = {
  2: ["201 (20-50)"],
  3: [
    "ศึกษากลุ่ม 1 (3-5)",
    "ศึกษากลุ่ม 2 (3-5)",
    "ศึกษากลุ่ม 3 (3-5)",
    "ศึกษากลุ่ม 4 (3-5)",
    "ศึกษากลุ่ม 5 (3-5)",
    "ศึกษากลุ่ม 6 (3-5)",
  ],
  4: [
    "ศึกษากลุ่ม 1 (3-5)",
    "ศึกษากลุ่ม 2 (3-5)",
    "ศึกษากลุ่ม 3 (3-5)",
    "ศึกษากลุ่ม 4 (3-5)",
    "ศึกษากลุ่ม 5 (3-5)",
  ],
  5: [
    "ศึกษากลุ่ม 1 (3-5)",
    "ศึกษากลุ่ม 2 (3-5)",
    "ศึกษากลุ่ม 3 (3-5)",
    "ศึกษากลุ่ม 4 (3-5)",
    "ศึกษากลุ่ม 5 (3-5)",
    "Lecturer's Room 1 (3-5)",
    "Lecturer's Room 2 (3-5)",
    "Lecturer's Room 3 (3-5)",
  ],
  6: [
    "STV 1 (3-5)",
    "STV 2 (3-5)",
    "STV 3 (3-5)",
    "STV 4 (3-5)",
    "STV 5 (3-5)",
    "STV 6 (3-5)",
    "STV 7 (3-5)",
    "STV 8 (3-5)",
    "STV 9 (3-5)",
    "LIBRA OKE 1 (3-5)",
    "LIBRA OKE 2 (3-5)",
    "MINI THEATER (10-30)",
    "604 Smart Board (8-10)",
    "Mini Studio",
    "Cyber Zone 1 (ไม่เกิน 70)",
    "Cyber Zone 2 (ไม่เกิน 30)",
    "Live for Life (มากกว่า 3)",
  ],
  7: ["706", "707"],
};

const toggleEditMode = () => {
  if (editMode.value) {
    // ตรวจสอบความถูกต้องของเวลา
    const startIndex = startTimeOptions.value.indexOf(editedStartTime.value);
    const endIndex = endTimeOptions.value.indexOf(editedEndTime.value);

    if (startIndex >= endIndex) {
      alert("เวลาเริ่มต้องน้อยกว่าเวลาจบ");
      return;
    }

    // บันทึกการแก้ไขลงใน `bookingDetails`
    const index = bookingDetails.value.findIndex(
      (item) => item.numb === selectedItem.value.numb
    );

    if (index !== -1) {
      bookingDetails.value[index] = {
        ...bookingDetails.value[index],
        startTime: editedStartTime.value,
        endTime: editedEndTime.value,
        floorNumber: editedFloor.value.toString(),
        roomName: editedRoom.value,
      };
    }

    editMode.value = false;
  } else {
    editMode.value = true;
  }
};

const showDialog = (item: BookingDetail) => {
  selectedItem.value = { ...item };
  editedFloor.value = parseInt(item.floorNumber); // แปลง `floorNumber` เป็นตัวเลข
  editedRoom.value = item.roomName;
  editedStartTime.value = item.startTime;
  editedEndTime.value = item.endTime;
  dialog.value = true;
  editMode.value = false;
};

const handleCancel = () => {
  if (editMode.value) {
    editedFloor.value = selectedItem.value.floor;
    editedRoom.value = selectedItem.value.room;
    editMode.value = false;
  } else {
    dialog.value = false;
  }
};

const formatTime = (time: string): string => {
  return time.slice(0, 5); // ตัดเอาเฉพาะ 5 ตัวแรก (HH:mm)
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.cl-dropd {
  max-width: 110px;
  max-height: 62px;
}

.head-title {
  font-weight: 600;
  font-size: 24px;
  margin-top: -1px;
}

.mg-table {
  margin-bottom: 22px;
}

.back-ground {
  background-color: #f9f3ea;
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.ms-kob {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  margin-top: 100px;
}

.breadcrumb-link {
  text-decoration: none;
  color: #493628;
  font-weight: 400;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-disabled {
  color: #493628;
  font-weight: 600;
}

.row-even {
  background-color: #f2efea;
}

.row-odd {
  background-color: #e6dfd5;
}

.rd-icon-magnify {
  cursor: pointer;
  color: #493628;
}

th {
  background-color: #cdbba7;
  font-weight: bold;
  font-size: 16px;
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

.mg-top {
  font-weight: 300;
  font-size: 16px;
  margin-top: 5px;
  margin-left: 25px;
}

.head-detail {
  font-weight: 300;
  font-size: 16px;
  margin-top: 20px;
  margin-left: 25px;
}

.wth-btnedit {
  width: 200px;
}

.wth-btnedittime {
  width: 170px;
}

.time-select {
  margin-top: -5px;
}

.back-ground {
  background-color: #f9f3ea;
}

.rd-btndetail {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #493628;
}

.custom-checkbox {
  color: #493628;
  font-size: 25px;
  margin-left: 13px;
}

.rd-dialog {
  background-color: #f5eded;
  border-radius: 20px;
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

.rd-btncanceldia {
  font-weight: 400;
  font-size: 16px;
  color: #493628;
  background-color: #dad0c2;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  margin-right: 30px;
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
  background-color: #f0c8a4;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
}

.rd-test {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #cdbba7;
  /* กำหนดกรอบของตาราง */
  border-collapse: collapse;
  /* ให้กรอบรวมกัน */
}

.text-col {
  font-weight: 400;
  font-size: 18px;
}
</style>
