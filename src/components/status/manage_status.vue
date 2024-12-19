<template>
  <Header_page />
  <v-container fluid class="back-ground ms-kob">
    <!-- Breadcrumbs -->
    <v-breadcrumbs :items="items" divider=">" class="head-title mg-table">
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

    <!-- Data Table -->
    <v-data-table
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="sortedData"
      style="background-color: #cdbba7"
      class="rd-test"
    >
      <template v-slot:item="{ item, index }">
        <tr :class="index % 2 === 0 ? 'row-even' : 'row-odd'">
          <td>{{ item.index }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.floor }}</td>
          <td>{{ item.room }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.time }}</td>
          <td class="align-center justify-center">
            <v-select
              v-model="item.status"
              :items="['รอ', 'อนุมัติ', 'ยกเลิก']"
              variant="outlined"
              density="compact"
              class="cl-dropd mt-6"
            ></v-select>
          </td>

          <td>
            <v-btn
              color="#F5EDED"
              @click="showDialog(item)"
              icon="mdi-magnify"
              width="40"
              height="40"
              class="rd-btndetail ms-1"
            ></v-btn>
          </td>
          <td>
            <v-checkbox
              v-model="item.keyReceived"
              density="compact"
              hide-details
              class="custom-checkbox"
            ></v-checkbox>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>

  <v-dialog v-model="dialog" max-width="500px" max-height="600px">
    <v-card class="rd-dialog">
      <span class="head-detailuser">
        <div class="head-detail">
          <strong>ผู้ใช้</strong> {{ selectedItem?.user }}
        </div>
      </span>

      <span class="head-detailname">
        <div class="head-detail">
          <strong>ชื่อ</strong> {{ selectedItem?.name }}
        </div>
      </span>

      <span class="d-flex head-detaildate1">
        <v-row>
          <v-col cols="5">
            <div class="head-detail">
              <strong>วันที่เริ่ม</strong> {{ selectedItem?.date }}
            </div>
          </v-col>
          <v-col>
            <div class="head-detail ms-10">
              <strong>เวลา</strong> {{ selectedItem?.time }}
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex head-detaildate2">
        <v-row>
          <v-col cols="5">
            <div class="head-detail">
              <strong>วันที่จบ</strong> {{ selectedItem?.date }}
            </div>
          </v-col>
          <v-col>
            <div class="head-detail ms-10"><strong>เวลา</strong> 08.30</div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex head-detailfloor">
        <v-row>
          <v-col>
            <div class="head-detail wth-btnedit">
              <strong class="me-1">ชั้น</strong>
              <v-select
                v-if="editMode"
                v-model="editedFloor"
                :items="Object.keys(floorRooms)"
                density="compact"
                variant="outlined"
                @update:modelValue="updateAvailableRooms"
              ></v-select>
              <span v-else>{{ selectedItem?.floor }}</span>
            </div>
          </v-col>
          <v-col>
            <div class="head-detail wth-btnedit">
              <strong class="me-1">ห้อง</strong>
              <v-select
                v-if="editMode"
                v-model="editedRoom"
                :items="availableRooms"
                density="compact"
                variant="outlined"
              ></v-select>
              <span v-else>{{ selectedItem?.room }}</span>
            </div>
          </v-col>
        </v-row>
      </span>

      <span class="d-flex head-detailrepeat">
        <v-row>
          <v-col cols="5">
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
          <strong>รายละเอียด</strong>
        </div>
      </span>

      <v-card-text> </v-card-text>
      <v-card-actions class="d-flex justify-center mb-8">
        <v-btn
          class="rd-btncancel"
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
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // เดือนเริ่มต้นที่ 0
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};

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
  { title: "เพิ่มเติม", key: "more" },
  { title: "รับกุญแจ", key: "keyReceived" },
]);

