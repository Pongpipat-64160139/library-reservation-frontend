<template>
  <Header_page />
  <v-container fluid class="back-ground ms-kob">
    <v-container>
      <v-row>
        <!-- Dropdown สำหรับเลือกประเภทห้อง -->
        <v-col>
          <v-select
            class="width-dd v-selectcolor"
            label="Select room type"
            :items="typeroom"
            v-model="selectedPage"
            @update:modelValue="onSelectChange"
          >
          </v-select>
        </v-col>
      </v-row>
    </v-container>
    <!-- ตารางสำหรับชั้น 2 ห้อง 201 -->
    <h1 class="pt-5 head-title pb-10 ml-left">ชั้น 2 ห้อง 201</h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="font-table">เวลา</th>
            <th
              class="room-column font-table"
              v-for="room in twozo"
              :key="room"
            >
              {{ room }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, index) in timeSlots"
            :key="time"
            :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
          >
            <td class="time-column font-table">{{ time }}</td>
            <td class="room1-column" v-for="room in twozo" :key="room"></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 5 ห้อง Lecturer's Room -->
    <h1 class="pt-5 head-title pb-10 ml-left">ชั้น 5 ห้อง Lecturer's Room</h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th class="font-table" v-for="room in lecture" :key="room">
              {{ room }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, index) in timeSlots"
            :key="time"
            :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
          >
            <td class="time-column font-table">{{ time }}</td>
            <td class="room3-column" v-for="room in lecture" :key="room"></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง 604 Smart Board -->
    <h1 class="pt-5 head-title pb-10 ml-left">ชั้น 6 ห้อง 604 Smart Board</h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th class="font-table" v-for="room in smartboard" :key="room">
              {{ room }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, index) in timeSlots"
            :key="time"
            :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
          >
            <td class="time-column font-table">{{ time }}</td>
            <td
              class="room1-column"
              v-for="room in smartboard"
              :key="room"
            ></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง Mini Studio -->
    <h1 class="pt-5 head-title pb-10 ml-left">ชั้น 6 ห้อง Mini Studio</h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th class="font-table" v-for="room in ministudio" :key="room">
              {{ room }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, index) in timeSlots"
            :key="time"
            :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
          >
            <td class="time-column font-table">{{ time }}</td>
            <td
              class="room1-column"
              v-for="room in ministudio"
              :key="room"
            ></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง Cyber Zone -->
    <h1 class="pt-5 head-title pb-10 ml-left">ชั้น 6 ห้อง Cyber Zone</h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th class="font-table" v-for="room in cyberzone" :key="room">
              {{ room }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, index) in timeSlots"
            :key="time"
            :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
          >
            <td class="time-column font-table">{{ time }}</td>
            <td class="room2-column" v-for="room in cyberzone" :key="room"></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง Live for Life -->
    <h1 class="pt-5 head-title pb-10 ml-left">ชั้น 6 ห้อง Live for Life</h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th class="font-table" v-for="room in liveforlife" :key="room">
              {{ room }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, index) in timeSlots"
            :key="time"
            :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
          >
            <td class="time-column font-table">{{ time }}</td>
            <td class="room1-column" v-for="room in liveforlife" :key="room">
              <!-- เพิ่มเนื้อหาหรือปุ่มในช่องนี้ได้ -->
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 7 ห้อง ประชุมบุคลากรภายใน -->
    <h1 class="pt-5 head-title pb-10 ml-left">
      ชั้น 7 ห้อง ประชุมบุคลากรภายใน
    </h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th class="font-table" v-for="room in sevenfloor" :key="room">
              {{ room }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, index) in timeSlots"
            :key="time"
            :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
          >
            <td class="time-column font-table">{{ time }}</td>
            <td class="room2-column" v-for="room in sevenfloor" :key="room">
              <!-- เพิ่มเนื้อหาหรือปุ่มในช่องนี้ได้ -->
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedPage = ref("Meeting Room");

const timeSlots = [
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
];

const typeroom = [
  {
    title: "Group Study Room",
    icon: "mdi-account-group",
    to: "/table_study",
  },
  {
    title: "Entertain Room",
    icon: "mdi-movie-roll",
    link: "/table_entertain",
  },
  {
    title: "Meeting Room",
    icon: "mdi-laptop-account",
    link: "/table_meeting",
  },
];

const twozo = ["ห้อง 201"];
const lecture = ["ห้อง 1", "ห้อง 2", "ห้อง 3"];
const smartboard = ["ห้อง 604 Smart Board"];
const ministudio = ["ห้อง Mini Studio"];
const cyberzone = ["ห้อง Cyber Zone |", "ห้อง Cyber Zone ||"];
const liveforlife = ["ห้อง Live for Life"];
const sevenfloor = ["ห้อง 706", "ห้อง 707"];

const onSelectChange = (value: string) => {
  console.log("Selected value:", value);
  if (value === "Group Study Room") {
    console.log("Navigating to HelloWorld");
    router.push("/table_study");
  } else if (value === "Entertain Room") {
    console.log("Navigating to page2");
    router.push("/table_entertain");
  } else if (value === "Meeting Room") {
    console.log("Navigating to page2");
    router.push("/table_meeting");
  }
};
</script>

<style scoped>
/* เพิ่มการอ้างอิงฟอนต์ Kanit จาก Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.head-title {
  font-weight: 600;
  font-size: 20px;
}

.font-table {
  font-weight: 400;
  font-size: 12px;
}

.table-bordered {
  border-collapse: collapse;
  width: 100%;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #493628;
  text-align: center;
  padding: 0px;
}

.time-column {
  width: 300px;
  background-color: #ead8c0;
}

.room1-column {
  width: calc(100% / 1);
}

.room2-column {
  width: calc(100% / 2);
}

.room3-column {
  width: calc(100% / 3);
}

.room6-column {
  width: calc(100% / 6);
}

.room5-column {
  width: calc(100% / 5);
}

.room9-column {
  width: calc(100% / 9);
}

.table-bordered thead th {
  background-color: #ead8c0;
  font-weight: bold;
}

.row-even {
  background-color: #f5eded;
}

.row-odd {
  background-color: #e2dad6;
}

.ms-kob {
  margin-top: -700px;
}

.ms-minustop {
  margin-top: -40px;
}

.ml-left {
  margin-left: 240px;
}

.width-dd {
  width: 300px;
}

.v-select .v-input__control {
  border-radius: 4px;
}

.back-ground {
  background-color: #f9f3ea;
}

.v-selectcolor {
  background-color: #f5eded;
  border: 1px solid #493628;
  height: 57px;
  border-radius: 5px;
}

.v-menu .v-text-field {
  height: 57px;
}
</style>
