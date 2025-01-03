<template>
  <Header_page />
  <v-container
    fluid
    class="back-ground ms-kob"
  >
    <!-- Breadcrumbs -->
    <v-breadcrumbs
      :items="items"
      divider=">"
      class="head-title mg-table"
    >
      <template
        #item="{ item }"
        class="head-title"
      >
        <!-- ลิงก์ที่สามารถคลิกได้ -->
        <router-link
          v-if="!item.disabled && item.href"
          :to="item.href"
          class="breadcrumb-link head-title"
        >
          {{ item.title }}
        </router-link>

        <!-- ลิงก์ที่ไม่สามารถคลิกได้ -->
        <span
          v-else
          class="breadcrumb-disabled head-title"
        >
          {{ item.title }}
        </span>
      </template>
    </v-breadcrumbs>

    <v-row>
      <v-col cols="10" />
      <v-col cols="2">
        <v-btn
          class="close-service-btn ms-5 mb-5"
          rounded
          large
          @click="closeServiceDialog = true"
        >
          <v-icon left>
            mdi-close
          </v-icon>
          ปิดบริการ
        </v-btn>
      </v-col>
    </v-row>

    <div
      v-for="floor in 6"
      :key="floor"
      class="mb-10"
    >
      <h2 class="text-h5 font-weight-bold ms-5 mb-2">
        ชั้น {{ floor + 1 }}
      </h2>
      <v-data-table
        :headers="headers"
        :items="filteredRooms(floor + 1)"
        class="rd-test"
        style="table-layout: fixed; width: 100%"
        hide-default-footer
      >
        <template #headers>
          <tr>
            <th style="width: 20%">
              ห้อง
            </th>
            <th style="width: 20%">
              ผู้จอง
            </th>
            <th style="width: 20%">
              เวลา
            </th>
            <th style="width: 20%">
              สถานะ
            </th>
            <th style="width: 20%">
              จัดการ
            </th>
          </tr>
        </template>
        <template #item="{ item, index }">
          <tr :class="index % 2 === 0 ? 'row-even' : 'row-odd'">
            <td>{{ item.room }}</td>
            <td>{{ item.user }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.status }}</td>
            <td>
              <v-btn
                icon
                class="rd-btndetail"
                width="40"
                height="40"
                @click="showDialog(item)"
              >
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="500px"
      max-height="600px"
    >
      <v-card>
        <v-card-title class="head-dialog text-center mt-5">
          ปิดให้บริการจองห้อง (รายห้อง)
        </v-card-title>
        <v-card-text>
          <!-- หมายเหตุ -->
          <v-text-field
            v-model="remark"
            label="หมายเหตุ"
            density="compact"
            variant="outlined"
          />

          <!-- Dropdown เปิด-ปิด -->
          <v-select
            v-model="status"
            label="สถานะ"
            :items="['เปิด', 'ปิด']"
            density="compact"
            variant="outlined"
          />

          <!-- วันที่และเวลา -->
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="startDate"
                label="วันที่เริ่ม"
                type="date"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="startTime"
                label="เวลา"
                type="time"
                density="compact"
                variant="outlined"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="endDate"
                label="ถึงวันที่"
                type="date"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="endTime"
                label="เวลา"
                type="time"
                density="compact"
                variant="outlined"
              />
            </v-col>
          </v-row>

          <!-- ชั้น/ห้อง -->
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="selectedFloor"
                label="ชั้น"
                :items="Object.keys(floorRooms)"
                density="compact"
                variant="outlined"
                @update:model-value="updateRoomOptions"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="selectedRoom"
                label="ห้อง"
                :items="roomOptions"
                density="compact"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="d-flex justify-center mb-5">
          <v-btn
            class="rd-btncancel"
            variant="flat"
            @click="dialog = false"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            class="rd-btnclose"
            variant="flat"
            @click="saveChanges"
          >
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="closeServiceDialog"
      max-width="500px"
      max-height="600px"
    >
      <v-card>
        <v-card-title class="head-dialog text-center mt-5">
          ยืนยันการปิดให้บริการ
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="remark"
            label="หมายเหตุ"
            density="compact"
            variant="outlined"
          />

          <v-select
            v-model="status"
            label="สถานะ"
            :items="['เปิด', 'ปิด']"
            density="compact"
            variant="outlined"
          />

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="startDate"
                label="วันที่เริ่ม"
                type="date"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="startTime"
                label="เวลา"
                type="time"
                density="compact"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="endDate"
                label="ถึงวันที่"
                type="date"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="endTime"
                label="เวลา"
                type="time"
                density="compact"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center mb-5">
          <v-btn
            class="rd-btncancel"
            variant="flat"
            @click="closeServiceDialog = false"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            class="rd-btnclose"
            variant="flat"
            @click="saveCloseService"
          >
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const closeServiceDialog = ref(false);

