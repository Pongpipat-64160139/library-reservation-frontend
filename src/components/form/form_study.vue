<template class="back-ground">
  <v-container fluid class="back-ground mg-toppage">
    <v-sheet class="mx-auto size-sheet" elevation="8">
      <h1 class="topic-text">จองห้อง</h1>

      <!-- span1 -->
      <span class="d-flex">
        <h1 class="mg-name head-text">ชื่อ</h1>
        <v-text-field
          class="width-formname text-field-rounded"
          v-model="username"
          single-line
          outlined
          :rules="[(v) => !!v || '']"
          :disabled="true"
        />
      </span>

      <!-- สร้างช่องกรอกรายชื่อตามจำนวนที่กำหนด -->
      <div
        v-for="(item, index) in roomStore.currentTypeRoom.roomMinimum - 1"
        :key="index"
      >
        <span class="d-flex">
          <h1 class="mg-name head-text">ชื่อ</h1>
          <v-text-field
            class="width-formname text-field-rounded"
            v-model="listparticipants[index]"
            single-line
            outlined
            :placeholder="'กรุณากรอกชื่อ'"
            :rules="[(v) => !!v || '']"
          />
        </span>
      </div>

      <!-- span2 -->
      <span class="d-flex">
        <h1 class="mg-startdate head-text">วันที่เริ่ม</h1>
        <vue-flatpickr
          v-model="startDate"
          class="width-startdate"
          :config="flatpickrConfig"
          :allowed-dates="allowedDates"
          :min="new Date().toISOString().split('T')[0]"
          @update:model-value="handleDateUpdate"
        />
        <h1 class="mg-starttime head-text">เวลา</h1>
        <v-select
          v-model="startTime"
          :items="timeOptions"
          outlined
          class="width-starttime text-field-rounded"
        />
      </span>
      <span class="d-flex">
        <h1 class="mg-enddate head-text">วันที่จบ</h1>
        <vue-flatpickr
          v-model="endDate"
          class="width-startdate disabled-datepicker"
          :config="flatpickrConfig"
          transition="scale-transition"
          offset-y
          @update:model-value="
            (val) => {
              endDate = val;
              endMenu = false;
            }
          "
        />
        <h1 class="mg-endtime head-text">เวลา</h1>
        <v-select
          v-model="endTime"
          :items="filteredEndTimes()"
          outlined
          class="width-endtime text-field-rounded"
        />
      </span>

      <!-- span3 -->
      <span class="d-flex">
        <h1 class="mg-floor head-text">ชั้น</h1>
        <v-select
          v-model="floor"
          :items="availableFloors"
          outlined
          class="width-floor text-field-rounded"
        />
        <h1 class="mg-room head-text">ห้อง</h1>
        <v-select
          v-model="roomName"
          :items="availableRooms"
          outlined
          class="width-room text-field-rounded"
        />
      </span>

      <!-- span4 -->
      <span class="d-flex">
        <h1 class="head-text mg-detail">รายละเอียด</h1>
        <v-textarea
          v-model="formDetail"
          label=""
          rows="3"
          outlined
          class="width-detail text-field-rounded"
        />
      </span>
      <!-- to="/table_study" -->
      <v-btn
        type="submit"
        class="save-btn"
        :disabled="!isFormValid"
        @click="submitBookingRoomAndNavigate()"
      >
        จองห้อง
      </v-btn>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
// ---------------------
// Import Modules
// ---------------------
// Vue Composition API
import { ref, computed, watch, onMounted } from "vue";

// Vue Router
import { useRoute, useRouter } from "vue-router";

// Stores
import { useRoomStore } from "@/stores/roomStore";
import { useTimeStore } from "@/stores/timeStore";
import { useNormalRoomBookStore } from "@/stores/nrbStore";
import { useUserStore } from "@/stores/userStore";
import { useUserBookStore } from "@/stores/userBookStore";
import { useParticipantStore } from "@/stores/participant";

