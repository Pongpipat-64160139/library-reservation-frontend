<template>
  <Header_page />
  <v-container fluid class="back-ground mg-toppage">
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
            class="size-dropdown v-selectcolor"
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
    <!-- ตารางสำหรับชั้น 2 ห้อง 201 -->
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 2 ห้อง 201
        <v-icon class="mg-icon"> mdi-lectern </v-icon>
        <div class="color-currently"></div>
        <span class="status-text">กำลังใช้งาน</span>
        <div class="color-waiting ms-5"></div>
        <span class="status-text">รออนุมัติ</span>
        <div class="color-success ms-5"></div>
        <span class="status-text">ใช้งานเสร็จสิ้น</span>
      </div>
    </h1>
    <v-container class="mg-btmtbl">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="font-table">เวลา</th>
            <th
              v-for="(room, index) in twozo"
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
              v-for="(room, roomIndex) in twozo"
              :key="roomIndex"
              class="room1-column"
              @click="selectRoom(room.roomId)"
            >
              <a
                :href="generateBookingLink(roomIndex, time, 2)"
                class="table-link"
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 5 ห้อง Lecturer's Room -->
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 5 ห้อง Lecturer's Room
        <v-icon class="mg-icon"> mdi-chair-school </v-icon>
        <div class="color-currently"></div>
        <span class="status-text">กำลังใช้งาน</span>
        <div class="color-waiting ms-5"></div>
        <span class="status-text">รออนุมัติ</span>
        <div class="color-success ms-5"></div>
        <span class="status-text">ใช้งานเสร็จสิ้น</span>
      </div>
    </h1>
    <v-container class="mg-btmtbl">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th v-for="room in lecture" :key="room.roomId" class="font-table">
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
              v-for="(room, roomIndex) in lecture"
              :key="roomIndex"
              class="room3-column"
              :class="getCellClass(room.roomId, time)?.class"
              :rowspan="getCellClass(room.roomId, time)?.rowspan"
              v-show="!getCellClass(room.roomId, time)?.isHidden"
              @click="selectRoom(room.roomId)"
            >
              {{ getCellClass(room.roomId, time)?.text }}
              <a
                :href="generateBookingLink(roomIndex, time, 5)"
                class="table-link"
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง 604 Smart Board -->
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 6 ห้อง 604 Smart Board
        <v-icon class="mg-icon">mdi-human-male-board-poll </v-icon>
        <div class="color-currently"></div>
        <span class="status-text">กำลังใช้งาน</span>
        <div class="color-waiting ms-5"></div>
        <span class="status-text">รออนุมัติ</span>
        <div class="color-success ms-5"></div>
        <span class="status-text">ใช้งานเสร็จสิ้น</span>
      </div>
    </h1>
    <v-container class="mg-btmtbl">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th
              v-for="room in smartboard"
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
              v-for="(room, roomIndex) in smartboard"
              :key="roomIndex"
              class="room1-column"
              :class="getCellClass(room.roomId, time)?.class"
              :rowspan="getCellClass(room.roomId, time)?.rowspan"
              v-show="!getCellClass(room.roomId, time)?.isHidden"
              @click="selectRoom(room.roomId)"
            >
              {{ getCellClass(room.roomId, time)?.text }}
              <a
                :href="generateBookingLink(roomIndex, time, 5)"
                class="table-link"
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง Mini Studio -->
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 6 ห้อง Mini Studio
        <v-icon class="mg-icon">mdi-monitor-account </v-icon>
        <div class="color-currently"></div>
        <span class="status-text">กำลังใช้งาน</span>
        <div class="color-waiting ms-5"></div>
        <span class="status-text">รออนุมัติ</span>
        <div class="color-success ms-5"></div>
        <span class="status-text">ใช้งานเสร็จสิ้น</span>
      </div>
    </h1>
    <v-container class="mg-btmtbl">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th
              v-for="room in ministudio"
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
              v-for="(room, roomIndex) in ministudio"
              :key="roomIndex"
              class="room1-column"
              :class="getCellClass(room.roomId, time)?.class"
              :rowspan="getCellClass(room.roomId, time)?.rowspan"
              v-show="!getCellClass(room.roomId, time)?.isHidden"
              @click="selectRoom(room.roomId)"
            >
              {{ getCellClass(room.roomId, time)?.text }}
              <a
                :href="generateBookingLink(roomIndex, time, 6)"
                class="table-link"
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง Cyber Zone -->
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 6 ห้อง Cyber Zone
        <v-icon class="mg-icon">mdi-monitor</v-icon>
        <div class="color-currently"></div>
        <span class="status-text">กำลังใช้งาน</span>
        <div class="color-waiting ms-5"></div>
        <span class="status-text">รออนุมัติ</span>
        <div class="color-success ms-5"></div>
        <span class="status-text">ใช้งานเสร็จสิ้น</span>
      </div>
    </h1>
    <v-container class="mg-btmtbl">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th v-for="room in cyberzone" :key="room.roomId" class="font-table">
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
              v-for="(room, roomIndex) in cyberzone"
              :key="roomIndex"
              class="room2-column"
              :class="getCellClass(room.roomId, time)?.class"
              :rowspan="getCellClass(room.roomId, time)?.rowspan"
              v-show="!getCellClass(room.roomId, time)?.isHidden"
              @click="selectRoom(room.roomId)"
            >
              {{ getCellClass(room.roomId, time)?.text }}
              <a
                :href="generateBookingLink(roomIndex, time, 6)"
                class="table-link"
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง Live for Life -->
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 6 ห้อง Live for Life
        <v-icon class="mg-icon">mdi-monitor-account</v-icon>
        <div class="color-currently"></div>
        <span class="status-text">กำลังใช้งาน</span>
        <div class="color-waiting ms-5"></div>
        <span class="status-text">รออนุมัติ</span>
        <div class="color-success ms-5"></div>
        <span class="status-text">ใช้งานเสร็จสิ้น</span>
      </div>
    </h1>
    <v-container class="mg-btmtbl">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th
              v-for="room in liveforlife"
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
              v-for="(room, roomIndex) in liveforlife"
              :key="roomIndex"
              class="room1-column"
              :class="getCellClass(room.roomId, time)?.class"
              :rowspan="getCellClass(room.roomId, time)?.rowspan"
              v-show="!getCellClass(room.roomId, time)?.isHidden"
              @click="selectRoom(room.roomId)"
            >
              {{ getCellClass(room.roomId, time)?.text }}
              <a
                :href="generateBookingLink(roomIndex, time, 6)"
                class="table-link"
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 7 ห้อง ประชุมบุคลากรภายใน -->
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 7 ห้อง ประชุมบุคลากรภายใน
        <v-icon class="mg-icon">mdi-lectern</v-icon>
        <div class="color-currently"></div>
        <span class="status-text">กำลังใช้งาน</span>
        <div class="color-waiting ms-5"></div>
        <span class="status-text">รออนุมัติ</span>
        <div class="color-success ms-5"></div>
        <span class="status-text">ใช้งานเสร็จสิ้น</span>
      </div>
    </h1>
    <v-container class="mg-btmtbl">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th
              v-for="room in sevenfloor"
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
              v-for="(room, roomIndex) in sevenfloor"
              :key="roomIndex"
              class="room2-column"
              @click="selectRoom(room.roomId)"
            >
              <a
                :href="generateBookingLink(roomIndex, time, 7)"
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
// ---------------------
// Import Modules
// ---------------------

