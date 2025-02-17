<template class="back-ground">
  <v-container fluid class="back-ground ms-kob">
    <!-- Sheet1 จองห้อง -->
    <v-sheet
      class="mx-auto mt-10"
      elevation="8"
      max-width="1200"
      style="background-color: #dfd3c3; border-radius: 16px"
    >
      <h1 class="pt-5 head-title text-center pb-10">จองห้องประชุม</h1>

      <!-- span1 -->
      <span class="d-flex">
        <h1 class="mg-name pt-5 head1-title">ชื่อ</h1>
        <v-text-field
          v-if="user"
          v-model="user.username"
          class="width-formname text-field-rounded"
          single-line
          outlined
          :rules="[(v) => !!v || '']"
          label=""
          readonly
        />
        <h1 class="ps-15 pt-5 head1-title">จำนวนคน</h1>
        <v-text-field
          v-model="srbStore.newSRB.people_Count"
          class="width-formamount text-field-rounded"
          single-line
          label=""
          :rules="[(v) => /^\d+$/.test(v) || '', (v) => v > 0 || '']"
          @input="validateNumber"
        />
        <h1 class="ps-15 pt-5 head1-title">เบอร์โทรติดต่อ</h1>
        <v-text-field
          v-model="srbStore.newSRB.contract_Number"
          class="width-formtell text-field-rounded pe-7"
          single-line
          label=""
          :rules="[(v) => /^\d{10}$/.test(v) || '']"
        />
      </span>
      <!-- span3 -->
      <span class="d-flex">
        <h1 class="ps-2 pt-5 head1-title">ชื่อป้ายเวที</h1>
        <v-text-field
          v-model="srbStore.newSRB.stage_Name"
          class="width-formtag text-field-rounded"
          single-line
          outlined
          label="กรุณาแจ้งล่วงหน้า 3 วันทำการ"
        />
        <h1 class="mg-floor pt-5 head1-title">ชั้น</h1>
        <v-select
          v-model="floor"
          :items="availableFloors"
          outlined
          label=""
          class="width-formfloor text-field-rounded"
        />
        <h1 class="mg-room ps-15 pt-5 head1-title">ห้อง</h1>
        <v-select
          v-model="room"
          :items="availableRooms"
          outlined
          label=""
          class="width-formroom text-field-rounded pe-7"
        />
      </span>

      <!-- span2 -->
      <span class="d-flex">
        <h1 class="mg-date pt-5 head1-title">วันที่เริ่ม</h1>
        <v-menu
          v-model="startMenu"
          v-model:return-value="startDate"
          class="width-formdate text-field-rounded"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template
            #activator="{ props }"
            class="width-formdate text-field-rounded"
          >
            <v-text-field
              class="width-formdate text-field-rounded"
              v-bind="props"
              :value="
                startDate
                  ? new Date(startDate).toLocaleDateString('th-TH', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : new Date().toLocaleDateString('th-TH', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
              "
              readonly
            />
          </template>
          <v-date-picker
            v-model="startDate"
            :min="new Date().toISOString().split('T')[0]"
            :allowed-dates="allowedDates"
            @update:model-value="
              (val) => {
                startDate = val;
                startMenu = false;
              }
            "
          />
        </v-menu>

        <h1 class="ps-5 pt-5 head1-title">เวลา</h1>
        <v-select
          v-model="startTime"
          :items="timeOptions"
          outlined
          label=""
          class="width-formtime text-field-rounded pe-7"
        />
        <h1 class="pt-5 head1-title">วันที่จบ</h1>
        <v-menu
          v-model="endMenu"
          v-model:return-value="endDate"
          class="width-formdate text-field-rounded"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template
            #activator="{ props }"
            class="width-formdate text-field-rounded"
          >
            <v-text-field
              class="width-formdate text-field-rounded"
              v-bind="props"
              :value="
                endDate
                  ? new Date(endDate).toLocaleDateString('th-TH', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : new Date().toLocaleDateString('th-TH', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
              "
            />
          </template>
          <v-date-picker
            v-model="endDate"
            @update:model-value="
              (val) => {
                endDate = val;
                endMenu = false;
              }
            "
          />
        </v-menu>
        <h1 class="ps-5 pt-5 head1-title">เวลา</h1>
        <v-select
          v-model="endTime"
          :items="filteredEndTimes()"
          outlined
          label=""
          class="width-formtime1 text-field-rounded pe-7"
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
import type { User } from "@/types/user";
import { ref, computed, watch, onMounted } from "vue";
const srbStore = useSpecialRoomStore();
const timeStore = useTimeStore();
const roomStore = useRoomStore();
const userStore = useUserStore();

const currentRoom = roomStore.currentTypeRoom;
const startMenu = ref(false);
const endMenu = ref(false);
const startDate = ref<string>();
const endDate = ref<string>();
// const endRepeatDate = ref<Date | null>(null);
const startTime = ref();
const endTime = ref();
const floor = ref();
const room = ref();
const holidays = ref<string[]>([]);
const numPeople = ref("");
const user = ref<User>();
const saveSelctedRoom = ref<SelectedRoom[]>([]);
onMounted(async () => {
  try {
    const currentYear = new Date().getFullYear().toString();
    await Promise.all([
      fetchHolidays(currentYear),
      (currentDate.value = formatDate(new Date())),
    ]);
    await filteredEndTimes();
    await getUser();
    await roomStore.filteredMeetingRooms();
    await setStartDate();
    await setDataForm();
    await setDateForReserved();
  } catch (error) {
    console.error("Error loaded data :", error);
  }
});

async function getUser() {
  const res = await userStore.getUserById(64160100);
  user.value = res;
}
function setDataForm() {
  floor.value = currentRoom.floorId + 1;
  room.value = currentRoom.roomName;
}
function setDateForReserved() {
  srbStore.newSRB.start_Time = startTime.value;
  srbStore.newSRB.end_Time = endTime.value;
  srbStore.newSRB.start_Date = formatDateToYYYYMMDD(new Date());
  srbStore.newSRB.end_Date = formatDateToYYYYMMDD(new Date());
  srbStore.newSRB.roomId = currentRoom.roomId;
  srbStore.newSRB.userId = user.value?.userId ?? 0;
}
const availableFloors = computed(() => {
  if (currentRoom.roomType == "Meeting") {
    return [2, 5, 6, 7];
  }
});
const currentDate = ref<string | null>(null);

// Lifecycle hooks
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
const timeOptions = timeStore.timeSlots;

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

function setStartDate() {
  const startDateInput = new Date();
  const selectedDate = formatDateToYYYYMMDD(startDateInput);
  console.log("วันที่เริ่มต้น :", selectedDate);
  return selectedDate;
}
function formatDateToYYYYMMDD(date: Date | string) {
  if (!date) {
    console.error("📛 Invalid date input:", date);
    return "Invalid date";
  }

  const d = new Date(date);
  if (isNaN(d.getTime())) {
    console.error("❌ Failed to parse date:", date);
    return "Invalid date";
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Watchers
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
watch(startDate, (newDate) => {
  srbStore.newSRB.start_Date = formatDateToYYYYMMDD(newDate!);
  console.log("Now start date :", srbStore.newSRB.start_Date);
  endDate.value = startDate.value;
});
watch(endDate, (newEndDate) => {
  srbStore.newSRB.end_Date = formatDateToYYYYMMDD(newEndDate!);
  console.log("Now End date :", srbStore.newSRB.end_Date);
});
watch(
  () => srbStore.isBook,
  () => {
    if (srbStore.isBook) {
      const res = getDatesBetween(
        srbStore.newSRB.start_Date,
        srbStore.newSRB.end_Date
      );
      console.log("Dates between :", res);
    }
  }
);
// Methods
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

function allowedDates(date: Date) {
  if (!(date instanceof Date)) return false;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return !holidays.value.includes(formattedDate);
}

function validateNumber() {
  numPeople.value = numPeople.value.replace(/\D/g, "");
}

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("th-TH", options).format(date);
}
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

.head1-title {
  font-weight: 400;
  font-size: 15px;
  font-weight: 600;
  margin-top: -1px;
}

.text-center {
  text-align: center;
}

.mt-2 {
  margin-top: 10px;
}

.mg-name {
  margin-left: 54px;
}

.mg-date {
  margin-left: 25px;
}

.mg-floor {
  margin-left: 26px;
}

.mg-room {
  margin-left: 65px;
}

.width-formtag {
  width: 194px;
  margin-left: 20px;
  margin-right: 77px;
  color: #493628;
}

.mg-repeat {
  margin-left: 43px;
}

.back-ground {
  background-color: #f9f3ea;
}

.ms-kob {
  margin-top: -700px;
}

.width-formname {
  width: 195px;
  height: 1px;
  font-weight: 500;
  margin-left: 21px;
  color: #493628;
}

.width-formamount {
  margin-left: 20px;
  color: #493628;
  width: 65px;
}

.width-formdate {
  width: 280px;
  height: 1px;
  font-weight: 500;
  margin-left: 20px;
  color: #493628;
}

.width-formtime {
  margin-left: 20px;
  color: #493628;
  width: 135px;
}

.width-formtime1 {
  margin-left: 20px;
  color: #493628;
  width: 135px;
}

.width-formtell {
  width: 200px;
  font-size: 50px;
  margin-left: 20px;
  color: #493628;
}

.width-formfloor {
  width: 65px;
  margin-left: 20px;
  color: #493628;
}

.width-formrepeat {
  width: 65px;
  margin-left: 18px;
  color: #493628;
}
.width-formroom {
  width: 200px;
  margin-left: 20px;
  color: #493628;
}

.width-formblank1 {
  width: 460px;
  margin-left: 20px;
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
</style>
