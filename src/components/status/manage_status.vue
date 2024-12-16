<template class="back-ground">
  <!-- เรียกใช้ HeaderStudent ข้างบน -->
  <Header_page />

  <v-container fluid class="back-ground ms-kob">

    <v-breadcrumbs :items="items" divider=">">
  <template v-slot:item="{ item }">
    <v-btn
      :disabled="item.disabled"
      @click="router.push(item.href)"
      class="breadcrumb-link pa-0"
    >
      {{ item.title }}
    </v-btn>
  </template>
</v-breadcrumbs>


    <v-data-table
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="data"
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
          <td>{{ item.status }}</td>
          <td>
            <!-- ปุ่มค้นหา icon -->
            <v-btn
              color="#F5EDED"
              @click="showDialog(item)"
              icon="mdi-magnify"
              width="40"
              height="40"
              class="rd-btndetail"
            ></v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>

  <!-- Dialog -->
  <v-dialog v-model="dialog" max-width="500px">
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
          <v-col cols="5">
            <div class="head-detail">
              <strong>ชั้น</strong> {{ selectedItem?.floor }}
            </div>
          </v-col>
          <v-col>
            <div class="head-detail ms-10">
              <strong>ห้อง</strong> {{ selectedItem?.room }}
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

      <span class="d-flex head-detail">
        <div class="head-detail">
          <strong>รายละเอียด</strong>
        </div>
      </span>

      <v-card-text> </v-card-text>
      <v-card-actions class="d-flex justify-center mb-8">
        <v-btn class="rd-btncancel" text="ยกเลิกจอง" @click="dialog = false"
          >ยกเลิกจอง</v-btn
        >
        <v-btn class="rd-btnclose" text="ปิด" @click="dialog = false"
          >ปิด</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();


interface BreadcrumbItem {
  title: string;
  disabled: boolean;
  href?: string;
}

const items: BreadcrumbItem[] = [
  {
    title: "อนุมัติสถานะห้อง",
    disabled: false,
    href: "/manage_status",
  },
  {
    title: "สถานะห้อง",
    disabled: false,
    href: "/manage_room",
  },
];

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
]);

const data = ref([
  {

    index: 1,
    user: "64160136",
    name: "นวพรรษ สีหาบุตร",
    floor: 3,
    room: "ศึกษากลุ่ม 1",
    date: "2024-12-11",
    time: "08:00",
    status: "รอ",
  },
  {
    index: 2,
    user: "64160136",
    name: "นวพรรษ",
    floor: 4,
    room: "ศึกษากลุ่ม 1",
    date: "2024-12-12",
    time: "09:00",
    status: "อนุมัติ",
  },
  {
    index: 3,
    user: "64160136",
    name: "นางสาวนวพรรษ สีหาบุตร",
    floor: 5,
    room: "ศึกษากลุ่ม 1",
    date: "2024-12-13",
    time: "10:00",
    status: "ยกเลิก",
  },
  {
    index: 4,
    user: "64160136",
    name: "Nawapat Seehabut",
    floor: 3,
    room: "ศึกษากลุ่ม 1",
    date: "2024-12-14",
    time: "11:00",
    status: "รอ",
  },
  {
    index: 5,
    user: "64160136",
    name: "นวพรรษ สีหาบุตร",
    floor: 6,
    room: "ศึกษากลุ่ม 1",
    date: "2024-12-15",
    time: "12:00",
    status: "อนุมัติ",
  },
  {
    index: 6,
    user: "64160136",
    name: "นวพรรษ สีหาบุตร",
    floor: 4,
    room: "ศึกษากลุ่ม 1",
    date: "2024-12-16",
    time: "13:00",
    status: "รอ",
  },
  {
    index: 7,
    user: "64160136",
    name: "นวพรรษ สีหาบุตร",
    floor: 5,
    room: "ศึกษากลุ่ม 1",
    date: "2024-12-17",
    time: "14:00",
    status: "ยกเลิก",
  },
  {
    index: 8,
    user: "64160136",
    name: "นวพรรษ สีหาบุตร",
    floor: 3,
    room: "ศึกษากลุ่ม 1",
    date: "2024-12-18",
    time: "15:00",
    status: "อนุมัติ",
  },
  {
    index: 9,
    user: "64160136",
    name: "นวพรรษ สีหาบุตร",
    floor: 6,
    room: "ศึกษากลุ่ม 1",
    date: "2024-12-19",
    time: "16:00",
    status: "รอ",
  },
  {
    index: 10,
    user: "64160136",
    name: "นวพรรษ สีหาบุตร",
    floor: 4,
    room: "ศึกษากลุ่ม 1",
    date: "2024-12-20",
    time: "17:00",
    status: "อนุมัติ",
  },
]);



const dialog = ref(false);
const selectedItem = ref<any>(null);

const showDialog = (item: any) => {
  selectedItem.value = item;
  dialog.value = true; // เปิด dialog
};
</script>

<style scoped>
/* เพิ่มการอ้างอิงฟอนต์ Kanit จาก Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

/* ใช้ฟอนต์ Kanit ทั่วทั้งโปรเจ็กต์ */
* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

/* กำหนดสีพื้นหลังให้กับแถวคี่และแถวคู่ */
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

/* ปรับสีหัวคอลัมน์ */
th {
  background-color: #cdbba7;
  font-weight: bold;
  font-size: 16px;
}

.back-ground {
  background-color: #f9f3ea;
}

.ms-kob {
  margin-top: -600px;
}

.breadcrumb-link {
  text-decoration: none;
  color: #493628 !important; /* สีข้อความ */
  font-weight: 600;
  background: transparent !important; /* พื้นหลังโปร่งใส */
  box-shadow: none !important; /* ลบเงาปุ่ม */
  border: none !important; /* ลบเส้นขอบ */
  outline: none !important; /* ลบเส้นโฟกัส */
  cursor: pointer; /* เปลี่ยนเป็นลูกศรเมื่อชี้ */
  padding: 0; /* ไม่มี padding เพื่อให้เหมือนข้อความ */
  min-width: 0; /* ไม่มีขนาดปุ่ม */
  height: auto; /* ปรับความสูงตามข้อความ */
}

.breadcrumb-link:hover {
  text-decoration: underline; /* ขีดเส้นใต้เมื่อ hover */
  background: transparent !important; /* ไม่เปลี่ยนพื้นหลัง */
}

.breadcrumb-link:focus {
  outline: none !important; /* ลบโฟกัส */
}

.breadcrumb-link:active {
  box-shadow: none !important; /* ไม่มีเงาตอนคลิก */
  transform: none !important; /* ไม่มีเอฟเฟกต์ตอนคลิก */
}


.head-detail {
  font-weight: 300;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 25px;
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

.rd-btncancel {
  font-weight: 400;
  font-size: 16px;
  color: #493628;
  background-color: #ea8a8a;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  margin-right: 30px;
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
}

.v-data-table {
  overflow: visible !important;
}
</style>
