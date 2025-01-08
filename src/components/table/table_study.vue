<template>
  <Header_page />
  <v-container fluid class="back-ground ms-kob">
    <v-container>
      <v-row justify="center" align="center">
        <!-- Dropdown เลือกประเภทห้อง -->
        <v-col
          class="d-flex justify-center"
          cols="auto"
          style="margin-right: 100px"
        >
          <v-select
            v-model="selectedPage"
            class="width-dd v-selectcolor"
            label="ประเภทห้อง"
            :items="typeroom"
            @update:model-value="onSelectChange"
          />
        </v-col>

        <!-- ช่องสำหรับปุ่มแสดงวันที่ -->
        <v-col class="d-flex justify-center" cols="auto">
          <v-btn class="btn-date" @click="showDatePicker = !showDatePicker">
            {{
              selectedDate
                ? new Date(selectedDate).toLocaleDateString("th-TH", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : new Date().toLocaleDateString("th-TH", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
            }}
            <v-icon class="calendar-icon"> mdi-calendar </v-icon>
          </v-btn>

          <v-date-picker
            v-if="showDatePicker"
            v-model="selectedDate"
            class="date-picker-position"
            :allowed-dates="allowedDates"
            :day-class="getDayClass"
            @update:model-value="handleDateSelect"
            @click:clear="selectedDate = null"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- ตารางสำหรับชั้น 3 -->
    <h1 class="pt-5 head-title pb-10 ml-left">
      ชั้น 3 ห้อง ศึกษากลุ่ม
      <v-icon class="mb-1 ms-2"> mdi-account-group </v-icon>
    </h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="font-table">เวลา</th>
            <th
              v-for="(room, index) in rooms3"
              :key="room.roomId"
              class="room-column font-table"
            >
              {{ room.roomName }}
              <v-icon class="ms-2"> mdi-television </v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, timeIndex) in timeSlots"
            :key="time"
            :class="timeIndex % 2 === 0 ? 'row-even' : 'row-odd'"
          >
            <td class="time-column font-table">
              {{ time }}
            </td>
            <td
              v-for="(room, roomIndex) in rooms3"
              :key="roomIndex"
              class="room6-column"
            >
              <a
                :href="generateBookingLink(roomIndex, time, 3)"
                class="table-link"
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 4 -->
    <h1 class="pt-5 head-title pb-10 ml-left">
      ชั้น 4 ห้อง ศึกษากลุ่ม
      <v-icon class="mb-1 ms-2"> mdi-account-group </v-icon>
    </h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th
              v-for="(room, index) in rooms4"
              :key="room.roomId"
              class="font-table"
            >
              {{ room.roomName }}
              <v-icon v-if="index === 3 || index === 4" class="ms-2">
                mdi-television
              </v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, timeIndex) in timeSlots"
            :key="time"
            :class="timeIndex % 2 === 0 ? 'row-even' : 'row-odd'"
          >
            <td class="time-column font-table">
              {{ time }}
            </td>
            <td
              v-for="(room, roomIndex) in rooms4"
              :key="roomIndex"
              class="room5-column"
            >
              <a
                :href="generateBookingLink(roomIndex, time, 4)"
                class="table-link"
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 5 -->
    <h1 class="pt-5 head-title pb-10 ml-left">
      ชั้น 5 ห้อง ศึกษากลุ่ม
      <v-icon class="mb-1 ms-2"> mdi-account-group </v-icon>
    </h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th
              v-for="(room, index) in rooms5"
              :key="room.roomId"
              class="font-table"
            >
              {{ room.roomName }}
              <v-icon v-if="index === 3 || index === 4" class="ms-2">
                mdi-television
              </v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, timeIndex) in timeSlots"
            :key="time"
            :class="timeIndex % 2 === 0 ? 'row-even' : 'row-odd'"
          >
            <td class="time-column font-table">
              {{ time }}
            </td>
            <td
              v-for="(room, roomIndex) in rooms5"
              :key="roomIndex"
              class="room5-column"
            >
              <a
                :href="generateBookingLink(roomIndex, time, 5)"
                class="table-link"
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </v-container>
  <Footer_page />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Footer_page from "../footer/footer_page.vue";
