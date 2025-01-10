<template class="back-ground">
  <v-container fluid class="back-ground ms-kob">
    <v-sheet
      class="mx-auto mt-1"
      elevation="8"
      max-width="700"
      style="background-color: #dfd3c3; border-radius: 16px"
    >
      <h1 class="pt-5 head-title text-center pb-5">จองห้อง</h1>

      <!-- span1 -->
      <span class="d-flex">
        <h1 class="mg-name pt-5 head1-title">ชื่อ</h1>
        <v-text-field
          class="width-formname text-field-rounded"
          v-model="numPeople"
          single-line
          outlined
          :rules="[(v) => !!v || '']"
          label=""
        />
      </span>

      <!-- span2 -->
      <span class="d-flex">
        <h1 class="mg-date1 head1-title">วันที่เริ่ม</h1>
        <v-menu
          v-model="startMenu"
          v-model:return-value="startDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template #activator="{ props }">
            <v-text-field
              class="width-formdate1 text-field-rounded"
              v-bind="props"
              :value="
                startDate ? formatDate(startDate) : formatDate(new Date())
              "
              readonly
            />
          </template>
          <v-date-picker
            v-model="startDate"
            :allowed-dates="allowedDates"
            :min="new Date().toISOString().split('T')[0]"
            @update:model-value="handleDateUpdate"
          />
        </v-menu>

        <h1 class="mg-time1 head1-title">เวลา</h1>
        <v-select
          v-model="startTime"
          :items="timeOptions"
          outlined
          label="เวลาเริ่มต้น"
          class="width-formtime1 text-field-rounded"
        />
      </span>
      <span class="d-flex">
        <h1 class="mg-date2 head1-title">วันที่จบ</h1>
        <v-menu
          v-model="endMenu"
          v-model:return-value="endDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template #activator="{ props }">
            <v-text-field
              class="width-formdate2 text-field-rounded"
              v-bind="props"
              :value="endDate ? formatDate(endDate) : formatDate(new Date())"
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
        <h1 class="mg-time2 head1-title">เวลา</h1>
        <v-select
          v-model="endTime"
          :items="filteredEndTimes()"
          outlined
          label="เวลา"
          class="width-formtime2 text-field-rounded"
        />
      </span>

      <!-- span3 -->
      <span class="d-flex">
        <h1 class="mg-floor head1-title">ชั้น</h1>
        <v-select
          v-model="floor"
          :items="availableFloors"
          outlined
          label="ชั้น"
          class="width-formfloor text-field-rounded"
        />
        <h1 class="mg-room head1-title">ห้อง</h1>
        <v-select
          v-model="roomName"
          :items="availableRooms"
          outlined
          label="ห้อง"
          class="width-formroom text-field-rounded"
        />
      </span>
      <span class="d-flex">
        <h1 class="mg-repeat head1-title">ทำซ้ำ</h1>
        <v-select
          v-model="repeatOption"
          :items="['ไม่', 'ทำซ้ำ']"
          outlined
          label=""
          class="width-formrepeat text-field-rounded"
        />
        <h1 class="mg-date3 head1-title">สิ้นสุด</h1>
        <v-menu
          v-model="endRepeatMenu"
          v-model:return-value="endRepeatDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template #activator="{ props }">
            <v-text-field
              class="width-formtime3 text-field-rounded"
              v-bind="props"
              :value="
                endRepeatDate
                  ? formatDate(endRepeatDate)
                  : formatDate(new Date())
              "
              readonly
              :disabled="repeatOption === 'ไม่'"
            />
          </template>
          <v-date-picker
            v-model="endRepeatDate"
            :allowed-dates="allowedDates"
            :min="new Date().toISOString().split('T')[0]"
            @update:model-value="
              (val) => {
                endRepeatDate = val;
                endRepeatMenu = false;
              }
            "
          />
        </v-menu>
      </span>

      <!-- span4 -->
      <span class="d-flex">
        <h1 class="head1-title mg-detail">รายละเอียด</h1>
        <v-textarea
          v-model="phoneNumber"
          label=""
          rows="3"
          outlined
          class="width-detail text-field-rounded"
        />
      </span>
      <v-btn to="/table_study" type="submit" class="save-btn custom-btn">
        <v-icon left>mdi-content-save</v-icon>
        จองห้อง
      </v-btn>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRoomStore } from "@/stores/roomStore";

const route = useRoute();
const roomStore = useRoomStore();

// Data properties
const numPeople = ref("");
const phoneNumber = ref("");
const menu = ref(false);
const startMenu = ref(false);
const endMenu = ref(false);
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const endRepeatMenu = ref(false);
const endRepeatDate = ref<Date | null>(null);
const startTime = ref<"08:00" | "08:30" | "09:00" | "19:30">("08:00");
const endTime = ref("08:30");
const floor = ref<number>();
const room = ref("ศึกษากลุ่ม 1");
const repeatOption = ref("ไม่");
const timeOptions = ref([
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11.30",
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
]);

