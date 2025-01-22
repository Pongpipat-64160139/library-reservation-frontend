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
    <!-- ตารางสำหรับชั้น 6 ห้อง ศึกษากลุ่มมัลติมีเดีย (STV) -->
    <h1 class="pt-5 head-title pb-10 ml-left">
      ชั้น 6 ห้อง ศึกษากลุ่มมัลติมีเดีย (STV)
      <v-icon class="mb-1 ms-2"> mdi-multimedia </v-icon>
    </h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="font-table">เวลา</th>
            <th
              v-for="room in stv"
              :key="room.roomId"
              class="room-column font-table"
            >
              {{ room.roomName }}
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
              v-for="(room, roomIndex) in stv"
              :key="roomIndex"
              class="room9-column"
              :class="getCellClass(room.roomId, time)?.class"
              :rowspan="getCellClass(room.roomId, time)?.rowspan"
              v-show="!getCellClass(room.roomId, time)?.isHidden"
              @click="selectRoom(room.roomId)"
            >
              {{ getCellClass(room.roomId, time)?.text }}
              <a
                :href="generateBookingLink(roomIndex, time, 6, 'stv')"
                class="table-link"
              ></a>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง LIBRA OKE -->
    <h1 class="pt-5 head-title pb-10 ml-left">
      ชั้น 6 ห้อง LIBRA OKE
      <v-icon class="mb-1 ms-2"> mdi-microphone-variant </v-icon>
    </h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th v-for="room in oke" :key="room.roomId" class="font-table">
              {{ room.roomName }}
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
              v-for="(room, roomIndex) in oke"
              :key="roomIndex"
              class="room2-column"
              :class="getCellClass(room.roomId, time)?.class"
              :rowspan="getCellClass(room.roomId, time)?.rowspan"
              v-show="!getCellClass(room.roomId, time)?.isHidden"
              @click="selectRoom(room.roomId)"
            >
              {{ getCellClass(room.roomId, time)?.text }}
              <a
                :href="generateBookingLink(roomIndex, time, 6, 'oke')"
                class="table-link"
              ></a>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง Mini Theater -->
    <h1 class="pt-5 head-title pb-10 ml-left">
      ชั้น 6 ห้อง MINI THEATER
      <v-icon class="mb-1 ms-2"> mdi-theater </v-icon>
    </h1>

    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th
              v-for="room in minitheater"
              :key="room.roomId"
              class="font-table"
            >
              {{ room.roomName }}
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
              v-for="(room, roomIndex) in minitheater"
              :key="roomIndex"
              class="room1-column"
              :class="getCellClass(room.roomId, time)?.class"
              :rowspan="getCellClass(room.roomId, time)?.rowspan"
              v-show="!getCellClass(room.roomId, time)?.isHidden"
              @click="selectRoom(room.roomId)"
            >
              {{ getCellClass(room.roomId, time)?.text }}
              <a
                :href="generateBookingLink(roomIndex, time, 6, 'minitheater')"
                class="table-link"
              ></a>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </v-container>
  <Footer_page />
</template>

<script lang="ts" setup>
// ---------------------
// Import Modules
// ---------------------

// Vue Composition API - ใช้สำหรับการจัดการสถานะภายใน Component
import { ref, onMounted, computed, watch } from "vue";

// Vue Router - ใช้สำหรับการนำทางในแอปพลิเคชัน
import { useRouter } from "vue-router";

// Stores - ใช้สำหรับดึงข้อมูลและจัดการสถานะเกี่ยวกับห้องและการจอง
import { useRoomStore } from "@/stores/roomStore";
import { useNormalRoomBookStore } from "@/stores/nrbStore";

/* ---------------------
   Reactive Data Properties
   --------------------- */

// ตัวแปรควบคุมการแสดง DatePicker
const showDatePicker = ref(false);

// ตัวแปรเก็บวันที่ปัจจุบันในรูปแบบของ string
const currentDate = ref("");

// ตัวแปรเก็บวันที่ที่ผู้ใช้เลือกในรูปแบบ string หรือ null
const selectedDate = ref<string | null>(null);

// ตัวแปรเก็บวันหยุดที่ได้รับจาก API หรือข้อมูล
const holidays = ref<string[]>([]);

// ตัวแปรเก็บวันที่ที่ทำการจองปัจจุบัน
const currentReserveDate = ref<string>();

/* ---------------------
   Store Initialization
   --------------------- */

// ใช้ store เพื่อดึงข้อมูลเกี่ยวกับห้องประชุม
const roomStore = useRoomStore();

// ใช้ store เพื่อจัดการการจองห้องประชุม
const nrbStore = useNormalRoomBookStore();