import { useRoomStore } from "@/stores/roomStore";
import { useHolidayStore } from "@/stores/holidayStore";
const showDatePicker = ref(false);
const currentDate = ref("");
const selectedDate = ref<string | null>(null);
const holidays = ref<string[]>([]);
const roomStore = useRoomStore();
const holidayStore = useHolidayStore();
// const fetchHolidays = async (years: string[]) => {
//   const holidayPromises = years.map(async (year) => {
//     const response = await fetch(
//       `https://apigw1.bot.or.th/bot/public/financial-institutions-holidays/?year=${year}`,
//       {
//         headers: {
//           "X-IBM-Client-Id": "516eaa15-07e4-428c-b4bf-84def4ea69ab",
//           accept: "application/json",
//         },
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       if (responseData.result && Array.isArray(responseData.result.data)) {
//         return responseData.result.data.map(
//           (holiday: { Date: string }) => holiday.Date
//         );
//       } else {
//         console.error(`Invalid data structure for year ${year}:`, responseData);
//         return [];
//       }
//     } else {
//       console.error(`Failed to fetch holidays for year ${year}`);
//       return [];
//     }
//   });

//   const results = await Promise.all(holidayPromises);
//   holidays.value = results.flat(); // รวมวันหยุดจากทุกปี
// };

const allowedDates = (date: unknown) => {
  if (!(date instanceof Date)) return false;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const isHoliday = holidays.value.includes(formattedDate);

  return !isHoliday;
};

onMounted(async () => {
  try {
    const currentYear = new Date().getFullYear();
    const pastYears = 10; // จำนวนปีที่ดึงข้อมูลย้อนหลัง
    const years = Array.from({ length: pastYears + 1 }, (_, i) =>
      (currentYear - i).toString()
    );

    // เรียก API เพื่อดึงข้อมูลห้อง
    await roomStore.getRoomGroupStudy();
    console.log(
      "Room data loaded:",
      roomStore.studyFloor3,
      roomStore.studyFloor4,
      roomStore.studyFloor5
    );

    // เรียก API เพื่อดึงข้อมูลวันหยุดย้อนหลัง
    await holidayStore.getAllHolidayInYear(years);
    console.log("Current year: " + currentYear);
    // await fetchHolidays(years);
    // console.log(`Holidays loaded for years ${years.join(", ")}:`, holidays.value);
  } catch (error) {
    console.error("Error during onMounted:", error);
  }
});

const getDayClass = (day: { date: Date }) => {
  const date = new Date(day.date);
  const formattedDay = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const isHoliday = holidays.value.includes(formattedDay);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  return isHoliday || isWeekend ? "holiday" : "";
};

const handleDateSelect = (date: string | null) => {
  selectedDate.value = date;
  showDatePicker.value = false;
};

const getCurrentDate = () => {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("th-TH", options);
  currentDate.value = formatter.format(date);
};

getCurrentDate();

const router = useRouter();
const selectedPage = ref("Group Study Room");

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
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
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

const rooms3 = computed(() => roomStore.studyFloor3);
const rooms4 = computed(() => roomStore.studyFloor4);
const rooms5 = computed(() => roomStore.studyFloor5);

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const generateBookingLink = (
  roomIndex: number,
  time: string,
  floor: number
) => {
  let roomName = "";

  const rooms =
    floor === 3
      ? rooms3.value
      : floor === 4
      ? rooms4.value
      : floor === 5
      ? rooms5.value
      : [];

  if (Array.isArray(rooms) && rooms[roomIndex]?.roomName) {
    roomName = rooms[roomIndex].roomName;
  } else {
    console.error(
      `Room data is invalid for floor=${floor}, roomIndex=${roomIndex}`
    );
    roomName = "Unknown Room";
  }

  // สร้างลิงก์
  return `/booking_study?floor=${floor}&room=${
    roomIndex + 1
  }&time=${time}&roomName=${encodeURIComponent(roomName)}`;
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

.room6-column {
  width: calc(100% / 6);
}

.room5-column {
  width: calc(100% / 5);
}

.table-bordered td {
  height: 20px; /* ความสูงของเซลล์ */
  padding: 0; /* กำจัด Padding */
  text-align: center;
  vertical-align: middle; /* จัดข้อความให้อยู่กลาง */
  overflow: hidden;
  position: relative; /* เพื่อให้ลูกของ td อยู่ในตำแหน่งที่สัมพันธ์กัน */
}

.table-link {
  display: block; /* ให้คลุมพื้นที่ทั้งหมดของเซลล์ */
  height: 100%; /* ความสูงเต็มเซลล์ */
  width: 100%; /* ความกว้างเต็มเซลล์ */
  text-decoration: none; /* ลบเส้นใต้ */
  background-color: transparent; /* ไม่มีพื้นหลังเริ่มต้น */
  font-size: 12px;
}

.table-link:hover {
  background-color: #edb3bc; /* สีพื้นหลังเมื่อชี้เมาส์ */
}

.table-bordered thead th {
  background-color: #ead8c0;
  font-weight: bold;
}

.table-bordered td {
  position: relative;
  z-index: 1;
}

.row-even {
  background-color: #f5eded;
}

.row-odd {
  background-color: #e2dad6;
}

.row-even,
.row-odd {
  cursor: pointer;
}

.ms-kob {
  margin-top: -600px;
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
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.v-selectcolor {
  background-color: #f5eded;
  border: 1px solid #493628;
  height: 57px;
  border-radius: 5px;
}

.date-picker-position {
  position: absolute;
  top: 190px;
  left: 500;
  z-index: 1000;
  background-color: #f5eded;
  box-shadow: 0px 10px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #493628;
  width: 300px;
  height: 440px;
  color: #493628;
}

.btn-date {
  width: 300px;
  background-color: #f5eded;
  border: 1px solid #493628;
  height: 57px;
  border-radius: 5px;
}

.calendar-icon {
  margin-left: 10px;
  font-size: 20px;
  color: #493628;
}

.v-date-picker :deep(.v-btn) {
  font-size: 10px !important;
  width: 20px !important;
  height: 20px !important;
  border-radius: 100% !important;
}

.v-date-picker :deep(.v-picker-title) {
  font-size: 15px !important;
  margin-top: 10px;
}
</style>
