<template>
  <Header_page />
  <v-container fluid class="back-ground ms-kob">
    <h1 class="pt-5 head-title text-center pb-10">รายละเอียดห้อง</h1>

    <div v-for="floor in Object.keys(floorRooms)" :key="floor" class="mb-10">
      <h2 class="text-h5 font-weight-bold ms-5 mb-2">ชั้น {{ floor }}</h2>
      <v-data-table
        :headers="headers"
        :items="filteredRooms(Number(floor))"
        class="rd-test"
        style="table-layout: fixed; width: 100%"
        hide-default-footer
        :items-per-page="-1"
      >
        <template v-slot:headers>
          <tr>
            <th style="width: 40%">
              ชื่อห้อง <v-icon left class="ms-2 mg-icon">mdi-door</v-icon>
            </th>
            <th style="width: 40%">
              จำนวนคน
              <v-icon left class="ms-2 mg-icon">mdi-account-group</v-icon>
            </th>
            <th style="width: 20%">
              รับกุญแจ <v-icon left class="ms-2 mg-icon">mdi-key</v-icon>
            </th>
          </tr>
        </template>
        <template v-slot:item="{ item, index }">
          <tr :class="index % 2 === 0 ? 'row-even' : 'row-odd'">
            <td>{{ item.room }}</td>
            <td>{{ item.detail }}</td>
            <td>{{ item.keyPickup }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const headers = [
  { title: "ชื่อห้อง", key: "room" },
  { title: "รายละเอียด", key: "detail" },
  { title: "รับกุญแจ", key: "keyPickup" },
];

const floorRooms = {
  2: ["201"],
  3: ["ศึกษากลุ่ม "],
  4: ["ศึกษากลุ่ม"],
  5: ["ศึกษากลุ่ม", "Lecturer's Room"],
  6: [
    "STV (Netflix)",
    "LIBRA OKE",
    "MINI THEATER",
    "604 Smart Board (Interactive Board)",
    "Mini Studio (ใช้สำหรับ Live - ผลิตสื่อ)",
    "Cyber Zone 1",
    "Cyber Zone 2",
    "Live for Life (ใช้สำหรับ Live - ผลิตสื่อ)",
  ],
  //   7: ["706", "707"],
};

const roomDetails: { [key: string]: string } = {
  "201": "4-6",
  "ศึกษากลุ่ม ": "3-5",
  ศึกษากลุ่ม: "3-5",
  "Lecturer's Room": "3-5",
  "STV (Netflix)": "3-5",
  "LIBRA OKE": "3-5",
  "MINI THEATER": "10-30",
  "604 Smart Board (Interactive Board)": "8-10",
  "Mini Studio (ใช้สำหรับ Live - ผลิตสื่อ)": "อนุญาตใช้บริการ 1 คนขึ้นไป",
  "Cyber Zone 1": "อนุญาตใช้บริการไม่เกิน 70 คน",
  "Cyber Zone 2": "อนุญาตใช้บริการไม่เกิน 30 คน",
  "Live for Life (ใช้สำหรับ Live - ผลิตสื่อ)": "อนุญาตใช้บริการ 3 คนขึ้นไป",
  //   "706": "อนุญาตใช้บริการไม่เกิน 12 คน",
  //   "707": "อนุญาตใช้บริการไม่เกิน 20 คน",
};

const keyPickupDetails: { [key: string]: string } = {
  "201": "ชั้น 2",
  "ศึกษากลุ่ม ": "ชั้น 2",
  ศึกษากลุ่ม: "ชั้น 4",
  "Lecturer's Room": "ชั้น 4",
  "STV (Netflix)": "ชั้น 6",
  "LIBRA OKE": "ชั้น 6",
  "MINI THEATER": "ชั้น 6",
  "604 Smart Board (Interactive Board)": "ชั้น 6",
  "Mini Studio (ใช้สำหรับ Live - ผลิตสื่อ)": "ชั้น 6",
  "Cyber Zone 1": "ชั้น 6",
  "Cyber Zone 2": "ชั้น 6",
  "Live for Life (ใช้สำหรับ Live - ผลิตสื่อ)": "ชั้น 6",
  //   "706": "ชั้น ",
  //   "707": "ชั้น ",
};

const data = ref(
  Object.entries(floorRooms).flatMap(([floor, rooms]) =>
    rooms.map((room) => ({
      room,
      detail: roomDetails[room] || "-",
      keyPickup: keyPickupDetails[room] || "-",
      floor: Number(floor),
    }))
  )
);

const filteredRooms = (floor: number) => {
  return data.value.filter((item) => item.floor === floor);
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.mg-icon {
  margin-bottom: 5px;
}
.ms-kob {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  margin-top: 100px;
}
.head-title {
  font-weight: 600;
  font-size: 24px;
  margin-top: -5px;
  margin-bottom: 0px;
}

.back-ground {
  background-color: #f9f3ea;
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
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

.rd-test {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #cdbba7; /* กำหนดกรอบของตาราง */
  border-collapse: collapse; /* ให้กรอบรวมกัน */
}
</style>