// Types
import type { GetRoomType } from "@/types/getRoomType";
import type {
  NormalRoomBooking,
  PostNormalReseved,
} from "@/types/normalRoomBooking";
import type { UBPostpayload, UserBooking } from "@/types/userBooking";
import type { User } from "@/types/user";

import VueFlatpickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { Thai } from "flatpickr/dist/l10n/th.js";
// ---------------------
// Store Initialization
// ---------------------
// ใช้ store ในการจัดการข้อมูล
const roomStore = useRoomStore();
const timeStore = useTimeStore();
const nrbStore = useNormalRoomBookStore();
const userStore = useUserStore();
const ubStore = useUserBookStore();
const participantStore = useParticipantStore();

// ---------------------
// Data Properties
// ---------------------
// ตัวแปรแบบ reactive สำหรับจัดการข้อมูลใน component
const username = ref("");
const formDetail = ref<string>(""); // รายละเอียดในฟอร์ม
const startMenu = ref(false); // เมนูเริ่มต้น
const endMenu = ref(false); // เมนูสิ้นสุด
const startDate = ref<Date | null>(null); // วันที่เริ่มต้น
const endDate = ref<Date | null>(startDate.value); // วันที่จบให้เท่ากับวันที่เริ่มต้น
const startTime = ref(""); // เวลาเริ่มต้น
const endTime = ref(""); // เวลาสิ้นสุด
const floor = ref<number>(); // ชั้นของห้อง
const listparticipants = ref<string[]>([]); // รายชื่อผู้เข้าร่วม
const currentDate = ref(""); // วันที่ปัจจุบัน
const saveSelectRoom = ref<GetRoomType>(); // ห้องที่ถูกเลือก
const normalRoomBooking = ref<PostNormalReseved>(); // การจองห้องปกติ
const user = ref<User>(); // ข้อมูลผู้ใช้
const selectedDate = ref<string>(""); // ใช้เป็น string แทน null
const currentReserveDate = ref<string>(); // เก็บวันที่ปัจจุบัน หรือ วันที่ๆ เลือกใหม่และมีการอัพเดทตามตารางตลอด

const isFormValid = computed(() => {
  // ตรวจสอบว่า listparticipants มีข้อมูลครบถ้วนและจำนวนผู้เข้าร่วมอย่างน้อยตามที่กำหนด
  const participantCount = listparticipants.value.length + 1; // เพิ่มจำนวนสมาชิกผู้ล็อกอิน
  return (
    listparticipants.value.every((name) => name.trim() !== "") &&
    participantCount >= roomStore.currentTypeRoom.roomMinimum
  );
});

const updateDisabledDatesStyle = (instance: any) => {
  setTimeout(() => {
    instance.calendarContainer
      .querySelectorAll(".flatpickr-disabled")
      .forEach((el) => {
        (el as HTMLElement).style.color = "#d1d1d1"; // เปลี่ยนเป็นสีเข้มขึ้น
        (el as HTMLElement).style.opacity = "1"; // ลดความโปร่งใส
      });
  }, 10); // หน่วงเวลาเล็กน้อยเพื่อให้ UI อัปเดตก่อน
};

const flatpickrConfig = ref({
  locale: Thai,
  dateFormat: "d-m-Y",
  defaultDate: new Date(),
  enableTime: false,
  minDate: "today",
  maxDate: new Date(new Date().setDate(new Date().getDate() + 4)),
  disable: [
    function (date: Date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 4);

      return date < today || date > maxDate;
    },
  ],
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
    updateDisabledDatesStyle(instance);
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
    // สีตัวเลขในปฏิทิน
    updateDisabledDatesStyle(instance);

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
    updateDisabledDatesStyle(instance);
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

  const regex = /(\d{1,2}) (\S+) (\d{4})/; // Match "17 กุมภาพันธ์ 2568"
  const match = thaiDateString.match(regex);

  if (!match) return null;

  const [, day, month, year] = match;
  const monthIndex = thaiMonths.indexOf(month);

  if (monthIndex === -1) return null;

  const christianYear = parseInt(year) - 543; // Convert 2568 -> 2025
  return new Date(christianYear, monthIndex, parseInt(day));
}

