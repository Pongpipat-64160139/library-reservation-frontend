<template>
  <v-container fluid class="back-ground mg-toppage">
    <!-- Sheet1 จองห้อง -->
    <v-sheet class="mx-auto size-sheet" elevation="8">
      <h1 class="pt-5 topic-text">จองห้องประชุม</h1>

      <!-- span1 -->
      <span class="d-flex">
        <h1 class="mg-name head-text">ชื่อ</h1>
        <v-text-field
          v-model="fullusername"
          class="width-formname text-field-rounded"
          single-line
          outlined
          :rules="[(v) => !!v || '']"
          :disabled="true"
        />

        <h1 class="mg-amount head-text">จำนวนคน*</h1>
        <v-text-field
          v-model="srbStore.newSRB.people_Count"
          class="width-formamount text-field-rounded"
        />

        <h1 class="mg-tell head-text">เบอร์โทร*</h1>
        <v-text-field
          v-model="srbStore.newSRB.contract_Number"
          class="width-formtell text-field-rounded"
        />

        <h1 class="mg-tag head-text">ชื่อป้ายเวที</h1>
        <v-text-field
          v-model="srbStore.newSRB.stage_Name"
          class="width-formtag text-field-rounded"
          single-line
          outlined
          label="แจ้งล่วงหน้า 3 วันทำการ"
        />
      </span>

      <!-- span3 -->
      <span class="d-flex">
        <h1 class="mg-startdate head-text">วันที่เริ่ม</h1>
        <vue-flatpickr
          v-model="startDate"
          class="width-formstartdate"
          :config="flatpickrConfig"
          :allowed-dates="allowedDates"
          :min="new Date().toISOString().split('T')[0]"
          @update:model-value="handleStartDateUpdate"
        />

        <h1 class="mg-starttime head-text">เวลา</h1>
        <v-select
          v-model="startTime"
          :items="timeOptions"
          outlined
          label=""
          class="width-formstarttime text-field-rounded"
        />

        <h1 class="mg-floor head-text">⠀ชั้น</h1>
        <v-select
          v-model="floor"
          :items="availableFloors"
          outlined
          label=""
          class="width-formfloor text-field-rounded"
        />
      </span>

      <!-- span2 -->
      <span class="d-flex">
        <h1 class="mg-enddate head-text">วันที่จบ</h1>
        <vue-flatpickr
          v-model="endDate"
          class="width-formenddate"
          :config="flatpickrConfigEndDate"
          :allowed-dates="allowedDates"
          :min="new Date().toISOString().split('T')[0]"
          @update:model-value="handleEndDateUpdate"
        />

        <h1 class="mg-endtime head-text">เวลา</h1>
        <v-select
          v-model="endTime"
          :items="filteredEndTimes()"
          outlined
          label=""
          class="width-formendtime text-field-rounded"
        />

        <h1 class="mg-room head-text">ห้อง</h1>
        <v-select
          v-model="room"
          :items="availableRooms"
          outlined
          label=""
          class="width-formroom text-field-rounded"
        />
      </span>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { useRoomStore } from "@/stores/roomStore";
import { useSpecialRoomStore } from "@/stores/srbStore";
import { useTimeStore } from "@/stores/timeStore";
import { useUserStore } from "@/stores/userStore";
import type { SelectedRoom } from "@/types/room";
import { ref, computed, watch, onMounted } from "vue";

import VueFlatpickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { Thai } from "flatpickr/dist/l10n/th.js";

const srbStore = useSpecialRoomStore();
const timeStore = useTimeStore();
const roomStore = useRoomStore();
const userStore = useUserStore();

const currentRoom = roomStore.currentTypeRoom;
const startMenu = ref(false);
const endMenu = ref(false);
const startDate = ref<Date | null>(null); // วันที่เริ่มต้น
const endDate = ref<Date | null>(startDate.value); // วันที่จบให้เท่ากับวันที่เริ่มต้น
const startTime = ref();
const endTime = ref();
const floor = ref();
const room = ref();

const holidays = ref<string[]>([]);
const fullusername = ref();
const saveSelctedRoom = ref<SelectedRoom[]>([]);
const currentDate = ref<string | null>(null);
const selectedDate = ref<string>("");

const callFunction_GenerateTime = generateStartTime();
const timeOptions = timeStore.timeSlots;

