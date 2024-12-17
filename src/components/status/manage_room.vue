<template>
  <Header_page />
  <v-container fluid class="back-ground ms-kob">
    <!-- Breadcrumbs -->
    <v-breadcrumbs :items="items" divider=">" class="head-title pb-5">
      <template v-slot:item="{ item }" class="head-title">
        <!-- ลิงก์ที่สามารถคลิกได้ -->
        <router-link
          v-if="!item.disabled && item.href"
          :to="item.href"
          class="breadcrumb-link head-title"
        >
          {{ item.title }}
        </router-link>

        <!-- ลิงก์ที่ไม่สามารถคลิกได้ -->
        <span v-else class="breadcrumb-disabled head-title">
          {{ item.title }}
        </span>
      </template>
    </v-breadcrumbs>

    <v-row>
      <v-col cols="10">

      </v-col>
      <v-col cols="2">
        <v-btn class="close-service-btn ms-5 mb-5" rounded large>
      <v-icon left>mdi-close</v-icon>
      ปิดบริการ
    </v-btn>
      </v-col>
    </v-row>
    

    <!-- Data Table -->
    <div v-for="floor in 6" :key="floor" class="mb-10">
      <h2 class="text-h5 font-weight-bold ms-5 mb-2">ชั้น {{ floor + 1 }}</h2>
      <v-data-table
        :headers="headers"
        :items="filteredRooms(floor + 1)"
        class="rd-test"
        style="table-layout: fixed; width: 100%"
        hide-default-footer
      >
        <template v-slot:headers>
          <tr>
            <th style="width: 20%">ห้อง</th>
            <th style="width: 20%">ผู้จอง</th>
            <th style="width: 20%">เวลา</th>
            <th style="width: 20%">สถานะ</th>
            <th style="width: 20%">จัดการ</th>
          </tr>
        </template>
        <template v-slot:item="{ item, index }">
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

    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>รายละเอียดการจอง</v-card-title>
        <v-card-text>
          <div><strong>ห้อง:</strong> {{ selectedItem?.room }}</div>
          <div><strong>ผู้จอง:</strong> {{ selectedItem?.user }}</div>
          <div><strong>เวลา:</strong> {{ selectedItem?.time }}</div>
          <div><strong>สถานะ:</strong> {{ selectedItem?.status }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="dialog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

// Breadcrumbs Configuration
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
  2: ["201"],
  3: [
    "ศึกษากลุ่ม 1",
    "ศึกษากลุ่ม 2",
    "ศึกษากลุ่ม 3",
    "ศึกษากลุ่ม 4",
    "ศึกษากลุ่ม 5",
    "ศึกษากลุ่ม 6",
  ],
  4: [
    "ศึกษากลุ่ม 1",
    "ศึกษากลุ่ม 2",
    "ศึกษากลุ่ม 3",
    "ศึกษากลุ่ม 4",
    "ศึกษากลุ่ม 5",
  ],
  5: [
    "ศึกษากลุ่ม 1",
    "ศึกษากลุ่ม 2",
    "ศึกษากลุ่ม 3",
    "ศึกษากลุ่ม 4",
    "ศึกษากลุ่ม 5",
    "Lecturer's Room 1",
    "Lecturer's Room 2",
    "Lecturer's Room 3",
  ],
  6: [
    "STV 1",
    "STV 2",
    "STV 3",
    "STV 4",
    "STV 5",
    "STV 6",
    "STV 7",
    "STV 8",
    "STV 9",
    "LIBRA OKE 1",
    "LIBRA OKE 2",
    "MINI THEATER",
    "604 Smart Board",
    "Mini Studio",
    "Cyber Zone 1",
    "Cyber Zone 2",
    "Live for Life",
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
    rooms.map((room) => ({
      room,
      user:
        Math.random() > 0.5
          ? mockUsers[Math.floor(Math.random() * mockUsers.length)]
          : "-", // บางห้องใส่ชื่อ บางห้องใส่ "-"
      time: "08:00-10:00",
      status: Math.random() > 0.5 ? "จอง" : "ว่าง", // สถานะแบบสุ่ม
      floor: Number(floor),
    }))
  )
);

// กรองข้อมูลห้องตามชั้น
const filteredRooms = (floor: number) => {
  return data.value.filter((item) => item.floor === floor);
};

// Dialog
const dialog = ref(false);
const selectedItem = ref<any>(null);

// เปิด Dialog
const showDialog = (item: any) => {
  selectedItem.value = item;
  dialog.value = true;
};

// Filter data by floor
const filteredData = (floor: number) => {
  return data.value.filter((item) => item.floor === floor) || [];
};

interface FloorRooms {
  [key: string]: string[];
}

const editMode = ref(false); // โหมดแก้ไข

// ฟิลด์ที่แก้ไขได้
const editedFloor = ref<number>(0);
const editedRoom = ref("");

// ห้องที่สามารถเลือกได้ตามชั้นที่เลือก
const availableRooms = computed(() => {
  return floorRooms[editedFloor.value as keyof typeof floorRooms] || [];
});

// Watcher เพื่ออัปเดตห้องเมื่อแก้ไขชั้น
watch(
  () => editedFloor.value,
  (newFloor) => {
    const rooms = floorRooms[newFloor as keyof typeof floorRooms];
    editedRoom.value = rooms ? rooms[0] : ""; // เซ็ตห้องแรกในชั้นที่เลือก
  }
);
</script>

<style scoped>
/* เพิ่มการอ้างอิงฟอนต์ Kanit จาก Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

/* ใช้ฟอนต์ Kanit ทั่วทั้งโปรเจ็กต์ */
* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.head-title {
  font-weight: 600;
  font-size: 24px;
}

.back-ground {
  background-color: #f9f3ea;
}

.ms-kob {
  position: absolute; /* ใช้ absolute เพื่อควบคุมตำแหน่ง */
  top: 0; /* เลื่อนให้อยู่ด้านบน */
  left: 0;
  width: 100%; /* ให้ครอบคลุมพื้นที่หน้าจอ */
  z-index: 1;
  margin-top: 100px;
}

.breadcrumb-link {
  text-decoration: none;
  color: #493628; /* สีสำหรับลิงก์ที่คลิกได้ */
  font-weight: 400;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-disabled {
  color: #493628; /* สีสำหรับลิงก์ที่ปิดใช้งาน */
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

/* ปรับสีหัวคอลัมน์ */
th {
  background-color: #cdbba7;
  font-weight: bold;
  font-size: 16px;
}

.back-ground {
  background-color: #f9f3ea;
}

.rd-btndetail {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #493628;
}

.rd-test {
  background-color: #f5eded;
  border-radius: 10px;
}

.close-service-btn {
  font-weight: bold;
  background-color: #edf5ee; /* สีพื้นหลัง */
  color: #493628; /* สีข้อความ */
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  font-size: 16px;
  font-weight: 400;
}

.close-service-btn:hover {
  background-color: #f5eded; /* สีพื้นหลังเมื่อ hover */
}
</style>