watch(selectedDate, (newDate, oldDate) => {
  if (!newDate || newDate === oldDate) return; // หยุดการทำงานถ้าค่าเดิมกับค่าที่เปลี่ยนเหมือนกัน

  const parsedDate = parseThaiDate(newDate);
  if (parsedDate && !isNaN(parsedDate.getTime())) {
    const formattedDate = formatDate(parsedDate);
    if (formattedDate !== currentReserveDate.value) {
      // ป้องกันอัปเดตซ้ำ
      currentReserveDate.value = formattedDate;
      console.log("Updated Reserve Date:", currentReserveDate.value);
      loadedReserveRoom(currentReserveDate.value);
    }
  } else {
    console.error("Invalid date format:", newDate);
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

// ---------------------
// Functions and Computed
// ---------------------
// สามารถเพิ่ม watcher, methods หรือ computed properties ตามความเหมาะสม

// computed properties
function updateEndTimeSlots() {
  endTime.value = timeStore.updateEndTime(startTime.value!);
}

function generateStartTime() {
  // เวลาถัดไป
  const nextTime = timeStore.findNextAvailableTime();
  startTime.value = nextTime!;
  updateEndTimeSlots();
  const endTime = "19:30";
  timeStore.generateTimeSlots(startTime.value, endTime);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const callFunction_GenerateTime = generateStartTime();
// เวลาที่เริ่มต้นสำหรับการใช้งาน
const timeOptions = timeStore.timeSlots;

// Room type and related computed properties
// const roomType = ref((route.query.roomType as string) || "Group Study");
const currentRoom = roomStore.currentTypeRoom;
const roomName = ref(decodeURIComponent(currentRoom.roomName as string) || "5");
const availableFloors = computed(() => {
  if (currentRoom.roomType === "Group study") {
    return [3, 4, 5];
  } else if (currentRoom.roomType === "Entertain") {
    return [6];
  } else if (
    (currentRoom.roomType === "Meeting" && currentRoom.floorId === 4) ||
    5
  ) {
    return [5, 6];
  }
});

const availableRooms = computed(() => {
  if (currentRoom.roomType === "Group study") {
    if (floor.value === 3) {
      return roomStore.studyFloor3.map((room) => room.roomName);
    } else if (floor.value === 4) {
      return roomStore.studyFloor4.map((room) => room.roomName);
    } else if (floor.value === 5) {
      return roomStore.studyFloor5.map((room) => room.roomName);
    }
  } else if (currentRoom.roomType === "Entertain") {
    const room = roomStore.entertainRooms;
    return room.map((room) => room.roomName);
  } else if (currentRoom.roomType === "Meeting") {
    const room = roomStore.meetingRooms;
    const classifyFloor5 = room.filter((r) => r.floorId === 4);
    const classifyFloor6 = room.filter((r) => r.floorId === 5);
    if (floor.value === 5) {
      return classifyFloor5.map((r) => r.roomName);
    } else if (floor.value === 6) {
      return classifyFloor6.map((r) => r.roomName);
    }
  }
});
// Methods
const filteredEndTimes = () => {
  const maxHours = roomStore.currentTypeRoom.maxHours;
  const times = ref<string[]>([]);
  const clossingTime = "20:30";
  if (maxHours) {
    times.value = [];
    timeStore.generateEndTimeSlots(startTime.value, maxHours, clossingTime);
    times.value = timeStore.endTimeSlots;
    return times.value;
  }
};

const allowedDates = (date: Date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return false; // Invalid date
  }
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 4); // Limit to 5 days ahead

  today.setHours(0, 0, 0, 0);
  maxDate.setHours(0, 0, 0, 0);

  return date >= today && date <= maxDate;
};

watch(startDate, (newStartDate, oldStartDate) => {
  if (!newStartDate) return; // ถ้าไม่มีค่าให้หยุดทำงาน

  let parsedDate: Date | null = null;

  // แปลง `newStartDate` ให้เป็น Date object ถ้ายังไม่ใช่
  if (typeof newStartDate === "string") {
    parsedDate = parseThaiDate(newStartDate);
  } else if (newStartDate instanceof Date) {
    parsedDate = newStartDate;
  }

  if (!parsedDate || isNaN(parsedDate.getTime())) {
    console.error("Invalid newStartDate:", newStartDate);
    return;
  }

  // ตรวจสอบว่า `oldStartDate` เป็น `Date` object ก่อนใช้ `.getTime()`
  if (
    oldStartDate instanceof Date &&
    parsedDate.getTime() === oldStartDate.getTime()
  ) {
    return; // ถ้าค่าไม่เปลี่ยนแปลง ให้หยุดทำงาน
  }

  // อัปเดต endDate เมื่อค่ามีการเปลี่ยนแปลง
  endDate.value = new Date(parsedDate);
});

const handleDateUpdate = (val: any) => {
  if (!val || val === startDate.value) return; // ป้องกันอัปเดตซ้ำ

  let parsedDate: Date | null = null;
  if (typeof val === "string") {
    parsedDate = parseThaiDate(val);
  } else if (val instanceof Date) {
    parsedDate = val;
  }

  if (parsedDate && !isNaN(parsedDate.getTime())) {
    startDate.value = parsedDate;
    endDate.value = new Date(parsedDate);
    console.log("Converted Start Date:", startDate.value);
  } else {
    console.error("Invalid date selected:", val);
  }
};

const fetchHolidays = async () => {
  try {
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
        roomStore.holidays = responseData.result.data.map(
          (holiday: { Date: string }) => holiday.Date
        );
      }
    }
  } catch (error) {
    console.error("Failed to fetch holidays:", error);
  }
};
// หาข้อมูลของห้องนั้นๆตาม
async function selectRoom(floor: number, roomName: string) {
  if (currentRoom.roomType === "Group study") {
    if (floor === 3) {
      const findRoom = roomStore.studyFloor3.find(
        (r) => r.roomName === roomName
      );
      const updateRoom = (roomStore.currentTypeRoom = findRoom!);
      saveSelectRoom.value = updateRoom;
      return saveSelectRoom.value;
    } else if (floor === 4) {
      const findRoom = roomStore.studyFloor4.find(
        (r) => r.roomName === roomName
      );
      const updateRoom = (roomStore.currentTypeRoom = findRoom!);
      saveSelectRoom.value = updateRoom;
      return saveSelectRoom.value;
    } else if (floor === 5) {
      const findRoom = roomStore.studyFloor5.find(
        (r) => r.roomName === roomName
      );
      const updateRoom = (roomStore.currentTypeRoom = findRoom!);
      saveSelectRoom.value = updateRoom;
      return saveSelectRoom.value;
    }
  } else if (currentRoom.roomType === "Entertain") {
    const findRoom = roomStore.entertainRooms.find(
      (r) => r.roomName === roomName
    );
    const updateRoom = (roomStore.currentTypeRoom = findRoom!);
    saveSelectRoom.value = updateRoom;
    return saveSelectRoom.value;
  } else if (currentRoom.roomType === "Meeting") {
    if (floor === 5) {
      const findRoom = roomStore.meetingRooms.find(
        (r) => r.roomName === roomName
      );
      const updateRoom = (roomStore.currentTypeRoom = findRoom!);
      console.log("Current room : ", updateRoom);
      saveSelectRoom.value = updateRoom;
      return saveSelectRoom.value;
    } else if (floor === 6) {
      const findRoom = roomStore.meetingRooms.find(
        (r) => r.roomName === roomName
      );
      const updateRoom = (roomStore.currentTypeRoom = findRoom!);
      console.log("Current room : ", updateRoom);
      saveSelectRoom.value = updateRoom;
      return saveSelectRoom.value;
    }
  }
}