const saveCloseService = () => {
  console.log("หมายเหตุ:", remark.value);
  console.log("สถานะ:", status.value);
  console.log("วันที่เริ่ม:", startDate.value, startTime.value);
  console.log("ถึงวันที่:", endDate.value, endTime.value);
  closeServiceDialog.value = false;
};
const items = [
  { title: "อนุมัติสถานะการจอง", disabled: false, href: "/manage_status" },
  { title: "สถานะห้อง", disabled: true, href: "/" },
];

const headers = [
  { title: "ห้อง", key: "room" },
  { title: "ผู้จอง", key: "user" },
  { title: "วันที่", key: "date" },
  { title: "สถานะ", key: "status" },
  { title: "จัดการ", key: "actions" },
];

const floorRooms: FloorRooms = {
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

const mockUsers = [
  "สมชาย ใจดี",
  "สมหญิง รักเรียน",
  "นพดล ก้าวหน้า",
  "กนกพร ตั้งใจ",
  "อนุชา ขยัน",
  "วิไลวรรณ สุขสันต์",
  "สุชาติ สมบูรณ์",
  "ศิริพร จันทร์เจริญ",
];

const data = ref(
  Object.entries(floorRooms).flatMap(([floor, rooms]) =>
    rooms.map((room) => {
      const hasUser = Math.random() > 0.5; // สุ่มว่ามีผู้จองหรือไม่
      return {
        room,
        user: hasUser ? mockUsers[Math.floor(Math.random() * mockUsers.length)] : "-", // ถ้าไม่มี ให้เป็น "-"
        time: hasUser ? "08:00-10:00" : "-", // ถ้าไม่มี ให้เป็น "-"
        status: hasUser ? (Math.random() > 0.5 ? "ไม่ว่าง" : "จอง") : "ว่าง", // ถ้าไม่มี ให้เป็น "ว่าง"
        floor: Number(floor),
      };
    })
  )
);



const filteredRooms = (floor: number) => {
  return data.value
    .filter((item) => item.floor === floor)
    .map((item) => ({
      ...item,
      user: item.user === "-" ? "-" : item.user, // หากไม่มีการจอง ผู้จอง = "-"
      time: item.time === "-" ? "-" : item.time, // หากไม่มีการจอง เวลา = "-"
      status: item.status || "ว่าง", // หากไม่มีสถานะ ให้สถานะ = "ว่าง"
    }));
};


const dialog = ref(false);
const selectedItem = ref<any>(null);

const showDialog = (item: any) => {
  selectedItem.value = item;
  dialog.value = true;
};

interface FloorRooms {
  [key: string]: string[];
}

const remark = ref("");
const status = ref("เปิด");
const startDate = ref("2024-11-13");
const startTime = ref("08:00");
const endDate = ref("2024-11-13");
const endTime = ref("08:00");

const saveChanges = () => {
  console.log("หมายเหตุ:", remark.value);
  console.log("สถานะ:", status.value);
  console.log("วันที่เริ่ม:", startDate.value, startTime.value);
  console.log("ถึงวันที่:", endDate.value, endTime.value);
  console.log("ชั้น:", selectedFloor.value);
  console.log("ห้อง:", selectedRoom.value);
  dialog.value = false;
};

const selectedFloor = ref("2");
const roomOptions = ref<string[]>(floorRooms[selectedFloor.value]);
const selectedRoom = ref(roomOptions.value[0]);

const updateRoomOptions = () => {
  roomOptions.value = floorRooms[selectedFloor.value] || [];
  selectedRoom.value = roomOptions.value[0] || "";
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
  margin-top: -1px;
}

.mg-table {
  margin-bottom: -35px;
}

.head-dialog {
  font-weight: 600;
  font-size: 18px;
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

th {
  background-color: #cdbba7;
  font-weight: bold;
  font-size: 16px;
}

.rd-btndetail {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #493628;
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
}

.rd-btnclose {
  font-weight: 400;
  font-size: 16px;
  background-color: #b5cfb7;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
}

.rd-form,
.v-input.v-input--outlined .v-input__control {
  border-radius: 5px !important;
  border: 2px solid #493628;
  height: 55px;
}

.rd-test {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #cdbba7; /* กำหนดกรอบของตาราง */
  border-collapse: collapse; /* ให้กรอบรวมกัน */
}

.close-service-btn {
  font-weight: bold;
  background-color: #edf5ee;
  color: #493628;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  font-size: 16px;
  font-weight: 400;
}

.close-service-btn:hover {
  background-color: #f5eded;
}
</style>
