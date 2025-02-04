<template>
  <Header_page />
  <v-container fluid class="back-ground mg-toppage">
    <v-container>
      <v-row justify="center" align="center">
        <!-- Dropdown สำหรับเลือกประเภทของห้อง -->
        <v-col class="d-flex justify-center" cols="auto" style="margin-right: 100px">
          <v-select v-model="selectedPage" class="size-dropdown v-selectcolor" label="ประเภทห้อง" :items="typeroom"
            @update:model-value="onSelectChange" />
        </v-col>

        <!-- ปฏิทินสำหรับเลือกวันที่การจองห้อง -->
        <v-col class="d-flex justify-center" cols="auto">
          <vue-flatpickr v-model="selectedDate" class="text-center btn-date" :config="flatpickrConfig" />
        </v-col>
      </v-row>
    </v-container>

    <!-- ตารางจองห้องชั้น 3 -->
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 3 ห้อง ศึกษากลุ่ม
        <v-icon class="mg-icon"> mdi-account-group </v-icon>
        <div class="color-currently"></div>
        <span class="status-text">กำลังใช้งาน</span>
        <div class="color-waiting ms-5"></div>
        <span class="status-text">รอใช้งาน</span>
      </div>
    </h1>
    <v-container class="mg-btmtbl">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="text-table">เวลา</th>
            <th v-for="(room, index) in rooms3" :key="room.roomId" class="room-column text-table">
              {{ room.roomName }}
              <v-icon class="mg-icontbl"> mdi-television </v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(time, timeIndex) in timeSlots" :key="time" :class="timeIndex % 2 === 0 ? 'row-even' : 'row-odd'">
            <td class="time-column text-table">
              {{ time }}
            </td>
            <td v-for="(room, roomIndex) in rooms3" :key="roomIndex" class="room6-column"
              :class="getCellClass(room.roomId, time)?.class" :rowspan="getCellClass(room.roomId, time)?.rowspan"
              v-show="!getCellClass(room.roomId, time)?.isHidden" @click="selectRoom(roomIndex, 3, time)">
              {{ getCellClass(room.roomId, time)?.text }}
              <a :href="generateBookingLink(roomIndex, time, 3)" class="table-link" />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางจองห้องชั้น 4 -->
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 4 ห้อง ศึกษากลุ่ม
        <v-icon class="mg-icon"> mdi-account-group </v-icon>
        <div class="color-currently"></div>
        <span class="status-text">กำลังใช้งาน</span>
        <div class="color-waiting ms-5"></div>
        <span class="status-text">รอใช้งาน</span>
      </div>
    </h1>
    <v-container class="mg-btmtbl">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column text-table">เวลา</th>
            <th v-for="(room, index) in rooms4" :key="room.roomId" class="text-table">
              {{ room.roomName }}
              <v-icon v-if="index === 3 || index === 4" class="ms-2">
                mdi-television
              </v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(time, timeIndex) in timeSlots" :key="time" :class="timeIndex % 2 === 0 ? 'row-even' : 'row-odd'">
            <td class="time-column text-table">
              {{ time }}
            </td>
            <td v-for="(room, roomIndex) in rooms4" :key="roomIndex" class="room5-column"
              :class="getCellClass(room.roomId, time)?.class" :rowspan="getCellClass(room.roomId, time)?.rowspan"
              v-show="!getCellClass(room.roomId, time)?.isHidden" @click="selectRoom(roomIndex, 4, time)">
              {{ getCellClass(room.roomId, time)?.text }}
              <a :href="generateBookingLink(roomIndex, time, 4)" class="table-link" />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางจองห้องชั้น 5 -->
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 5 ห้อง ศึกษากลุ่ม
        <v-icon class="mg-icon"> mdi-account-group </v-icon>
        <div class="color-currently"></div>
        <span class="status-text">กำลังใช้งาน</span>
        <div class="color-waiting ms-5"></div>
        <span class="status-text">รอใช้งาน</span>
      </div>
    </h1>
    <v-container class="mg-btmtbl">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column text-table">เวลา</th>
            <th v-for="(room, index) in rooms5" :key="room.roomId" class="text-table">
              {{ room.roomName }}
              <v-icon v-if="index === 3 || index === 4" class="ms-2">
                mdi-television
              </v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(time, timeIndex) in timeSlots" :key="time" :class="timeIndex % 2 === 0 ? 'row-even' : 'row-odd'">
            <td class="time-column text-table">
              {{ time }}
            </td>
            <td v-for="(room, roomIndex) in rooms5" :key="roomIndex" class="room5-column"
              :class="getCellClass(room.roomId, time)?.class" :rowspan="getCellClass(room.roomId, time)?.rowspan"
              v-show="!getCellClass(room.roomId, time)?.isHidden" @click="selectRoom(roomIndex, 5, time)">
              {{ getCellClass(room.roomId, time)?.text }}
              <a :href="generateBookingLink(roomIndex, time, 5)" class="table-link" />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </v-container>
  <Footer_page />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import Footer_page from "../footer/footer_page.vue";