// Vue Composition API - ใช้สำหรับการจัดการสถานะและ lifecycle hooks
import { ref, onMounted, computed, watch } from "vue";

// Vue Router - ใช้สำหรับการจัดการการนำทางภายในแอป
import { useRouter } from "vue-router";

// Stores - ใช้ในการดึงข้อมูลห้องประชุมและการจองห้องประชุม
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

// ตัวแปรเก็บรายการวันหยุด
const holidays = ref<string[]>([]);

// ตัวแปรเก็บวันที่ที่ทำการจองปัจจุบัน
const currentReserveDate = ref<string>();

/* ---------------------
   Store Initialization
   --------------------- */

// ใช้ store เพื่อดึงข้อมูลเกี่ยวกับห้องประชุม
const roomStore = useRoomStore();

// ใช้ store เพื่อจัดการข้อมูลการจองห้องประชุม
const nrbStore = useNormalRoomBookStore();

/* ---------------------
   Computed Properties
   --------------------- */

// Computed property สำหรับแต่ละหมวดหมู่ห้องประชุม
const twozo = computed(() => roomStore.room201);
const lecture = computed(() => roomStore.lectureRooms);
const smartboard = computed(() => roomStore.smartRooms);
const ministudio = computed(() => roomStore.miniStudioRoom);
const cyberzone = computed(() => roomStore.cyberZoneRooms);
const liveforlife = computed(() => roomStore.liveForLifeRoom);
const sevenfloor = computed(() => roomStore.meetingRoomFloor7);

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
    await Promise.all([
      fetchHolidays(currentYear),
      await roomStore.filteredMeetingRooms(),
      await getCurrentReserveDate(),
      await loadedReserveRoom(currentReserveDate.value!),
    ]);
  } catch (error) {
    console.error("Error loading data:", error);
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

const goToFormMeeting = () => {
  router.push("/booking_meeting");
};

const goToFormStudy = () => {
  router.push("/booking_study");
};

async function selectRoom(roomIndex: number) {
  const meetingRoom = await roomStore.meetingRooms;
  const selectedRoom = await meetingRoom.find((r) => r.roomId == roomIndex);

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
    console.error("Room not found");
  }
}
const generateBookingLink = (
  roomIndex: number,
  time: string,
  floor: number
) => {
  const date = selectedDate.value || new Date();
  const formattedDate = (date as Date).toISOString().split("T")[0];
  const currentRoom = roomStore.currentTypeRoom;
  // ถ้าห้องอยู่ในชั้น 2 หรือชั้น 7 ให้ไป booking_meeting
  if (currentRoom.floorId + 1 === 2 || currentRoom.floorId + 1 === 7) {
    return `/booking_meeting?floor=${floor}&room=${
      roomIndex + 1
    }&time=${time}&date=${formattedDate}`;
  } else {
    // // ค่าเริ่มต้นสำหรับหน้า booking_study
    return `/booking_study?floor=${floor}&room=${
      roomIndex + 1
    }&time=${time}&date=${formattedDate}`;
  }
};

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
  // 📌 ดึงข้อมูลรายการจองทั้งหมดจาก store
  const bookings = nrbStore.bookings;

  // 📌 ค้นหาการจองทั้งหมดที่ตรงกับห้อง (`roomId`) และเวลานี้ (`time`)
  // เงื่อนไขที่ใช้กรอง:
  //  ✅ ต้องเป็นห้องเดียวกัน (`room_id === roomId`)
  //  ✅ เวลาที่ตรวจสอบ (`time`) ต้องอยู่ในช่วง `start_time` และ `end_time`
  //  ✅ ไม่ใช่การจองที่ถูก "ยกเลิก"
  const currentBook = bookings.filter(
    (b) =>
      b.room_id === roomId &&
      time >= b.start_time &&
      time <= b.end_time &&
      b.re_status !== "ยกเลิก"
  );

  // 📌 ถ้าไม่มีรายการจองสำหรับห้องนี้ในเวลานี้เลย
  if (currentBook.length == 0) {
    return {
      class: "", // ไม่มีคลาสสีอะไร
      rowspan: 1, // ไม่ต้องรวมแถว
      isStart: false, // ไม่ใช่แถวเริ่มต้นของการจอง
      isHidden: false, // ไม่ต้องซ่อนแถว
      text: "", // ไม่มีข้อความในเซลล์
    };
  }

  // 📌 ค้นหาการจองที่ "เริ่มต้น" ที่เวลานี้ (`start_time === time`)
  // จะใช้เพื่อกำหนด `rowspan` ว่าต้องรวมกี่ช่อง
  const isBook = currentBook.find((r) => r.start_time === time);

  // 📌 หา index ของเวลาเริ่มต้นและเวลาสิ้นสุดของการจองนี้
  const startIndex = timeSlots.indexOf(isBook?.start_time!); // ตำแหน่งเวลาเริ่มต้น
  const endIndex = timeSlots.indexOf(isBook?.end_time!); // ตำแหน่งเวลาสิ้นสุด
  const currentIndex = timeSlots.indexOf(time); // ตำแหน่งเวลาปัจจุบันที่กำลังตรวจสอบ

  // 📌 ตรวจสอบว่ามีสถานะ "อนุมัติ" หรือ "รอ" ในช่วงเวลานี้หรือไม่
  const hasAppProved = currentBook.some((r) => r.re_status == "อนุมัติ"); // มี "อนุมัติ" อยู่ในช่วงนี้ไหม?
  const hasPending = currentBook.some((b) => b.re_status == "รอ"); // มี "รอ" อยู่ในช่วงนี้ไหม?

  // 📌 ถ้าเป็นแถวแรกของการจอง (`currentIndex == startIndex`)
  if (currentIndex == startIndex) {
    // 🔹 ถ้าการจองนี้มีสถานะ "อนุมัติ" ให้คืนค่าคลาสสีเขียว (`confirmed`)
    if (hasAppProved) {
      return {
        class: "confirmed text-username", // ใช้คลาสสีเขียว
        rowspan: endIndex - startIndex + 1, // รวมจำนวนแถวตามช่วงเวลาที่จอง
        isStart: true, // เป็นแถวเริ่มต้นของการจอง
        isHidden: false, // ไม่ต้องซ่อน
        text: `${isBook?.userId}`, // แสดง userId ของผู้จอง
      };
    }
    // 🔹 ถ้ามีสถานะ "รอ" ให้คืนค่าคลาสสีเทา (`booked`)
    else if (hasPending) {
      return {
        class: "booked text-username", // ใช้คลาสสีเทา
        rowspan: endIndex - startIndex + 1, // รวมจำนวนแถวตามช่วงเวลาที่จอง
        isStart: true, // เป็นแถวเริ่มต้นของการจอง
        isHidden: false, // ไม่ต้องซ่อน
        text: `${isBook?.userId}`, // แสดง userId ของผู้จอง
      };
    }
  }

  // 📌 ถ้าเป็นช่วงเวลาที่อยู่ภายใต้แถวที่มี `rowspan`
  // แปลว่าช่วงเวลานี้ถูก "ครอบคลุม" โดยแถวที่เริ่มต้นไปแล้ว ให้ซ่อนแถวนี้
  return {
    class: "", // ไม่มีสีอะไร
    rowspan: 1, // ค่าเริ่มต้น เพราะเซลล์นี้จะถูกซ่อน
    isStart: false, // ไม่ใช่แถวเริ่มต้น
    isHidden: true, // ต้องซ่อนแถวนี้
    text: "", // ไม่มีข้อความ
  };
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
</script>

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
  background-color: #b5cfb7;
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

.text-head {
  font-weight: 600;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 35px;
}

.mg-left {
  margin-left: 170px;
}

.mg-leftfloor {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.table-bordered td {
  position: relative;
  z-index: 1;
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

.row-even,
.row-odd {
  cursor: pointer;
}

.mg-toppage {
  margin-top: -600px;
}

.mg-btmtbl {
  margin-top: -40px;
}

.ml-left {
  margin-left: 240px;
}

.size-dropdown {
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

.color-success {
  width: 15px;
  height: 15px;
  background-color: rgb(148, 187, 216);
  border-radius: 50%;
  margin-right: 10px;
}

.flex-header {
  display: flex;
  /* ทำให้เนื้อหาทั้งหมดแสดงในแถวเดียว */
  align-items: center;
  /* จัดให้เนื้อหาตรงกลางในแนวตั้ง */
}

.mg-icon {
  margin-bottom: 10px;
  margin-left: 5px;
}
</style>