const fetchHolidays = async (year: string) => {
  const response = await fetch(
    `https://apigw1.bot.or.th/bot/public/financial-institutions-holidays/?year=2024`,
    {
      headers: {
        "X-IBM-Client-Id": "516eaa15-07e4-428c-b4bf-84def4ea69ab",
        accept: "application/json",
      },
    }
  );

  if (response.ok) {
    const responseData = await response.json();
    if (responseData.result && Array.isArray(responseData.result.data)) {
      holidays.value = responseData.result.data.map(
        (holiday: { Date: string }) => holiday.Date
      );
    } else {
      console.error("Invalid data structure:", responseData);
    }
  } else {
    console.error("Failed to fetch holidays");
  }
};

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
    const currentYear = new Date().getFullYear().toString();
    fetchHolidays(currentYear);
    await roomStore.filteredEntertainRooms();
    await getCurrentReserveDate();
    await loadedReserveRoom(currentReserveDate.value!);
  } catch (error) {
    console.error("Error loading data:", error);
  }
});

// จะกำหนดวันที่ปัจจุบันให้กับ currentReserveDate ถ้ายังไม่ได้เลือกวันที่
function getCurrentReserveDate() {
  if (selectedDate.value === null) {
    const today = new Date(); // สร้างออบเจ็กต์วันที่ปัจจุบัน
    const year = today.getFullYear(); // ดึงค่าปีปัจจุบัน (เช่น 2024)
    const month = String(today.getMonth() + 1).padStart(2, "0"); // ดึงค่าเดือน (เริ่มที่ 0 จึงต้อง +1) และแปลงให้เป็น 2 หลัก
    const day = String(today.getDate()).padStart(2, "0"); // ดึงค่าวัน และแปลงให้เป็น 2 หลัก

    // จัดรูปแบบวันที่ในรูปแบบ "YYYY-MM-DD" และกำหนดให้ตัวแปร currentReserveDate
    currentReserveDate.value = `${year}-${month}-${day}`;

    // แสดงผลวันที่ที่จองในคอนโซล
    console.log("Reserve Date: " + currentReserveDate.value);

    // ส่งค่ากลับ currentReserveDate เพื่อใช้ในภายหลัง
    return currentReserveDate;
  }
}
// โหลดข้อมูลการจองห้องของวัน เดือน ปี นั้นๆ
async function loadedReserveRoom(selectedDate: string) {
  const loadedRoom = await nrbStore.getStatusReserve(selectedDate);
  nrbStore.bookings = loadedRoom;
}
// แสดงข้อมูลการจองห้อง ทั้งหมดในตารางนั้นๆ
function getCellClass(roomId: number, time: string) {
  const bookings = nrbStore.bookings; // ดึงรายการจองทั้งหมด
  const isBook = bookings.find(
    (b) => b.room_id === roomId && time >= b.start_time && time <= b.end_time
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
        text: `${isBook.user_name}`, // ข้อความที่แสดงในเซลล์
      };
    } else if (
      bookings.find((book) => book.room_id === roomId && book.re_status == "รอ")
    ) {
      return {
        class: "booked text-username",
        rowspan: endIndex - startIndex + 1, // คำนวณจำนวนแถวที่ต้องรวม
        isStart: true, // ระบุว่าเป็นแถวแรก
        isHidden: false, // ไม่ต้องซ่อนแถว
        text: `${isBook.user_name}`,
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

// ฟังก์ชันแปลงรูปแบบวันที่ให้เป็นรูปแบบ YYYY-MM-DD จาก input ประเภท Date หรือ string
function formatDate(date: Date | string) {
  // แปลงค่า input ให้เป็นออบเจ็กต์ Date
  const d = new Date(date);

  // ตรวจสอบว่าค่าวันที่ถูกต้องหรือไม่ ถ้าไม่ใช่จะส่งข้อความแจ้งข้อผิดพลาดและคืนค่า "Invalid date"
  if (isNaN(d.getTime())) {
    console.error("Invalid date input for formatDate:", date);
    return "Invalid date"; // กรณีวันที่ไม่ถูกต้อง ส่งค่า error string กลับ
  }

  // ดึงค่า "ปี" ค.ศ. จากวันที่
  const year = d.getFullYear();

  // ดึงค่า "เดือน" โดยต้อง +1 เพราะ getMonth() ให้ค่าเดือนเริ่มต้นที่ 0 (มกราคม = 0)
  // และใช้ padStart(2, "0") เพื่อให้ได้รูปแบบสองหลัก เช่น "01", "02"
  const month = String(d.getMonth() + 1).padStart(2, "0");

  // ดึงค่า "วัน" และแปลงให้อยู่ในรูปแบบสองหลัก เช่น "01", "02"
  const day = String(d.getDate()).padStart(2, "0");

  // คืนค่ารูปแบบวันที่ในรูปแบบ "YYYY-MM-DD"
  return `${year}-${month}-${day}`;
}

/* ---------------------------------
   Watcher: ตรวจสอบการเปลี่ยนแปลงของ selectedDate
--------------------------------- */

// ฟังก์ชัน watch() จะทำงานเมื่อ selectedDate มีการเปลี่ยนแปลงค่า
watch(selectedDate, (newDate) => {
  // เรียกใช้ฟังก์ชัน formatDate เพื่อแปลงวันที่ใหม่ให้อยู่ในรูปแบบที่กำหนด
  const formattedDate = formatDate(newDate!);

  // อัปเดตค่าของตัวแปร currentReserveDate ด้วยวันที่ที่แปลงแล้ว
  currentReserveDate.value = formattedDate;

  // แสดงผลวันที่ที่ถูกเลือกและแปลงแล้วในคอนโซลเพื่อใช้ตรวจสอบ
  console.log(currentReserveDate.value);

  // เรียกฟังก์ชันโหลดข้อมูลการจองใหม่ตามวันที่ที่ผู้ใช้เลือก
  loadedReserveRoom(formattedDate);
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

const stv = computed(() => roomStore.stvRooms);
const oke = computed(() => roomStore.okeRooms);
const minitheater = computed(() => roomStore.miniTheater);

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

const goToFormStudy = () => {
  router.push("/booking_study");
};
async function selectRoom(roomIndex: number) {
  const rooms = roomStore.entertainRooms;

  // ตรวจสอบว่า rooms มีค่าและเป็นอาร์เรย์
  if (!rooms || !Array.isArray(rooms)) {
    console.error("roomStore.entertainRooms is undefined or not an array");
    return;
  }

  const selectedRoom = rooms.find((room) => room?.roomId === roomIndex);

  if (selectedRoom) {
    roomStore.setCurrentRoom({
      roomId: selectedRoom.roomId,
      roomName: selectedRoom.roomName,
      capacity: selectedRoom.capacity,
      maxHours: selectedRoom.maxHours,
      roomStatus: selectedRoom.roomStatus,
      roomType: selectedRoom.roomType,
      roomMinimum: selectedRoom.roomMinimum,
      orderFood: selectedRoom.orderFood,
      floorId: selectedRoom.floorId,
    });
    console.log("Selected Room:", roomStore.currentTypeRoom);
  } else {
    console.warn(`Room with ID ${roomIndex} not found!`);
  }
}

const generateBookingLink = (
  roomIndex: number,
  time: string,
  floor: number,
  roomType: string
) => {
  let roomName = "";

  const rooms =
    roomType === "stv"
      ? stv.value
      : roomType === "oke"
      ? oke.value
      : roomType === "minitheater"
      ? minitheater.value
      : [];

  if (rooms[roomIndex]?.roomName) {
    roomName = rooms[roomIndex].roomName;
  } else {
    console.error(
      `Invalid room data for roomType=${roomType}, index=${roomIndex}`
    );
    roomName = "Unknown Room";
  }

  // ส่งข้อมูล roomType, floor และ roomName
  return `/booking_study?floor=${floor}&roomName=${encodeURIComponent(
    roomName
  )}&time=${time}&roomType=Entertain`;
};
</script>
-

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.text-username {
  font-size: 14px;
}

.booked {
  background-color: rgb(196, 196, 196); /* สีสำหรับสถานะ "รอ" */
  color: #493628; /* เปลี่ยนสีตัวอักษรถ้าจำเป็น */
  text-align: center !important; /* จัดกลางแนวนอน */
  vertical-align: middle !important; /* จัดกลางแนวตั้ง */
  display: table-cell !important; /* ทำให้แน่ใจว่าเป็นเซลล์ของตาราง */
  height: 100% !important; /* ใช้พื้นที่เต็ม */
}

.confirmed {
  background-color: #b5cfb7; /* สีเขียวสำหรับการจอง */
  color: #493628; /* เปลี่ยนสีตัวอักษรถ้าจำเป็น */
  text-align: center;
  vertical-align: middle !important; /* จัดกลางแนวตั้ง */
  display: table-cell !important; /* ทำให้แน่ใจว่าเป็นเซลล์ของตาราง */
  height: 100% !important; /* ใช้พื้นที่เต็ม */
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
  margin-top: -600px;
}

.ms-minustop {
  margin-top: -40px;
}

.ml-left {
  margin-left: 240px;
}

.table-bordered td {
  position: relative;
  z-index: 1;
}

.row-even,
.row-odd {
  cursor: pointer;
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

.v-menu .v-text-field {
  height: 57px;
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
  margin-left: 50px;
  font-size: 20px;
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
