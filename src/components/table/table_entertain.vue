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
    <!-- ตารางสำหรับชั้น 6 ห้อง ศึกษากลุ่มมัลติมีเดีย (STV) -->
    <h1 class="pt-5 head-title pb-10 ml-left">
      ชั้น 6 ห้อง ศึกษากลุ่มมัลติมีเดีย (STV)
    </h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="font-table">เวลา</th>
            <th class="room-column font-table" v-for="room in stv" :key="room">
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
            <td class="room9-column" v-for="room in stv" :key="room">
              <!-- เพิ่มเนื้อหาหรือปุ่มในช่องนี้ได้ -->
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง LIBRA OKE -->
    <h1 class="pt-5 head-title pb-10 ml-left">ชั้น 6 ห้อง LIBRA OKE</h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th class="font-table" v-for="room in oke" :key="room">
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
            <td class="room2-column" v-for="room in oke" :key="room">
              <!-- เพิ่มเนื้อหาหรือปุ่มในช่องนี้ได้ -->
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง Mini Theater -->
    <h1 class="pt-5 head-title pb-10 ml-left">ชั้น 6 ห้อง Mini Theater</h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th class="font-table" v-for="room in minitheater" :key="room">
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
            <td class="room1-column" v-for="room in minitheater" :key="room">
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
const selectedPage = ref("Entertain Room");

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

const stv = [
  "STV 1",
  "STV 2",
  "STV 3",
  "STV 4",
  "STV 5",
  "STV 6",
  "STV 7",
  "STV 8",
  "STV 9",
];
const oke = ["ห้อง LIBRA OKE 1", "ห้อง LIBRA OKE 2"];
const minitheater = ["ห้อง Mini Theater"];

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