import { useRoomStore } from "@/stores/roomStore";
import { useHolidayStore } from "@/stores/holidayStore";
import { useNormalRoomBookStore } from "@/stores/nrbStore";

import VueFlatpickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { Thai } from "flatpickr/dist/l10n/th.js";

const holidays = ref<string[]>([]);
const roomStore = useRoomStore();
const nrbStore = useNormalRoomBookStore();
const holidayStore = useHolidayStore();
const currentReserveDate = ref<string>(); // เก็บวันที่ปัจจุบัน หรือ วันที่ๆ เลือกใหม่และมีการอัพเดทตามตารางตลอด
const router = useRouter();
const selectedPage = ref("Group Study Room");
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

// ฟังก์ชันเปลี่ยนหน้าเมื่อเลือกประเภทห้องใน Dropdown
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

const selectedDate = ref<string | null>(null);

const flatpickrConfig = ref({
  locale: Thai,
  dateFormat: "d-m-Y",
  defaultDate: new Date(),
  minDate: new Date(new Date().getFullYear(), -1, 1),
  maxDate: new Date(new Date().getFullYear() + 1, 11, 31),
  formatDate: (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const thaiYear = date.getFullYear() + 543;
    const formattedDate = new Intl.DateTimeFormat("th-TH", options).format(
      date
    );
    return formattedDate.replace(
      date.getFullYear().toString(),
      thaiYear.toString()
    );
  },
  onChange: (
    selectedDates: Date[],
    dateStr: string,
    instance: { yearElements: any[]; currentYear: number }
  ) => {
    if (selectedDates.length > 0) {
      selectedDate.value = dateStr;
      console.log("Selected date:", dateStr);
    }

    // อัปเดต Dropdown ของปีให้แสดงปีพุทธศักราช (พ.ศ.)
    const updateYearDropdown = () => {
      const yearSelect = instance?.yearElements?.[0]; // ตรวจสอบว่า instance และ yearElements มีค่าหรือไม่
      if (yearSelect && yearSelect.options) {
        yearSelect.value = (instance.currentYear + 543).toString();
        Array.from(yearSelect.options).forEach((option) => {
          const optionYear = parseInt(option.value, 10);
          option.textContent = (optionYear + 543).toString();
        });
      }
    };

    updateYearDropdown();
  },
  onReady: (selectedDates: Date[], dateStr: string, instance: any) => {
    const prevButton = instance.calendarContainer.querySelector(
      ".flatpickr-prev-month"
    );
    const nextButton = instance.calendarContainer.querySelector(
      ".flatpickr-next-month"
    );
    if (prevButton) prevButton.style.display = "none";
    if (nextButton) nextButton.style.display = "none";

    const yearDropdown = instance.calendarContainer.querySelector(
      ".flatpickr-monthDropdown-months ~ .numInputWrapper input"
    );
    if (yearDropdown) {
      const updateYearsToThai = () => {
        const currentYear = parseInt(yearDropdown.value, 10);
        yearDropdown.value = (currentYear + 543).toString();
      };

      updateYearsToThai();
      yearDropdown.addEventListener("change", updateYearsToThai);
    }
  },
  onYearChange: (
    selectedDates: any,
    dateStr: any,
    instance: { yearElements: any[]; currentYear: number }
  ) => {
    const updateYearDropdown = () => {
      const yearSelect = instance.yearElements[0];
      if (yearSelect) {
        // ปรับค่าปีใน dropdown เป็น พ.ศ.
        yearSelect.value = (instance.currentYear + 543).toString();
        Array.from(yearSelect.options).forEach((option) => {
          const optionYear = parseInt(option.value, 10);
          option.textContent = (optionYear + 543).toString();
        });
      }
    };

    updateYearDropdown();
  },
  onMonthChange: (
    selectedDates: any,
    dateStr: any,
    instance: { yearElements: any[]; currentYear: number }
  ) => {
    const updateYearDropdown = () => {
      const yearSelect = instance.yearElements[0];
      if (yearSelect) {
        yearSelect.value = (instance.currentYear + 543).toString();
        Array.from(yearSelect.options).forEach((option) => {
          const optionYear = parseInt(option.value, 10);
          option.textContent = (optionYear + 543).toString();
        });
      }
    };

    updateYearDropdown();
  },
});