onMounted(async () => {
  try {
    const currentYear = new Date().getFullYear().toString();
    await Promise.all([
      fetchHolidays(currentYear),
      (currentDate.value = formatDate(new Date())),
    ]);
    await userStore.getLocalStorageUser();
    srbStore.newSRB.userId = userStore.currentUser?.userId ?? 0;
    fullusername.value = `${userStore.currentUser?.firstname} ${userStore.currentUser?.lastname}`;
    await filteredEndTimes();
    await roomStore.filteredMeetingRooms();
    await setStartDate();
    await setDataForm();
    await setDateForReserved();
  } catch (error) {
    console.error("Error loaded data :", error);
  }
});

function setDataForm() {
  floor.value = currentRoom.floorId + 1;
  room.value = currentRoom.roomName;
}

const availableRooms = computed(() => {
  if (currentRoom.roomType == "Meeting") {
    if (floor.value == 2) {
      console.log(roomStore.room201.map((r) => r.roomName));
      return roomStore.room201.map((r) => r.roomName);
    } else if (floor.value == 5) {
      return roomStore.lectureRooms.map((r) => r.roomName);
    } else if (floor.value == 6) {
      const selectedFloor6 = ref<string[]>([]);
      selectedFloor6.value.push(
        roomStore.smartRooms.map((r) => r.roomName).toString()
      );
      selectedFloor6.value.push(
        roomStore.miniStudioRoom.map((r) => r.roomName).toString()
      );
      selectedFloor6.value.push(
        roomStore.cyberZoneRooms.find((r) => r.roomName === "CYBER ZONE I")
          ?.roomName || ""
      );
      selectedFloor6.value.push(
        roomStore.cyberZoneRooms.find((r) => r.roomName === "CYBER ZONE II")
          ?.roomName || ""
      );
      selectedFloor6.value.push(
        roomStore.liveForLifeRoom.map((r) => r.roomName).toString()
      );
      return selectedFloor6.value;
    } else if (floor.value == 7) {
      const selectedFloor7 = ref<string[]>([]);
      selectedFloor7.value.push(
        roomStore.meetingRoomFloor7
          .find((r) => r.roomName == "ห้อง 706")
          ?.roomName.toString() || " "
      );
      selectedFloor7.value.push(
        roomStore.meetingRoomFloor7
          .find((r) => r.roomName == "ห้อง 707")
          ?.roomName.toString() || " "
      );
      return selectedFloor7.value;
    }
  }
});

const availableFloors = computed(() => {
  if (currentRoom.roomType == "Meeting") {
    return [2, 5, 6, 7];
  }
});

function setStartDate() {
  // ตรวจสอบว่า startDate มีค่าเป็นวันที่ที่ถูกต้องหรือไม่
  if (
    startDate.value &&
    startDate.value instanceof Date &&
    !isNaN(startDate.value.getTime())
  ) {
    const selectedDate = formatToDDMMYYYY(startDate.value);
    console.log("วันที่เริ่มต้น :", selectedDate);
    return selectedDate; // Return the date value in the correct format
  } else {
    const startDateInput = new Date(); // ใช้วันที่ปัจจุบันเป็นค่าเริ่มต้น
    if (isNaN(startDateInput.getTime())) {
      console.error("Invalid date selected");
      return; // ถ้าเป็นวันที่ไม่ถูกต้อง จะไม่ทำการอัปเดต
    }
    const defaultDate = formatToDDMMYYYY(startDateInput);
    console.log("วันที่เริ่มต้น : วันที่ปัจจุบัน", defaultDate);
    return defaultDate;
  }
}

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

function setDateForReserved() {
  let validStartDate =
    startDate.value &&
    startDate.value instanceof Date &&
    !isNaN(startDate.value.getTime())
      ? startDate.value
      : new Date();

  let validEndDate =
    endDate.value &&
    endDate.value instanceof Date &&
    !isNaN(endDate.value.getTime())
      ? endDate.value
      : validStartDate;

  if (validEndDate < validStartDate) {
    validEndDate = validStartDate; // ถ้าวันที่จบต่ำกว่าวันที่เริ่มต้นให้วันที่จบเป็นวันที่เริ่มต้น
  }

  srbStore.newSRB.start_Date = formatToDDMMYYYY(validStartDate);
  srbStore.newSRB.end_Date = formatToDDMMYYYY(validEndDate);
  srbStore.newSRB.start_Time = startTime.value;
  srbStore.newSRB.end_Time = endTime.value;
}