const data = ref([
  {
    index: 1,
    user: "64160136",
    name: "นวพรรษ สีหาบุตร",
    floor: 3,
    room: "ศึกษากลุ่ม 1",
    date: formatDate("2024-12-17"),
    time: "08:00-10:00",
    status: "รอ",
    keyReceived: false,
  },
  {
    index: 2,
    user: "64160137",
    name: "สมคิด ธรรมวงศ์",
    floor: 4,
    room: "ศึกษากลุ่ม 2",
    date: formatDate("2024-12-12"),
    time: "09:00-11:00",
    status: "อนุมัติ",
    keyReceived: true,
  },
  {
    index: 3,
    user: "64160138",
    name: "กนกพร พันธ์นุช",
    floor: 5,
    room: "ศึกษากลุ่ม 3",
    date: formatDate("2024-12-13"),
    time: "10:00-12:00",
    status: "ยกเลิก",
    keyReceived: false,
  },
  {
    index: 4,
    user: "64160139",
    name: "พรพรรณ ศรีธนู",
    floor: 3,
    room: "ศึกษากลุ่ม 4",
    date: formatDate("2024-12-17"),
    time: "11:00-13:00",
    status: "รอ",
    keyReceived: false,
  },
  {
    index: 5,
    user: "64160140",
    name: "ณัฐวุฒิ ประเสริฐศักดิ์",
    floor: 6,
    room: "STV 1",
    date: formatDate("2024-12-15"),
    time: "12:00-14:00",
    status: "อนุมัติ",
    keyReceived: true,
  },
  {
    index: 6,
    user: "64160141",
    name: "อรอุมา คงสมบูรณ์",
    floor: 4,
    room: "ศึกษากลุ่ม 3",
    date: formatDate("2024-12-17"),
    time: "13:00-15:00",
    status: "รอ",
    keyReceived: false,
  },
  {
    index: 7,
    user: "64160142",
    name: "ธนชัย ศรีวิวัฒน์",
    floor: 5,
    room: "ศึกษากลุ่ม 1",
    date: formatDate("2024-12-17"),
    time: "14:00-16:00",
    status: "ยกเลิก",
    keyReceived: false,
  },
  {
    index: 8,
    user: "64160143",
    name: "ภัทรา สุขสว่าง",
    floor: 3,
    room: "ศึกษากลุ่ม 4",
    date: formatDate("2024-12-18"),
    time: "15:00-17:00",
    status: "อนุมัติ",
    keyReceived: true,
  },
  {
    index: 9,
    user: "64160144",
    name: "วรัญญา สร้างเจริญ",
    floor: 6,
    room: "LIBRA OKE I",
    date: formatDate("2024-12-17"),
    time: "16:00-18:00",
    status: "รอ",
    keyReceived: false,
  },
  {
    index: 10,
    user: "64160145",
    name: "สุทธิชัย วัฒนากร",
    floor: 6,
    room: "Mini Studio",
    date: formatDate("2024-12-20"),
    time: "08:00-16:00",
    status: "อนุมัติ",
    keyReceived: true,
  },
]);

const items = [
  { title: "อนุมัติสถานะการจอง", disabled: true, href: "/" },
  { title: "สถานะห้อง", disabled: false, href: "/manage_room" },
];

const sortedData = computed(() => {
  let sortedItems = [...data.value];

  sortedItems.sort((a, b) => {
    if (a.status === "รอ" && b.status !== "รอ") return -1;
    if (a.status !== "รอ" && b.status === "รอ") return 1;

    if (a.status === "อนุมัติ" && b.status !== "อนุมัติ") return 1;
    if (a.status !== "อนุมัติ" && b.status === "อนุมัติ") return -1;

    return a.index - b.index;
  });

  return sortedItems.map((item, idx) => ({
    ...item,
    index: idx + 1,
  }));
});

interface FloorRooms {
  [key: string]: string[];
}

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

const dialog = ref(false);
const selectedItem = ref<any>(null);
const editMode = ref(false);

const editedFloor = ref<number>(0);
const editedRoom = ref("");

const availableRooms = computed(() => {
  return floorRooms[editedFloor.value as keyof typeof floorRooms] || [];
});

watch(
  () => editedFloor.value,
  (newFloor) => {
    const rooms = floorRooms[newFloor as keyof typeof floorRooms];
    editedRoom.value = rooms ? rooms[0] : "";
  }
);

const showDialog = (item: any) => {
  selectedItem.value = { ...item };
  editedFloor.value = item.floor;
  editedRoom.value = item.room;
  dialog.value = true;
  editMode.value = false;
};

const updateAvailableRooms = () => {
  const rooms = floorRooms.value[editedFloor.value];
  editedRoom.value = rooms ? rooms[0] : "";
};

const toggleEditMode = () => {
  if (editMode.value) {
    selectedItem.value.floor = editedFloor.value;
    selectedItem.value.room = editedRoom.value;
    editMode.value = false;
  } else {
    editMode.value = true;
  }
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

.head-detail {
  font-weight: 300;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 25px;
}

.wth-btnedit {
  width: 150px;
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
}
.rd-btnclose {
  font-weight: 400;
  font-size: 16px;
  background-color: #f0c8a4;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
}
.head-detail {
  font-weight: 300;
  font-size: 18px;
  margin: 10px 0;
}
.rd-test {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #cdbba7; /* กำหนดกรอบของตาราง */
  border-collapse: collapse; /* ให้กรอบรวมกัน */
}
</style>