function parseThaiDate(thaiDateString: string): Date | null {
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

  const regex = /(\d{1,2}) (\S+) (\d{4})/;
  const match = thaiDateString.match(regex);

  if (!match) return null;

  const [, day, month, year] = match;
  const monthIndex = thaiMonths.indexOf(month);

  if (monthIndex === -1) return null;

  // แปลงปีพุทธศักราชเป็นคริสต์ศักราช
  const christianYear = parseInt(year) - 543;

  return new Date(christianYear, monthIndex, parseInt(day));
}

watch(selectedDate, (newDate) => {
  if (newDate) {
    const parsedDate = parseThaiDate(newDate);
    if (parsedDate && !isNaN(parsedDate.getTime())) {
      const formattedDate = formatDate(parsedDate);
      currentReserveDate.value = formattedDate;
      console.log("Selected New date:", currentReserveDate.value);
      loadedReserveRoom(currentReserveDate.value);
    } else {
      console.error("Invalid date format:", newDate);
    }
  } else {
    console.error("No date selected");
  }
});

function formatDate(date: Date | string) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    console.error("Invalid date input for formatDate:", date);
    return "Invalid date";
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCurrentReserveDate() {
  if (selectedDate.value === null) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    currentReserveDate.value = `${year}-${month}-${day}`;
    console.log("Reserve Date: " + currentReserveDate.value);
    return currentReserveDate;
  }
}

async function loadedReserveRoom(selectedDate: string) {
  const loadedRoom = await nrbStore.getStatusReserve(selectedDate);
  nrbStore.bookings = loadedRoom;
}

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

const rooms3 = computed(() => roomStore.studyFloor3);
const rooms4 = computed(() => roomStore.studyFloor4);
const rooms5 = computed(() => roomStore.studyFloor5);

function selectRoom(roomIndex: number, floor: number, time: string) {
  const rooms =
    floor === 3
      ? roomStore.studyFloor3
      : floor === 4
        ? roomStore.studyFloor4
        : floor === 5
          ? roomStore.studyFloor5
          : [];

  const room = rooms[roomIndex];
  if (room) {
    roomStore.setCurrentRoom({
      roomId: room.roomId,
      roomName: room.roomName,
      capacity: room.capacity,
      maxHours: room.maxHours,
      roomStatus: room.roomStatus,
      roomType: room.roomType,
      roomMinimum: room.roomMinimum,
      orderFood: room.orderFood,
      floorId: room.floorId,
    });
    console.log("Selected Room:", roomStore.currentTypeRoom);
  } else {
    console.error(`Room not found: floor=${floor}, roomIndex=${roomIndex}`);
  }
}

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
    console.log("Current year: ", currentYear);
    await getCurrentReserveDate();
    await loadedReserveRoom(currentReserveDate.value!);
    // เปลี่ยน CurrentType
    // await fetchHolidays(years);
    // console.log(`Holidays loaded for years ${years.join(", ")}:`, holidays.value);
  } catch (error) {
    console.error("Error during onMounted:", error);
  }
});

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
  return `/booking_study?floor=${floor}&room=${roomIndex + 1
    }&time=${time}&roomName=${encodeURIComponent(roomName)}`;
};

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

