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

        <!-- ปฏิทินสำหรับเลือกวันที่การจองห้อง -->
        <v-col class="d-flex justify-center" cols="auto">
          <vue-flatpickr
            v-model="selectedDate"
            class="text-center btn-date"
            :config="flatpickrConfig"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- ตารางสำหรับชั้น 6 ห้อง ศึกษากลุ่มมัลติมีเดีย (STV) -->
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 6 ห้อง ศึกษากลุ่มมัลติมีเดีย (STV)
        <v-icon class="mg-icon"> mdi-multimedia </v-icon>
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
            <th class="text-table">เวลา</th>
            <th v-for="room in stv" :key="room.roomId" class="text-table">
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
            <td class="time-column text-table">
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
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 6 ห้อง LIBRA OKE
        <v-icon class="mg-icon"> mdi-microphone-variant </v-icon>
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
            <th class="time-column text-table">เวลา</th>
            <th v-for="room in oke" :key="room.roomId" class="text-table">
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
            <td class="time-column text-table">
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
    <h1 class="text-head mg-left mg-leftfloor">
      <div class="flex-header">
        ชั้น 6 ห้อง MINI THEATER
        <v-icon class="mg-icon"> mdi-theater </v-icon>
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
            <th class="time-column text-table">เวลา</th>
            <th
              v-for="room in minitheater"
              :key="room.roomId"
              class="text-table"
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
            <td class="time-column text-table">
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
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";

import { useRoomStore } from "@/stores/roomStore";
import { useNormalRoomBookStore } from "@/stores/nrbStore";

import VueFlatpickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { Thai } from "flatpickr/dist/l10n/th.js";

// Reactive Data Properties
const router = useRouter();
const roomStore = useRoomStore();
const nrbStore = useNormalRoomBookStore();

const selectedDate = ref<string | null>(null);
const selectedPage = ref("Entertain Room");
const currentReserveDate = ref<string>();
const holidays = ref<string[]>([]);
const showDatePicker = ref(false);
const currentDate = ref("");

// Computed Properties
const stv = computed(() => roomStore.stvRooms);
const oke = computed(() => roomStore.okeRooms);
const minitheater = computed(() => roomStore.miniTheater);

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

// Functions
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

async function loadedReserveRoom(selectedDate: string) {
  const loadedRoom = await nrbStore.getStatusReserve(selectedDate);
  nrbStore.bookings = loadedRoom;
}

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
        text: `${isBook?.user_name}`, // แสดง userId ของผู้จอง
      };
    }
    // 🔹 ถ้ามีสถานะ "รอ" ให้คืนค่าคลาสสีเทา (`booked`)
    else if (hasPending) {
      return {
        class: "booked text-username", // ใช้คลาสสีเทา
        rowspan: endIndex - startIndex + 1, // รวมจำนวนแถวตามช่วงเวลาที่จอง
        isStart: true, // เป็นแถวเริ่มต้นของการจอง
        isHidden: false, // ไม่ต้องซ่อน
        text: `${isBook?.user_name}`, // แสดง userId ของผู้จอง
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

// Lifecycle Hooks
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

// const allowedDates = (date: unknown) => {
//   if (!(date instanceof Date)) return false;

//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   const formattedDate = `${year}-${month}-${day}`;

//   const isHoliday = holidays.value.includes(formattedDate);

//   return !isHoliday;
// };

// const getDayClass = (day: { date: Date }) => {
//   const date = new Date(day.date);
//   const formattedDay = `${date.getFullYear()}-${String(
//     date.getMonth() + 1
//   ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

//   const isHoliday = holidays.value.includes(formattedDay);
//   const isWeekend = date.getDay() === 0 || date.getDay() === 6;

//   return isHoliday || isWeekend ? "holiday" : "";
// };

// const handleDateSelect = (date: string | null) => {
//   selectedDate.value = date;
//   showDatePicker.value = false;
// };

// const goToFormStudy = () => {
//   router.push("/booking_study");
// };
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
  background-color: rgb(196, 196, 196);
  color: #493628;
  text-align: center !important;
  vertical-align: middle !important;
  display: table-cell !important;
  height: 100% !important;
}

.confirmed {
  background-color: #a2cda5;
  color: #493628;
  text-align: center;
  vertical-align: middle !important;
  display: table-cell !important;
  height: 100% !important;
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
  padding: 0;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  position: relative;
}

.table-link {
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
  background-color: transparent;
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

.mg-left {
  margin-left: 170px;
}

.table-bordered td {
  position: relative;
  z-index: 1;
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

.btn-date {
  width: 300px;
  background-color: #f5eded;
  border: 1px solid #493628;
  height: 57px;
  border-radius: 5px;
  z-index: 1000;
}

.mg-icon {
  margin-bottom: 10px;
  margin-left: 5px;
}

.mg-leftfloor {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mg-rightfloor {
  display: flex;
  align-items: center;
  margin-right: 170px;
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

.color-success {
  width: 15px;
  height: 15px;
  background-color: rgb(148, 187, 216);
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
