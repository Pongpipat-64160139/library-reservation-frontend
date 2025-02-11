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
          class="width-formname text-field-rounded"
          single-line
          outlined
          :rules="[(v) => !!v || '']"
          label=""
        />
        <h1 class="ps-15 pt-5 head1-title">จำนวนคน</h1>
        <v-text-field
          v-model="numPeople"
          class="width-formamount text-field-rounded"
          single-line
          label=""
          :rules="[(v) => /^\d+$/.test(v) || '', (v) => v > 0 || '']"
          @input="validateNumber"
        />
        {{ numPeople }}
        <h1 class="ps-15 pt-5 head1-title">เบอร์โทรติดต่อ</h1>
        <v-text-field
          v-model="phoneNumber"
          class="width-formtell text-field-rounded pe-7"
          single-line
          label=""
          :rules="[(v) => /^\d{10}$/.test(v) || '']"
        />
        {{ phoneNumber }}
      </span>
      <!-- span3 -->
      <span class="d-flex">
        <h1 class="ps-2 pt-5 head1-title">ชื่อป้ายเวที</h1>
        <v-text-field
          class="width-formtag text-field-rounded"
          single-line
          outlined
          label="กรุณาแจ้งล่วงหน้า 3 วันทำการ"
        />
        <h1 class="mg-floor pt-5 head1-title">ชั้น</h1>
        <v-select
          v-model="floor"
          :items="[2, 5, 6, 7]"
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
                endDate = val; // ตั้งค่า endDate ให้เท่ากับ startDate
                endRepeatDate = val;
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
              readonly
              :disabled="true"
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
          :items="filteredEndTimes"
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
import { ref, computed, watch, onMounted } from "vue";

const numPeople = ref("");
const phoneNumber = ref("");
const menu = ref(false);
const startMenu = ref(false);
const endMenu = ref(false);
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const endRepeatMenu = ref(false);
const endRepeatDate = ref<Date | null>(null);
const startTime = ref("08:00");
const endTime = ref("08:30");
const floor = ref(2);
const room = ref("201");
const repeatOption = ref("ไม่");
const holidays = ref<string[]>([]);
const timeOptions = [
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
];
const floorRooms = {
  2: ["201"],
  5: ["Lecturer's Room 1", "Lecturer's Room 2", "Lecturer's Room 3"],
  6: [
    "604 Smart Board",
    "Mini Studio",
    "Cyber Zone 1",
    "Cyber Zone 2",
    "Live for Life",
  ],
  7: ["706", "707"],
};
const currentDate = ref<string | null>(null);
const showStartDatePicker = ref(false);
const showEndDatePicker = ref(false);
const currentStartDate = ref("");
const currentEndDate = ref("");
const roomStore = useRoomStore();

// Lifecycle hooks
onMounted(async () => {
  try {
    const currentYear = new Date().getFullYear().toString();
    await Promise.all([
      fetchHolidays(currentYear),
      (currentDate.value = formatDate(new Date())),
    ]);
  } catch (error) {
    console.error("Error initializing holidays:", error);
  }
});
// Computed properties
const filteredEndTimes = computed(() => {
  const start = startTime.value;
  const startIndex = timeOptions.indexOf(start);
  return startIndex >= 0 ? timeOptions.slice(startIndex + 1) : [];
});

const availableRooms = computed(() => {
  return floor.value in floorRooms
    ? floorRooms[floor.value as keyof typeof floorRooms]
    : [];
});

// Watchers
watch(startTime, (newStartTime) => {
  const availableTimes = filteredEndTimes.value;
  endTime.value = availableTimes[0] || "08:30";
});

watch(floor, (newFloor) => {
  const firstRoom = floorRooms[newFloor as keyof typeof floorRooms]?.[0] || "";
  room.value = firstRoom;
});

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

function onRepeatOptionChange() {
  if (repeatOption.value === "ไม่") {
    endRepeatDate.value = null;
  }
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
