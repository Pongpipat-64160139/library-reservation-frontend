<template>
  <Header_page />
  <v-container fluid class="back-ground mg-toppage">
    <!-- Breadcrumbs -->
    <v-breadcrumbs :items="items" divider=">" class="mg-toptable">
      <!-- Manage Room -->
      <template #item="{ item }">
        <router-link
          v-if="!item.disabled && item.href"
          :to="item.href"
          class="breadcrumb-link"
        >
          {{ item.title }}
        </router-link>

        <!-- Manage Status -->
        <span v-else class="breadcrumb-disabled">
          {{ item.title }}
        </span>
      </template>
    </v-breadcrumbs>

    <!-- Tabs for Floors -->
    <v-tabs v-model="selectedFloor" background-color="#cdbba7">
      <v-tab
        v-for="floor in [2, 3, 4, 5, 6, 7]"
        :key="floor"
        class="tab-text"
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
      :sort-desc="[true]"
      style="background-color: #cdbba7"
      class="rd-datatable table-text"
    >
      <template #item="{ item, index }">
        <tr :class="index % 2 === 0 ? 'row-even' : 'row-odd'">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ userStore.currentUser?.firstname
            }}{{ userStore.currentUser?.lastname }}
          </td>
          <td>
            {{ item.floor_number }}
          </td>
          <td>
            {{ item.room_name }}
          </td>
          <td>
            {{ formatThaiDate(item.start_date) }}
          </td>
          <td>{{ item.start_time }} - {{ item.end_time }}</td>
          <td class="align-center justify-center">
            <v-select
              :model-value="item.reseve_status"
              :items="['รอ', 'อนุมัติ', 'ยกเลิก']"
              variant="outlined"
              density="compact"
              class="size-selectstatus"
              :disabled="
                item.reseve_status === 'อนุมัติ' ||
                item.reseve_status === 'ยกเลิก'
              "
              @update:model-value="
                (val) =>
                  handleStatusChange(item.reserved_Id, val, item.formReserved)
              "
            />
          </td>
          <td>
            <v-btn
              color="#F5EDED"
              icon="mdi-magnify"
              width="40"
              height="40"
              class="btn-diadetail"
              @click="showDialog(item)"
            />
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>

  <!-- Dialog Detail -->
  <v-dialog v-model="dialog" max-width="670px" max-height="600px">
    <v-card class="dialog-detail">
      <span class="text-userdetail">
        <div class="text-headdetail">
          <strong>ผู้ใช้</strong> {{ userStore.currentUser?.Username }}
        </div>
      </span>

      <span class="text-namedetail">
        <div class="text-headdetail">
          <strong>ชื่อ</strong> {{ userStore.currentUser?.firstname
          }}{{ userStore.currentUser?.lastname }}
        </div>
      </span>

      <span
        v-if="selectedItem?.floor_number"
        class="d-flex text-startdatedetail"
      >
        <v-row>
          <v-col cols="6">
            <div class="text-headdetail size-selectfloor d-flex">
              <strong class="me-1">ชั้น</strong>
              <v-select
                v-if="editMode"
                v-model="selectedFloorId"
                :items="floorOptions"
                item-title="floor_Number"
                item-value="floorId"
                variant="outlined"
                density="compact"
                class="mg-toptime"
                @update:model-value="updateAvailableRooms"
              />
              <span v-else>{{ selectedItem?.floor_number }}</span>
            </div>
          </v-col>
          <v-col>
            <div class="text-headdetail size-selectroom d-flex">
              <strong class="me-1">ห้อง</strong>
              <v-select
                v-if="editMode"
                v-model="selectedRoomId"
                :items="roomOptions"
                item-title="room_Name"
                item-value="roomId"
                variant="outlined"
                density="compact"
                class="mg-toptime"
                @update:model-value="
                  (val) => {
                    console.log('Selected room value:', val);
                    onRoomSelected(val);
                  }
                "
              />
              <span v-else>{{ selectedItem?.room_name }}</span>
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex text-startdatedetail">
        <v-row>
          <v-col cols="6">
            <div class="text-headdetail">
              <div v-if="selectedItem?.start_date">
                <strong>วันที่เริ่ม</strong>
                {{ formatThaiDate(selectedItem.start_date) }}
              </div>
            </div>
          </v-col>
          <v-col>
            <div class="text-headdetail size-selecttime d-flex">
              <strong class="me-1">เวลาเริ่ม</strong>
              <v-select
                v-if="editMode"
                v-model="editedStartTime"
                :items="startTimeOptions"
                variant="outlined"
                density="compact"
                class="mg-toptime"
              />
              <span v-else>{{ selectedItem?.start_time }}</span>
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex text-enddatedetail">
        <v-row>
          <v-col cols="6">
            <div class="text-headdetail">
              <div v-if="selectedItem?.end_date">
                <strong>วันที่เริ่ม</strong>
                {{ formatThaiDate(selectedItem.end_date) }}
              </div>
            </div>
          </v-col>
          <v-col>
            <div class="text-headdetail size-selecttime d-flex">
              <strong class="me-1">เวลาจบ</strong>
              <v-select
                v-if="editMode"
                v-model="editedEndTime"
                :items="endTimeOptions"
                density="compact"
                variant="outlined"
                class="mg-toptime"
              />
              <span v-else>{{ selectedItem?.end_time }}</span>
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex text-headdetail">
        <div class="text-moredetail">
          <strong>รายละเอียด</strong> {{ selectedItem?.details }}
        </div>
      </span>

      <span
        v-if="selectedItem?.reseve_status === 'ยกเลิก'"
        class="d-flex text-headdetail"
      >
        <div class="text-headdetail">
          <strong>เหตุผลการยกเลิก</strong>
          {{ selectedItem?.reason || "ยกเลิกการจอง" }}
        </div>
      </span>

      <span
        v-if="selectedItem?.reseve_status === 'ยกเลิก'"
        class="d-flex mg-leftreason"
      >
        <div class="text-headdetail">
          <strong>ยกเลิกโดย</strong>
        </div>
      </span>

      <span
        v-if="selectedItem?.reseve_status === 'ยกเลิก'"
        class="d-flex mg-leftreason"
      >
        <div class="text-headdetail">
          <strong>เวลาที่ยกเลิก</strong>
          {{ selectedItem?.coalesce_time || "ไม่มีข้อมูล" }}
        </div>
      </span>

      <!-- Button in Dialog -->
      <v-card-text />
      <v-card-actions class="d-flex justify-center mg-btmdiastatus">
        <v-btn
          class="btn-close-canceldialog"
          :style="{
            backgroundColor: editMode ? '#ea8a8a' : '#dad0c2',
            color: '#493628',
          }"
          @click="handleCancel"
        >
          {{ editMode ? "ยกเลิก" : "ปิด" }}
        </v-btn>

        <v-btn
          class="btn-save-editdialog"
          :style="{
            backgroundColor: editMode ? '#B5CFB7' : '#f0c8a4',
            color: '#493628',
          }"
          @click="toggleEditMode"
          :disabled="
            selectedItem?.reseve_status === 'ยกเลิก' ||
            selectedItem?.reseve_status === 'อนุมัติ'
          "
        >
          {{ editMode ? "บันทึก" : "แก้ไข" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog เปลี่ยนสถานะ -->
  <v-dialog v-model="statusChangeDialog" max-width="500px">
    <v-card>
      <v-card-text>
        <div class="text-center mg-topdiastatus">
          ต้องการเปลี่ยนสถานะเป็น "{{ newStatus }}" ใช่หรือไม่ ?
        </div>

        <v-text-field
          v-if="newStatus === 'ยกเลิก'"
          v-model="cancelReason"
          label="กรอกเหตุผลในการยกเลิก"
          variant="outlined"
          :rules="[(v) => !!v || '']"
          class="mg-topdiastatus"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-center mg-topdiastatus">
        <v-btn class="btn-cancelreason" @click="clearCancelReason">
          ยกเลิก
        </v-btn>
        <v-btn
          class="btn-confirmreason"
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
import type { AllReserve } from "@/types/allReserved";
import { useSpecialRoomStore } from "@/stores/srbStore";
import type { NormalRoomBooking } from "@/types/normalRoomBooking";
import type { GetSpecialRoomBooking } from "@/types/specialRoomBooking";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useFloorStore } from "../../stores/floorStore";

const floorStore = useFloorStore();

// Update onMounted to fetch both floor data and reservation data
onMounted(async () => {
  await fetchFloorAndRoomData();
  await LoadingData();
});

const userStore = useUserStore();
const nrbStore = useNormalRoomBookStore(); // เชื่อม store การจอง
const srbStore = useSpecialRoomStore(); //
const bookingDetails = ref<AllReserve[]>([]);
const selectedItem = ref<AllReserve | null>(null);

const sortBy = ref([
  { key: "numb", order: "desc" },
  { key: "numb", order: "asc" },
  { key: "details", order: "asc" },
  { key: "floor", order: "asc" },
  { key: "roomName", order: "asc" },
  { key: "startDate", order: "asc" },
  { key: "startTime", order: "asc" },
  { key: "status", order: "asc" },
]);

const headers = ref([
  { title: "ลำดับ", align: "start", key: "numb" },
  { title: "ชื่อ", key: "details" },
  { title: "ชั้น", key: "floor" },
  { title: "ห้อง", key: "roomName" },
  { title: "วันที่", key: "startDate" },
  { title: "เวลา", key: "startTime" },
  { title: "สถานะ", key: "status" },
  { title: "เพิ่มเติม", key: "more" },
]);

const dialog = ref(false);
const editMode = ref(false);
const statusChangeDialog = ref(false);

const newStatus = ref("");

const itemToUpdateNRB = ref<NormalRoomBooking>();
const itemToUpdateSRB = ref<GetSpecialRoomBooking>();
const keepTypeForm = ref<string>();

const cancelReason = ref("");
const selectedFloor = ref(2); // ค่าเริ่มต้นให้ตรงกับชั้นแรกที่มีในแท็บ
const floorOptions = ref<any[]>([]);
const roomOptions = ref<any[]>([]);
const selectedRoomId = ref<number | null>(null);
const selectedFloorId = ref<number | null>(null);
const editedRoom = ref("");
const editedStartTime = ref("");
const editedEndTime = ref("");

let intervalId: number | undefined; // เก็บค่า setInterval ID

const filteredData = computed(() => {
  return bookingDetails.value.filter(
    (item) => item.floor_number === selectedFloor.value
  );
});

// เพิ่มข้อมูลที่มีโครงสร้างตรงกับ `BookingDetail`
onMounted(async () => {
  await fetchFloorAndRoomData();
});

// onMounted(() => {
//   // ตรวจสอบเวลาทุกวินาที
//   setInterval(() => {
//     const now = new Date();
//     bookingDetails.value.forEach(async (item) => {
//       if (item.reseve_status === "รอ") {
//         try {
//           // ตรวจสอบรูปแบบ startDate และแปลงเป็น Date Object
//           const startDateParts = item.start_date.split(" "); // แยกวันที่
//           const [day, month, year] = [
//             startDateParts[1], // วันที่
//             startDateParts[2], // เดือน
//             startDateParts[3], // ปี
//           ];
//           const thaiMonths = [
//             "มกราคม",
//             "กุมภาพันธ์",
//             "มีนาคม",
//             "เมษายน",
//             "พฤษภาคม",
//             "มิถุนายน",
//             "กรกฎาคม",
//             "สิงหาคม",
//             "กันยายน",
//             "ตุลาคม",
//             "พฤศจิกายน",
//             "ธันวาคม",
//           ];
//           const monthIndex = thaiMonths.indexOf(month); // แปลงเดือนภาษาไทยเป็น index
//           if (monthIndex === -1) throw new Error("Invalid month in startDate");
//           // สร้าง Date Object
//           const startDate = new Date(
//             parseInt(year) - 543, // แปลง พ.ศ. เป็น ค.ศ.
//             monthIndex,
//             parseInt(day)
//           );
//           // แปลง startTime เป็นชั่วโมงและนาที
//           const [hours, minutes] = item.start_time.split(":").map(Number);
//           startDate.setHours(hours, minutes); // เพิ่มเวลาเริ่มในวันที่
//           // คำนวณเวลาที่เหลือ
//           const diff = now.getTime() - startDate.getTime(); // คำนวณ ms
//           const diffMinutes = diff / (1000 * 60); // แปลงเป็นนาที
//           // หากเวลาผ่านไปเกิน 2 นาที
//           // if (diffMinutes > 15) {
//           //   // อัปเดตสถานะใน backend
//           //   await nrbStore.updateStatus(item.reserved_Id, "ยกเลิก");
//           //   // อัปเดตสถานะใน local state
//           //   item.status = "ยกเลิก";
//           //   item.cancelReason = "หมดเวลาที่กำหนด"; // เพิ่มเหตุผล
//           //   item.cancelTime = now.toTimeString().slice(0, 5); // เวลา cancel
//           // }
//         } catch (error) {
//           // console.error(`Error processing item ${item.numb}:`, error);
//         }
//       }
//     });
//   }, 1000);
// });

watch(
  () => selectedFloor.value,
  (newSelect) => {
    LoadingData(); // โหลดข้อมูลตามชั้นใหม่ทุกครั้งที่เลือก ชั้น
  }
);

const LoadingData = async () => {
  try {
    // Store the current selectedItem ID if it exists
    const selectedItemId = selectedItem.value?.reserved_Id;

    // Load the updated data
    const allReserved = await nrbStore.getAllReservedRooms();
    console.log("Loading reservation data:", allReserved.length, "items");

    // Map room IDs to room names using floorOptions
    const updatedReservations = allReserved.map((reservation) => {
      // Find the floor that contains this room
      const floor = floorOptions.value.find(
        (f) => f.floor_Number === reservation.floor_number
      );
      if (floor) {
        // Find the room in this floor
        const room = floor.rooms?.find((r) => r.roomId === reservation.room_id);
        if (room) {
          // Update the room_name with the actual name from our options
          return {
            ...reservation,
            room_name: room.room_Name, // ใช้ชื่อห้องจาก room options แทน
          };
        }
      }
      return reservation;
    });

    bookingDetails.value = updatedReservations;

    // If we had a selected item, find it again in the updated data
    if (selectedItemId && dialog.value) {
      const updatedItem = updatedReservations.find(
        (item) => item.reserved_Id === selectedItemId
      );

      if (updatedItem) {
        console.log("Restoring selected item after data reload:", updatedItem);
        selectedItem.value = updatedItem;
      }
    }
  } catch (error) {
    console.error("Error loading reservation data:", error);
  }
};

function formatThaiDate(dateString: string) {
  // Array ของวันในสัปดาห์ภาษาไทย
  const thaiDays = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];
  // Array ของชื่อเดือนภาษาไทย
  const thaiMonths = [
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
  // แยกค่าจากรูปแบบ "dd-mm-yyyy"
  const [day, month, year] = dateString.split("-").map(Number);

  const dateObj = new Date(year, month - 1, day);
  const dayIndex = dateObj.getDay();

  // จัดรูปแบบข้อความให้สวยงาม
  return `${thaiDays[dayIndex]} ${day} ${thaiMonths[month - 1]}  ${year + 543}`;
}

function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0"); // ทำให้เป็น 2 หลัก
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

const handleStatusChange = async (
  id: number,
  newStatusValue: string,
  typeForm: string
) => {
  keepTypeForm.value = typeForm;
  newStatus.value = newStatusValue;
  if (typeForm == "normal") {
    itemToUpdateNRB.value = await nrbStore.findOneReserve(id);
  } else if (typeForm == "special") {
    itemToUpdateSRB.value = await srbStore.getOneById(id);
  }
  statusChangeDialog.value = true; // เปิด Dialog ยืนยัน
};

function countTime(startTime: string) {
  const [hour, minutes] = startTime.split(":").map(Number);
  const sumMinites = hour * 60 + minutes;
  return sumMinites;
}
async function checkResevedCountTime() {
  const allReseved = ref<AllReserve[]>([]);
  allReseved.value = await nrbStore.getAllReservedRooms();
  const ResevedStatusWait = ref<AllReserve[]>([]);
  ResevedStatusWait.value = allReseved.value.filter(
    (s) => s.reseve_status === "รอ"
  );

  for (let i = 0; i < ResevedStatusWait.value.length; i++) {
    let startTime = countTime(ResevedStatusWait.value[i].start_time);
    let checkTime = countTime(getCurrentTime());

    if (checkTime >= startTime + 15) {
      if (ResevedStatusWait.value[i].formReserved == "normal") {
        const updateCancelReseved = nrbStore.cancelReseved(
          ResevedStatusWait.value[i].reserved_Id,
          "หมดเวลาการขอเข้าใช้บริการ",
          "ยกเลิก",
          getCurrentTime()
        );
        LoadingData();
        console.log("Canceled Reseve :", updateCancelReseved);
      }
    }
  }
}

const startAutoUpdate = () => {
  intervalId = setInterval(() => {
    console.log("เรียกใช้ฟังก์ชันทุก 30 วินาที");
    checkResevedCountTime();
  }, 30000); // 30 วินาที
};
// เรียกใช้ function startAutoUpdate
startAutoUpdate();
const confirmStatusChange = async () => {
  try {
    if (newStatus.value == "อนุมัติ") {
      if (keepTypeForm.value == "normal") {
        const updateStatus = await nrbStore.updateStatus(
          itemToUpdateNRB.value?.nrbId!,
          newStatus.value
        );
        LoadingData();
        console.log("Status updated :", updateStatus);
      } else if (keepTypeForm.value == "special") {
        const updateStatus = await srbStore.updateReseveStatus(
          itemToUpdateSRB.value?.srb_Id!,
          newStatus.value
        );
        LoadingData();
      }
    } else if (newStatus.value == "ยกเลิก") {
      if (keepTypeForm.value == "normal") {
        const updateReseve = await nrbStore.cancelReseved(
          itemToUpdateNRB.value?.nrbId!,
          cancelReason.value,
          newStatus.value,
          getCurrentTime()
        );
        LoadingData();
      } else if (keepTypeForm.value == "special") {
        const updateReseve = await srbStore.cancelResevedSpecial(
          itemToUpdateSRB.value?.srb_Id!,
          newStatus.value,
          cancelReason.value,
          getCurrentTime()
        );
        LoadingData();
      }
    }
    // ปิด Dialog หลังอัปเดตสำเร็จ
    statusChangeDialog.value = false;
    cancelReason.value = ""; // Reset เหตุผล
  } catch (error) {
    console.error("Failed to update status:", error);
    alert("ไม่สามารถเปลี่ยนสถานะได้ กรุณาลองอีกครั้ง");
  }
};

const items = [
  { title: "อนุมัติสถานะการจอง", disabled: true, href: "/" },
  { title: "สถานะห้อง", disabled: false, href: "/manage_room" },
];

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

const clearCancelReason = () => {
  cancelReason.value = "";
  statusChangeDialog.value = false;
};

const updateAvailableRooms = () => {
  if (selectedFloorId.value !== null) {
    // Find the selected floor in the floorOptions
    const selectedFloor = floorOptions.value.find(
      (floor) => floor.floorId === selectedFloorId.value
    );

    console.log("Selected floor for room options:", selectedFloor);

    if (selectedFloor && selectedFloor.rooms) {
      // Update room options based on the selected floor
      roomOptions.value = selectedFloor.rooms;
      console.log("Room options for selected floor:", roomOptions.value);

      // Check if the current selectedRoomId is in the new room options
      const currentSelectedRoomStillAvailable = roomOptions.value.some(
        (room) => room.roomId === selectedRoomId.value
      );

      // If the current selected room is not in the new options, select the first room
      if (!currentSelectedRoomStillAvailable && roomOptions.value.length > 0) {
        const firstRoom = roomOptions.value[0];
        console.log("Setting selectedRoomId to first room:", firstRoom);
        selectedRoomId.value = firstRoom.roomId;
      }

      console.log("selectedRoomId after update:", selectedRoomId.value);
    } else {
      console.log("No floor found with ID:", selectedFloorId.value);
      roomOptions.value = [];
      selectedRoomId.value = null;
    }
  } else {
    console.log("No floor selected");
    roomOptions.value = [];
    selectedRoomId.value = null;
  }
};

const saveChanges = async () => {
  if (!selectedItem.value) {
    console.error("No item selected for editing");
    return;
  }

  // ตรวจสอบว่ามี selectedRoomId หรือไม่
  if (!selectedRoomId.value) {
    console.error("No room selected");
    alert("กรุณาเลือกห้องก่อนทำการอัปเดต");
    return;
  }

  // สร้าง payload สำหรับการอัปเดต
  const updatedBooking = {
    roomId: selectedRoomId.value, // ใช้ค่า selectedRoomId โดยตรง
    startTime: editedStartTime.value,
    endTime: editedEndTime.value,
  };

  console.log("Updating booking with data:", updatedBooking);

  try {
    if (selectedItem.value.reserved_Id) {
      await nrbStore.updateReserve(
        selectedItem.value.reserved_Id,
        updatedBooking
      );
      console.log("Booking updated successfully");
      await LoadingData();
      editMode.value = false;
      dialog.value = false; // ปิด dialog หลังจากอัปเดตสำเร็จ
    }
  } catch (error) {
    console.error("Failed to update booking:", error);
    alert("ไม่สามารถอัปเดตการจองได้ กรุณาลองอีกครั้ง");
  }
};

const toggleEditMode = async () => {
  if (!selectedItem.value) return;

  if (editMode.value) {
    // ถ้ากำลังจะบันทึก
    await saveChanges();
  } else {
    // เข้าสู่โหมดแก้ไข
    editMode.value = true;
    editedStartTime.value = selectedItem.value.start_time;
    editedEndTime.value = selectedItem.value.end_time;

    // ตั้งค่า floor และ room options
    const floor = floorOptions.value.find(
      (f) => f.floor_Number === selectedItem.value.floor_number
    );

    if (floor) {
      selectedFloorId.value = floor.floorId;
      roomOptions.value = floor.rooms || [];

      // หา room ที่ตรงกับชื่อห้องแทนการใช้ room_id
      const matchingRoom = roomOptions.value.find(
        (room) => room.room_Name === selectedItem.value.room_name
      );

      if (matchingRoom) {
        selectedRoomId.value = matchingRoom.roomId;
        console.log("Found matching room:", {
          roomName: matchingRoom.room_Name,
          roomId: matchingRoom.roomId,
        });
      }
    }
  }
};

// เพิ่ม watch เพื่อ debug
watch(selectedRoomId, (newVal) => {
  console.log("selectedRoomId changed to:", newVal);
  const selectedRoom = roomOptions.value.find((r) => r.roomId === newVal);
  console.log("Selected room object:", selectedRoom);
});

const onRoomSelected = (roomId: number) => {
  console.log("Room selected:", roomId);
  selectedRoomId.value = roomId;
};

const showDialog = (item: AllReserve) => {
  console.log("Opening dialog with item:", JSON.stringify(item, null, 2));
  selectedItem.value = item;
  dialog.value = true;

  // ตั้งค่าค่าเริ่มต้นสำหรับ floor และ room
  if (item.floor_number) {
    const floor = floorOptions.value.find(
      (f) => f.floor_Number === item.floor_number
    );
    if (floor) {
      selectedFloorId.value = floor.floorId;
      // อัพเดท room options สำหรับชั้นที่เลือก
      roomOptions.value = floor.rooms || [];

      // หา room ที่ตรงกับชื่อห้องแทนการใช้ room_id
      const matchingRoom = roomOptions.value.find(
        (room) => room.room_Name === item.room_name
      );

      console.log("Matching room:", matchingRoom);

      if (matchingRoom) {
        selectedRoomId.value = matchingRoom.roomId;
      } else {
        console.log("Room options:", roomOptions.value);
        console.log("Looking for room name:", item.room_name);
      }
    }
  }
};

const handleCancel = () => {
  if (editMode.value) {
    selectedRoomId.value = selectedItem.value?.roomId ?? selectedRoomId.value;
    editedRoom.value = selectedItem.value?.room_name ?? editedRoom.value;
    editedStartTime.value =
      selectedItem.value?.start_time ?? editedStartTime.value;
    editedEndTime.value = selectedItem.value?.end_time ?? editedEndTime.value;
    editMode.value = false;
  } else {
    dialog.value = false;
  }
};

const fetchFloorAndRoomData = async () => {
  try {
    // Get all reserved rooms for the booking details
    const allReserved = await nrbStore.getAllReservedRooms();
    bookingDetails.value = allReserved;

    // Get floor data from floorStore
    const floorsResponse = await floorStore.getAllFloors();
    console.log("Raw floors response:", floorsResponse);

    const floors = floorsResponse.data;
    console.log("Floors data:", floors);

    // Set floor options from floorStore data, using the correct property names from types
    floorOptions.value = floors.map((floor) => {
      console.log("Processing floor:", floor);
      return {
        floorId: floor.floorId,
        floor_Number: floor.floor_Number,
        rooms: Array.isArray(floor.rooms)
          ? floor.rooms.map((room) => ({
              roomId: room.roomId,
              room_Name: room.room_Name,
            }))
          : [],
      };
    });

    console.log("Floor options after mapping:", floorOptions.value);

    // If there are floors, select the first one by default and update room options
    if (floorOptions.value.length > 0) {
      selectedFloorId.value = floorOptions.value[0].floorId;
      console.log("Selected first floor:", floorOptions.value[0]);
      updateAvailableRooms();
    }
  } catch (error) {
    console.error("Error fetching floor and room data:", error);
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.back-ground {
  background-color: #f9f3ea;
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.mg-toppage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  margin-top: 100px;
}

.mg-toptable {
  margin-bottom: 22px;
}

.breadcrumb-disabled {
  color: #493628;
  font-weight: 600;
  font-size: 24px;
  margin-top: -1px;
}

.breadcrumb-link {
  text-decoration: none;
  color: #493628;
  font-weight: 400;
  font-size: 24px;
  margin-top: -1px;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.tab-text {
  font-weight: 400;
  font-size: 20px;
}

.rd-datatable {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #cdbba7;
  /* กำหนดกรอบของตาราง */
  border-collapse: collapse;
  /* ให้กรอบรวมกัน */
}

.table-text {
  font-weight: 400;
  font-size: 18px;
  color: #493628;
}

.row-even {
  background-color: #f2efea;
}

.row-odd {
  background-color: #e6dfd5;
}

.size-selectstatus {
  max-width: 110px;
  max-height: 62px;
  margin-top: 20px;
}

.btn-diadetail {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #493628;
  margin-left: 9px;
}

.text-headdetail {
  font-weight: 300;
  font-size: 19px;
  margin-top: 20px;
  margin-left: 25px;
}

.dialog-detail {
  background-color: #f5eded;
  border-radius: 20px;
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

.text-userdetail {
  font-weight: 300;
  font-size: 18px;
  margin-top: 15px;
  margin-left: 25px;
}

.text-namedetail {
  font-weight: 300;
  font-size: 18px;
  margin-top: 10px;
  margin-left: 25px;
}

.text-startdatedetail {
  font-weight: 300;
  font-size: 18px;
  margin-top: 10px;
  margin-left: 25px;
}

.text-enddatedetail {
  font-weight: 300;
  font-size: 18px;
  margin-top: -10px;
  margin-left: 25px;
}

.size-selecttime {
  width: 170px;
  margin-left: 40px;
}

.mg-toptime {
  margin-top: -5px;
}

.text-floor-roomdetail {
  margin-top: 10px;
  margin-left: 25px;
}

.size-selectfloor {
  width: 120px;
}

.size-selectroom {
  width: 225px;
  margin-left: 40px;
}

.text-moredetail {
  margin-top: 10px;
  margin-left: 25px;
}

.mg-leftreason {
  margin-left: 25px;
}

.btn-close-canceldialog {
  font-weight: 400;
  font-size: 16px;
  color: #493628;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  margin-right: 30px;
  margin-top: -60px;
}

.btn-save-editdialog {
  font-weight: 400;
  font-size: 16px;
  background-color: #f0c8a4;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  margin-top: -60px;
}

.btn-cancelreason {
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

.btn-confirmreason {
  font-weight: 400;
  font-size: 16px;
  color: #493628;
  background-color: #b5cfb7;
  width: 100px;
  border-radius: 10px;
  margin-top: -40px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
}

.mg-topdiastatus {
  margin-top: 10px;
}

.mg-btmdiastatus {
  margin-top: 10px;
}
</style>