// บังคับกรอกตัวเลข field จำนวนคน and เบอร์โทร
function validateNumber() {
  srbStore.newSRB.contract_Number = srbStore.newSRB.contract_Number.replace(
    /\D/g,
    ""
  );
  srbStore.newSRB.people_Count = Number(
    `${srbStore.newSRB.people_Count}`.replace(/\D/g, "")
  );
}

function formatToDDMMYYYY(date: Date | string): string {
  // ถ้าเป็น string ให้พยายามแปลงเป็น Date
  if (typeof date === "string") {
    const parsedDate = parseThaiDate(date);
    if (!parsedDate || isNaN(parsedDate.getTime())) {
      console.error("Invalid date input (string):", date);
      return "Invalid date"; // แสดงข้อผิดพลาดในรูปแบบที่อ่านง่าย
    }
    date = parsedDate;
  }

  // ตรวจสอบว่า date เป็น Date ที่ถูกต้องหรือไม่
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error("Invalid date input (Date object):", date);
    return "Invalid date"; // คืนค่า "Invalid date" เมื่อไม่สามารถแปลงได้
  }

  // แปลงเป็นรูปแบบ DD-MM-YYYY
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

// Methods

function allowedDates(date: Date) {
  if (!(date instanceof Date)) return false;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return !holidays.value.includes(formattedDate);
}

