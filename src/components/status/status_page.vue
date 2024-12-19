<template>
  <Header_page />

  <v-container fluid class="back-ground ms-kob">
    <h1 class="pt-5 head-title text-center pb-10">สถานะการจอง</h1>

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

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

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

const sortedData = computed(() => {
  return [...data.value].sort((a, b) => {
    if (a.status === "รอ" && b.status !== "รอ") return -1;
    if (a.status !== "รอ" && b.status === "รอ") return 1;
    return 0;
  });
});

const dialog = ref(false);
const selectedItem = ref<any>(null);

const showDialog = (item: any) => {
  selectedItem.value = item;
  dialog.value = true;
};

export default defineComponent({
  setup() {
    return {
      sortBy,
      headers,
      data: sortedData,
      dialog,
      selectedItem,
      showDialog,
    };
  },
});
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
  border: 1px solid #cdbba7; /* กำหนดกรอบของตาราง */
  border-collapse: collapse; /* ให้กรอบรวมกัน */
}
</style>