function getCellClass(roomId: number, time: string) {
  const bookings = nrbStore.bookings; // ดึงรายการจองทั้งหมด
  const isBook = bookings.find(
    (b) =>
      b.room_id === roomId &&
      time >= b.start_time &&
      time <= b.end_time &&
      b.re_status !== "ยกเลิก"
  );

  // หา index ของเวลาเริ่มต้นและสิ้นสุด
  const startIndex = timeSlots.indexOf(isBook?.start_time!);
  const endIndex = timeSlots.indexOf(isBook?.end_time!);
  const currentIndex = timeSlots.indexOf(time);

  // ถ้าไม่มีการจอง
  if (!isBook) {
    // คืนค่าเริ่มต้นหากไม่มีการจอง
    return { class: "", rowspan: 1, isStart: false, isHidden: false, text: "" };
  }
  if (currentIndex === startIndex) {
    if (
      bookings.find(
        (book) => book.room_id === roomId && book.re_status == "อนุมัติ"
      )
    ) {
      return {
        class: "confirmed text-username",
        rowspan: endIndex - startIndex + 1, // คำนวณจำนวนแถวที่ต้องรวม
        isStart: true, // ระบุว่าเป็นแถวแรก
        isHidden: false, // ไม่ต้องซ่อนแถว
        text: `${isBook.userId}`, // ข้อความที่แสดงในเซลล์
      };
    } else if (
      bookings.find((book) => book.room_id === roomId && book.re_status == "รอ")
    ) {
      return {
        class: "booked text-username",
        rowspan: endIndex - startIndex + 1, // คำนวณจำนวนแถวที่ต้องรวม
        isStart: true, // ระบุว่าเป็นแถวแรก
        isHidden: false, // ไม่ต้องซ่อนแถว
        text: `${isBook.userId}`,
      };
    }
  }
  // ถ้าอยู่ภายใต้ช่วงที่ถูกรวมแล้ว
  if (currentIndex > startIndex && currentIndex <= endIndex) {
    return {
      class: "", // ไม่ต้องเปลี่ยนสี เพราะถูกครอบคลุมโดย rowspan
      rowspan: 1, // ค่าเริ่มต้น เพราะเซลล์นี้จะถูกซ่อน
      isStart: false,
      isHidden: true, // ต้องซ่อนเซลล์นี้
      text: "", //
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.text-head {
  font-weight: 600;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 35px;
}

.text-table {
  font-weight: 400;
  font-size: 12px;
}

.mg-icon {
  margin-bottom: 10px;
  margin-left: 5px;
}

.mg-toppage {
  margin-top: -600px;
}

.mg-btmtbl {
  margin-top: -40px;
}

.mg-left {
  margin-left: 170px;
}

.mg-icontbl {
  margin-left: 7px;
}

.size-dropdown {
  width: 300px;
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

.table-bordered td {
  height: 20px;
  /* ความสูงของเซลล์ */
  padding: 0;
  /* กำจัด Padding */
  text-align: center;
  vertical-align: middle;
  /* จัดข้อความให้อยู่กลาง */
  overflow: hidden;
  position: relative;
  /* เพื่อให้ลูกของ td อยู่ในตำแหน่งที่สัมพันธ์กัน */
}

.table-bordered thead th {
  background-color: #ead8c0;
  font-weight: bold;
}

.table-link {
  display: block;
  /* ให้คลุมพื้นที่ทั้งหมดของเซลล์ */
  height: 100%;
  /* ความสูงเต็มเซลล์ */
  width: 100%;
  /* ความกว้างเต็มเซลล์ */
  text-decoration: none;
  /* ลบเส้นใต้ */
  background-color: transparent;
  /* ไม่มีพื้นหลังเริ่มต้น */
  font-size: 12px;
}

.table-link:hover {
  background-color: #edb3bc;
  /* สีพื้นหลังเมื่อชี้เมาส์ */
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

.btn-date {
  width: 300px;
  background-color: #f5eded;
  border: 1px solid #493628;
  height: 57px;
  border-radius: 5px;
  z-index: 1000;
}

.text-username {
  font-size: 14px;
}

.booked {
  background-color: rgb(196, 196, 196);
  /* สีสำหรับสถานะ "รอ" */
  color: #493628;
  /* เปลี่ยนสีตัวอักษรถ้าจำเป็น */
  text-align: center !important;
  /* จัดกลางแนวนอน */
  vertical-align: middle !important;
  /* จัดกลางแนวตั้ง */
  display: table-cell !important;
  /* ทำให้แน่ใจว่าเป็นเซลล์ของตาราง */
  height: 100% !important;
  /* ใช้พื้นที่เต็ม */
}

.confirmed {
  background-color: #a2cda5;
  /* สีเขียวสำหรับการจอง */
  color: #493628;
  /* เปลี่ยนสีตัวอักษรถ้าจำเป็น */
  text-align: center;
  vertical-align: middle !important;
  /* จัดกลางแนวตั้ง */
  display: table-cell !important;
  /* ทำให้แน่ใจว่าเป็นเซลล์ของตาราง */
  height: 100% !important;
  /* ใช้พื้นที่เต็ม */
}

.mg-leftfloor {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mg-rightfloor {
  display: flex;
  align-items: center;
  margin-right: 870px;
  margin-top: -7px;
}

.color-currently {
  width: 15px;
  height: 15px;
  background-color: #a2cda5;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 20px;
}

.color-waiting {
  width: 15px;
  height: 15px;
  background-color: rgb(196, 196, 196);
  border-radius: 50%;
  margin-right: 10px;
}

.status-text {
  font-size: 16px;
  color: #493628;
  font-weight: bold;
}

.flex-header {
  display: flex;
  /* ทำให้เนื้อหาทั้งหมดแสดงในแถวเดียว */
  align-items: center;
  /* จัดให้เนื้อหาตรงกลางในแนวตั้ง */
}
</style>