async function getCurrentDate() {
  const today = new Date();
  // เรียกวัน
  const day = today.getDate(); // วันที่ (1-31)
  // เรียกเดือน
  const month = today.getMonth() + 1; // เดือน (0-11) + 1 เพื่อให้ได้เดือน (1-12)
  // เรียกปี
  const year = today.getFullYear(); // ปี (เช่น 2025
  // แสดงผลรวม
  console.log(`${day}-${month}-${year}`);
  currentDate.value = `${day}-${month}-${year}`;
  return `${day}-${month}-${year}`;
}

function formatToDDMMYYYY(date: Date | string): string {
  if (typeof date === "string") {
    const parsedDate = parseThaiDate(date);
    if (!parsedDate || isNaN(parsedDate.getTime())) {
      console.error("Invalid date input:", date);
      throw new Error("Invalid date");
    }
    date = parsedDate;
  }

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error("Invalid date input:", date);
    throw new Error("Invalid date");
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

async function createdUserBookAndParticipant(nrb: NormalRoomBooking) {
  // เก็บข้อมูลของ user book

  const newUserBook = ref<UBPostpayload>();
  const user = userStore.currentUser;
  if (user) {
    newUserBook.value = {
      userId: user?.userId,
      nrbBookingId: nrb.nrbId!,
    };
  }
  // สร้างข้อมูลของ User Booking ผ่าน Store
  const createUB = await ubStore.createNewUserBook(newUserBook.value!);
  const saveUB = createUB as UserBooking;
  console.log("Data :", saveUB.userbooking_Id);

  // สร้าง Participant ตาม loop ข้อมูลรายชื่อ
  for (let i = 0; i < listparticipants.value.length; i++) {
    // แสดงรายชื่อตามที่เก็บไว้ใน field
    let participant = listparticipants.value[i];
    // Post ข้อมูลของ participant ผ่าน API จาก Store
    let createParticipant = await participantStore.createParticipant({
      fullName: participant,
      userbookingId: saveUB.userbooking_Id,
    });
    console.log("Participant :", createParticipant);
  }
}
async function submitBookingRoom() {
  if (startDate.value === null) {
    normalRoomBooking.value = {
      startDate: currentDate.value,
      startTime: startTime.value,
      endDate: currentDate.value,
      endTime: endTime.value,
      repeat_Flag: "No",
      reseve_status: "รอ",
      repeat_End_Flag: currentDate.value,
      details: formDetail.value!,
      reason: "",
      cancelTime: "",
      roomId: saveSelectRoom.value?.roomId!,
    };
    console.log(normalRoomBooking.value);
    const res = await nrbStore.createNewBooking(normalRoomBooking.value);
    createdUserBookAndParticipant(res);
  } else if (startDate.value != null) {
    const formatDate = formatToDDMMYYYY(startDate.value);
    normalRoomBooking.value = {
      startDate: formatDate,
      startTime: startTime.value,
      endDate: formatDate,
      endTime: endTime.value,
      repeat_Flag: "No",
      reseve_status: "รอ",
      repeat_End_Flag: formatDate,
      details: formDetail.value!,
      reason: "",
      cancelTime: "",
      roomId: saveSelectRoom.value?.roomId!,
    };
    console.log(normalRoomBooking.value);
    const res = await nrbStore.createNewBooking(normalRoomBooking.value);
    createdUserBookAndParticipant(res);
  }
}
// Lifecycle hooks
onMounted(async () => {
  try {
    username.value =
      userStore.currentUser?.firstname + "" + userStore.currentUser?.lastname;
    await roomStore.filteredEntertainRooms();
    await roomStore.initializeRooms();
    floor.value = roomStore.currentTypeRoom.floorId + 1;
    await filteredEndTimes();
    getCurrentDate();
    saveSelectRoom.value = roomStore.currentTypeRoom;
    await userStore.getLocalStorageUser();
  } catch (error) {
    console.error("Error loading data:", error);
  }
});

const router = useRouter();
async function submitBookingRoomAndNavigate() {
  await submitBookingRoom(); // เรียกฟังก์ชันจองห้องเดิม
  router.push("/table_study"); // เปลี่ยนเส้นทางไปยังหน้า table_study
}

// Watchers
watch(startTime, (newStartTime) => {
  console.log("Start Time:", newStartTime);
  updateEndTimeSlots();
});

watch(endTime, (newEndTime) => {
  console.log("new End Time:", newEndTime);
});

watch(floor, (newFloor, oldFloor) => {
  console.log("Floor update:", newFloor);

  if (newFloor !== oldFloor) {
    if (!roomName.value || roomName.value === saveSelectRoom.value?.roomName) {
      if (newFloor === 3) {
        roomName.value = roomStore.studyFloor3[0].roomName;
      } else if (newFloor === 4) {
        roomName.value = roomStore.studyFloor4[0].roomName;
      } else if (newFloor === 5) {
        roomName.value = roomStore.studyFloor5[0].roomName;
      }
    }
  }
});

watch(roomName, (newRoom) => {
  console.log(roomName.value);
  selectRoom(floor.value!, newRoom);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.back-ground {
  background-color: #f9f3ea;
}

.mg-toppage {
  margin-top: -280px;
}

.size-sheet {
  width: 800px;
  height: auto;
  background-color: #dfd3c3;
  border-radius: 8px;
}

.topic-text {
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 25px;
}

.head-text {
  font-weight: 400;
  font-size: 15px;
  font-weight: 600;
  margin-top: 20px;
}

.mg-name {
  margin-left: 71px;
}

.mg-startdate {
  margin-left: 41px;
  margin-top: 10px;
}

.mg-enddate {
  margin-left: 45px;
  margin-top: 10px;
}

.mg-starttime {
  margin-left: 25px;
  margin-top: 10px;
}

.mg-endtime {
  margin-left: 25px;
  margin-top: 10px;
}

.mg-floor {
  margin-left: 71px;
  margin-top: 10px;
}

.mg-room {
  margin-left: 27px;
  margin-top: 10px;
}

.mg-detail {
  margin-left: 19px;
  margin-top: 10px;
}

.width-formname {
  margin-left: 20px;
  margin-right: 20px;
  color: #493628;
}

.width-detail {
  margin-left: 19px;
  margin-right: 20px;
  color: #493628;
  margin-top: -10px;
}

.width-startdate {
  width: 300px;
  height: 60px;
  margin-left: 19px;
  color: #493628;
  margin-top: -10px;
  z-index: 1000;
  background-color: #f5eded;
  border-radius: 5px;
  border: 2px solid #493628;
  text-align: left;
  padding-left: 15px;
}

.width-enddate {
  width: 100px;
  margin-left: 19px;
  color: #493628;
  margin-top: -10px;
}

.disabled-datepicker {
  background-color: #f5eded !important;
  color: #8a8a8a !important;
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.7;
}

.width-starttime {
  margin-left: 20px;
  margin-right: 20px;
  color: #493628;
  width: 100px;
  margin-top: -10px;
}

.width-endtime {
  margin-left: 20px;
  margin-right: 20px;
  color: #493628;
  width: 100px;
  margin-top: -10px;
}

.width-floor {
  width: 100px;
  margin-left: 19px;
  color: #493628;
  margin-top: -10px;
}

.width-room {
  width: 100px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: -10px;
  color: #493628;
}

.text-field-rounded ::v-deep(.v-input__control) {
  background-color: #f5eded;
  border-radius: 5px;
  border: 2px solid #493628;
}

.text-field-rounded ::v-deep(.v-input) {
  border-radius: 10px;
}

.save-btn {
  background-color: #f5eded !important;
  color: #493628 !important;
  margin-left: 630px;
  margin-top: -10px;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 16px;
  width: 150px;
  height: 35px;
  border: 2px solid #493628;
}
</style>