// Room type and related computed properties
// const roomType = ref((route.query.roomType as string) || "Group Study");
const roomName = ref(decodeURIComponent(route.query.roomName as string) || "");
const currentRoom = roomStore.currentTypeRoom;
const availableFloors = computed(() => {
  if (currentRoom.roomType === "Group study") {
    return [3, 4, 5];
  }
});

const availableRooms = computed(() => {
  if (currentRoom.roomType === "Group study") {
    if (floor.value === 3) {
      console.log(roomStore.studyFloor3.map((room) => room.roomName));
      return roomStore.studyFloor3.map((room) => room.roomName);
    } else if (floor.value === 4) {
      console.log(roomStore.studyFloor4.map((room) => room.roomName));
      return roomStore.studyFloor4.map((room) => room.roomName);
    } else if (floor.value === 5) {
      console.log(roomStore.studyFloor5.map((room) => room.roomName));
      return roomStore.studyFloor5.map((room) => room.roomName);
    }
  }
});

// Methods
const filteredEndTimes = () => {
  const times: Record<string, string[]> = {
    "08:00": ["08:30", "09:00", "09:30", "10:00"],
    "08:30": ["09:00", "09:30", "10:00", "10:30"],
    "09:00": ["09:30", "10:00", "10:30", "11:00"],
    "19:30": ["20:00"],
  };
  return times[startTime.value] || [];
};

const validateNumber = () => {
  numPeople.value = numPeople.value.replace(/\D/g, "");
};

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("th-TH", options).format(date);
};

const allowedDates = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return !roomStore.holidays.includes(formattedDate);
};

const handleDateUpdate = (val: any) => {
  startDate.value = val;
  endDate.value = val;
  endRepeatDate.value = val;
  startMenu.value = false;
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
function selectFloor(floor: number) {
  console.log("Select Floor:", floor);
}
// Lifecycle hooks
onMounted(async () => {
  await roomStore.filteredEntertainRooms();
  await roomStore.initializeRooms();
  floor.value = roomStore.currentTypeRoom.floorId + 1;
});

// Watchers
watch(startTime, (newStartTime) => {
  console.log("Start Time:", newStartTime);
  const availableTimes = filteredEndTimes();
  console.log("Available End Times:", availableTimes);
  endTime.value = availableTimes.length > 0 ? availableTimes[0] : "";
});

watch(floor, (newFloor) => {
  console.log("Floor update:", newFloor);
});
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

.mg-name {
  margin-left: 71px;
}

.mg-date1 {
  margin-left: 41px;
  margin-top: 10px;
}

.mg-date2 {
  margin-left: 45px;
  margin-top: 10px;
}

.mg-time1 {
  margin-left: 25px;
  margin-top: 10px;
}

.mg-time2 {
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

.mg-repeat {
  margin-left: 57px;
  margin-top: 10px;
}

.mg-date3 {
  margin-left: -4px;
  margin-top: 10px;
}

.mg-detail {
  margin-left: 19px;
  margin-top: 10px;
}

.back-ground {
  background-color: #f9f3ea;
}

.ms-kob {
  margin-top: -700px;
}

.width-formname {
  width: 100px;
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

.width-formdate1 {
  width: 100px;
  margin-left: 20px;
  color: #493628;
  margin-top: -10px;
}

.width-formdate2 {
  width: 100px;
  margin-left: 19px;
  color: #493628;
  margin-top: -10px;
}

.width-formtime1 {
  margin-left: 20px;
  margin-right: 20px;
  color: #493628;
  width: 100px;
  margin-top: -10px;
}

.width-formtime2 {
  margin-left: 20px;
  margin-right: 20px;
  color: #493628;
  width: 100px;
  margin-top: -10px;
}

.width-formtime3 {
  margin-left: 20px;
  margin-right: 20px;
  color: #493628;
  width: 100px;
  margin-top: -10px;
}

.width-formrepeat {
  margin-left: 20px;
  margin-right: 20px;
  color: #493628;
  width: 100px;
  margin-top: -10px;
}

.width-formfloor {
  width: 100px;
  margin-left: 19px;
  color: #493628;
  margin-top: -10px;
}

.width-formroom {
  width: 100px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: -10px;
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

.save-btn {
  margin-top: -10px;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 16px;
}

/* กำหนดสีพื้นหลังและสีข้อความของปุ่ม */
.custom-btn {
  background-color: #f5eded !important;
  /* ใช้ !important เพื่อให้แน่ใจว่าการตั้งค่านี้จะถูกใช้ */
  color: #493628 !important;
  margin-left: 530px;
  width: 150px;
  height: 35px;
  border: 2px solid #493628;
}
</style>