// ฟังก์ชันแปลงวันที่จากสตริงเป็น Date
function parseThaiDate(thaiDateString: string): Date | null {
  const regex = /(?:วัน\S+ที่ )(\d{1,2}) (\S+) (\d{4})/;
  const match = thaiDateString.match(regex);

  if (!match) return null;

  const [, day, month, year] = match;

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

  const monthIndex = thaiMonths.indexOf(month);
  if (monthIndex === -1) return null;

  const christianYear = parseInt(year) - 543;
  return new Date(christianYear, monthIndex, parseInt(day));
}
watch(selectedDate, (newDate, oldDate) => {
  if (!newDate || newDate === oldDate) return;
  const parsedDate = parseThaiDate(newDate); // Try to parse the date string
  if (parsedDate && !isNaN(parsedDate.getTime())) {
    // If the date is valid, proceed with the rest of the logic
  } else {
    console.error("Invalid start date:", newDate);
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

const flatpickrConfig = ref({
  locale: Thai,
  dateFormat: "d-m-Y",
  defaultDate: new Date(),
  enableTime: false,
  minDate: "today",
  maxDate: new Date(new Date().setDate(new Date().getDate() + 4)),
  disable: [
    function (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 4);

      return date < today || date > maxDate;
    },
  ],
  formatDate: (date) => {
    const options = {
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
  onChange: (selectedDates, dateStr, instance) => {
    updateDisabledDatesStyle(instance);
    if (selectedDates.length > 0) {
      selectedDate.value = dateStr;
      console.log("Selected date:", dateStr);
      flatpickrConfigEndDate.value.minDate = selectedDates[0]; // อัปเดต minDate ของ endDate
    }

    const updateYearDropdown = () => {
      const yearSelect = instance?.yearElements?.[0];
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
  onReady: (selectedDates, dateStr, instance) => {
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
});

const flatpickrConfigEndDate = ref({
  locale: Thai,
  dateFormat: "d-m-Y",
  defaultDate: new Date(),
  enableTime: false,
  minDate: "today",
  maxDate: new Date(new Date().setDate(new Date().getDate() + 4)),
  disable: [
    function (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 4);

      return date < today || date > maxDate;
    },
  ],
  formatDate: (date) => {
    const options = {
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
  onChange: (selectedDates, dateStr, instance) => {
    updateDisabledDatesStyle(instance);
    if (selectedDates.length > 0) {
      selectedDate.value = dateStr;
      console.log("Selected date:", dateStr);
    }

    const updateYearDropdown = () => {
      const yearSelect = instance?.yearElements?.[0];
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
  onReady: (selectedDates, dateStr, instance) => {
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

// ฟังก์ชันสำหรับอัปเดต startDate และ endDate จากการเลือกวัน
const handleStartDateUpdate = (val) => {
  if (!val || val === startDate.value) return; // Prevent duplicate updates

  let parsedDate = null;
  if (typeof val === "string") {
    parsedDate = parseThaiDate(val); // Parse date from string
  } else if (val instanceof Date) {
    parsedDate = val;
  }

  if (parsedDate && !isNaN(parsedDate.getTime())) {
    startDate.value = parsedDate;
    if (!endDate.value || endDate.value < parsedDate) {
      endDate.value = new Date(parsedDate); // Update endDate to match startDate if endDate is not set or is before startDate
    }
    console.log("Converted Start Date:", startDate.value);
  } else {
    console.error("Invalid date selected:", val); // Show error if date is invalid
  }
};

const handleEndDateUpdate = (val) => {
  if (!val || val === endDate.value) return; // Prevent duplicate updates

  let parsedDate = null;
  if (typeof val === "string") {
    parsedDate = parseThaiDate(val); // Parse date from string
  } else if (val instanceof Date) {
    parsedDate = val;
  }

  if (parsedDate && !isNaN(parsedDate.getTime())) {
    endDate.value = parsedDate;
    console.log("Converted End Date:", endDate.value);
  } else {
    console.error("Invalid date selected:", val); // Show error if date is invalid
  }
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

watch(startTime, (newStartTime) => {
  srbStore.newSRB.start_Time = newStartTime;
  console.log("Now start time :", srbStore.newSRB.start_Time);
});

watch(endTime, (newEndTime) => {
  srbStore.newSRB.end_Time = newEndTime;
  console.log("Now end time :", srbStore.newSRB.end_Time);
});

watch(floor, (newFloor) => {
  console.log("now floor :", newFloor);
});

watch(room, async (newRoom) => {
  const findRoom = await roomStore.selectedRoom(floor.value, newRoom);
  saveSelctedRoom.value = findRoom.data;
  srbStore.newSRB.roomId = saveSelctedRoom.value[0]?.roomId;
  console.log("found room :", srbStore.newSRB);
});

async function fetchHolidays(year: string) {
  try {
    const response = await fetch(
      `https://apigw1.bot.or.th/bot/public/financial-institutions-holidays/?year=${year}`,
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
  } catch (error) {
    console.error("Error fetching holidays:", error);
  }
}
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
  width: 1190px;
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
  margin-left: 54px;
  margin-right: 20px;
}

.mg-amount {
  margin-left: 20px;
  margin-right: 20px;
}

.mg-tell {
  margin-left: 20px;
  margin-right: 20px;
}

.mg-tag {
  margin-left: 20px;
  margin-right: 20px;
}

.mg-startdate {
  margin-left: 24px;
  margin-right: 20px;
}

.mg-enddate {
  margin-left: 28px;
  margin-right: 20px;
}

.mg-starttime {
  margin-left: 20px;
}

.mg-endtime {
  margin-left: 20px;
}

.mg-floor {
  margin-left: 20px;
  margin-right: 20px;
}

.mg-room {
  margin-left: 20px;
  margin-right: 20px;
}

.width-formname {
  width: 250px;
}

.width-formamount {
  width: 15px;
}

.width-formtell {
  width: 80px;
}

.width-formtag {
  width: 170px;
  margin-right: 20px;
}

.width-formstartdate {
  width: 313px;
  height: 60px;
  color: #493628;
  z-index: 1000;
  background-color: #f5eded;
  border-radius: 5px;
  border: 2px solid #493628;
  padding-left: 15px;
}

.width-formenddate {
  width: 313px;
  height: 60px;
  color: #493628;
  z-index: 1000;
  background-color: #f5eded;
  border-radius: 5px;
  border: 2px solid #493628;
  padding-left: 15px;
}

.width-formstarttime {
  margin-left: 20px;
}

.width-formendtime {
  margin-left: 20px;
}

.width-formfloor {
  width: 100px;
  margin-right: 20px;
}

.width-formroom {
  width: 100px;
  margin-right: 20px;
}

.text-field-rounded ::v-deep(.v-input__control) {
  background-color: #f5eded;
  border-radius: 5px;
  border: 2px solid #493628;
}

.text-field-rounded ::v-deep(.v-input) {
  border-radius: 10px;
}
</style>
