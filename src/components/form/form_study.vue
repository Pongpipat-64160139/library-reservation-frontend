<template class="back-ground">
  <v-container fluid class="back-ground ms-kob">
    <!-- Sheet1 จองห้อง -->
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
          <template
            #activator="{ props }"
            class="width-formdate1 text-field-rounded"
          >
            <!-- ปุ่มหรือฟิลด์ที่ใช้เปิด dropdown -->
            <v-text-field
              class="width-formdate1 text-field-rounded"
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
          class="width-formdate2 text-field-rounded"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template
            #activator="{ props }"
            class="width-formdate2 text-field-rounded"
          >
            <!-- ปุ่มหรือฟิลด์ที่ใช้เปิด dropdown -->
            <v-text-field
              class="width-formdate2 text-field-rounded"
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
                  ? new Date(endRepeatDate).toLocaleDateString('th-TH', {
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
          label=""
          rows="3"
          outlined
          class="width-detail text-field-rounded"
        />
      </span>
      <v-btn to="/table_study" type="submit" class="save-btn custom-btn">
        <v-icon left> mdi-content-save </v-icon>
        จองห้อง
      </v-btn>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRoomStore } from "@/stores/roomStore";

const numPeople = ref("");
const phoneNumber = ref("");
const menu = ref(false);
const startMenu = ref(false);
const endMenu = ref(false);
const startDate = ref(null);
const endDate = ref(null);
const endRepeatMenu = ref(false);
const endRepeatDate = ref(null);
const startTime = ref("08:00");
const endTime = ref("08:30");
const floor = ref(3);
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

export default defineComponent({
  setup() {
    const route = useRoute();
    const roomStore = useRoomStore();
    const roomType = ref((route.query.roomType as string) || "Group Study");
    const floor = ref(parseInt((route.query.floor as string) || "3"));
    const roomName = ref(
      decodeURIComponent(route.query.roomName as string) || ""
    );
    const startTime = ref(route.query.time || "08:00");

    const availableFloors = computed(() => {
      switch (roomType.value) {
        case "Group Study":
          return [3, 4, 5];
        case "Entertain":
          return [6];
        case "Meeting":
          return [2, 5, 6, 7,12];
        default:
          return [];
      }
    });

    const availableRooms = computed(() => {
      switch (roomType.value) {
        case "Group Study":
          if (floor.value === 3)
            return roomStore.studyFloor3.map((r) => r.roomName);
          if (floor.value === 4)
            return roomStore.studyFloor4.map((r) => r.roomName);
          if (floor.value === 5)
            return roomStore.studyFloor5.map((r) => r.roomName);
          break;
        case "Entertain":
          return roomStore.okeRooms
            .map((r) => r.roomName)
            .concat(roomStore.stvRooms.map((r) => r.roomName))
            .concat(roomStore.miniTheater.map((r) => r.roomName));
        case "Meeting":
          return roomStore.meetingRooms
            .filter((r) => r.floorId === floor.value)
            .map((r) => r.roomName);
        default:
          return [];
      }
    });

    onMounted(async () => {
      await roomStore.filteredEntertainRooms();
      await roomStore.initializeRooms();
    });

    return {
      floor,
      roomName,
      startTime,
      roomType,
      availableFloors,
      availableRooms,
    };
  },
  data() {
    return {
      numPeople: "",
      phoneNumber: "",
      menu: false,
      startMenu: false,
      endMenu: false,
      startDate: null,
      endDate: null,
      endRepeatMenu: false,
      endRepeatDate: null,
      startTime: "08:00",
      endTime: "08:30",
      floor: 3,
      floorRooms: {
        3: ["Room 301", "Room 302", "Room 303"],
        4: ["Room 401", "Room 402", "Room 403"],
        5: ["Room 501", "Room 502", "Room 503"],
      },
      room: "ศึกษากลุ่ม 1",
      repeatOption: "ไม่",
      timeOptions: [
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
      ],

      currentDate: this.formatDate(
        new Date("Tue Dec 03 2024 00:00:00 GMT+0700")
      ),

      showStartDatePicker: false,
      showEndDatePicker: false,
      currentStartDate: "",
      currentEndDate: "",
      holidays: [] as string[],
    };
  },

  watch: {
    startTime(newStartTime) {
      console.log("Start Time:", newStartTime); // สำหรับการดีบัก
      const availableTimes = this.filteredEndTimes();
      console.log("Available End Times:", availableTimes); // ตรวจสอบรายการที่กรองแล้ว
      this.endTime = availableTimes.length > 0 ? availableTimes[0] : ""; // ตั้งค่า endTime เป็นค่าแรก
    },
    floor(newFloor: keyof typeof this.floorRooms) {
      if (newFloor in this.floorRooms) {
        const firstRoom = this.floorRooms[newFloor]?.[0] || ""; // ใช้ optional chaining
        this.room = firstRoom;
      } else {
        console.error(`Invalid floor: ${newFloor}`);
        this.room = ""; // หรือค่า default
      }
    },
  },

  async mounted() {
    console.log("Initial startTime:", this.startTime);
    const availableTimes = this.filteredEndTimes();
    this.endTime = availableTimes.length > 0 ? availableTimes[0] : "";

    if (this.startTime === "20:00") {
      this.startTime = "19:30";
    }
  },

  methods: {
    filteredEndTimes() {
      if (this.startTime === "08:00") {
        return ["08:30", "09:00", "09:30", "10:00"];
      }
      if (this.startTime === "08:30") {
        return ["09:00", "09:30", "10:00", "10:30"];
      }
      if (this.startTime === "09:00") {
        return ["09:30", "10:00", "10:30", "11:00"];
      }
      if (this.startTime === "09:30") {
        return ["10:00", "10:30", "11:00", "11:30"];
      }
      if (this.startTime === "10:00") {
        return ["10:30", "11:00", "11:30", "12:00"];
      }
      if (this.startTime === "10:30") {
        return ["11:00", "11:30", "12:00", "12:30"];
      }
      if (this.startTime === "11:00") {
        return ["11:30", "12:00", "12:30", "13:00"];
      }
      if (this.startTime === "11:30") {
        return ["12:00", "12:30", "13:00", "13:30"];
      }
      if (this.startTime === "12:00") {
        return ["12:30", "13:00", "13:30", "14:00"];
      }
      if (this.startTime === "12:30") {
        return ["13:00", "13:30", "14:00", "14:30"];
      }
      if (this.startTime === "13:00") {
        return ["13:30", "14:00", "14:30", "15:00"];
      }
      if (this.startTime === "13:30") {
        return ["14:00", "14:30", "15:00", "15:30"];
      }
      if (this.startTime === "14:00") {
        return ["14:30", "15:00", "15:30", "16:00"];
      }
      if (this.startTime === "14:30") {
        return ["15:00", "15:30", "16:00", "16:30"];
      }
      if (this.startTime === "15:00") {
        return ["15:30", "16:00", "16:30", "17:00"];
      }
      if (this.startTime === "15:30") {
        return ["16:00", "16:30", "17:00", "17:30"];
      }
      if (this.startTime === "16:00") {
        return ["16:30", "17:00", "17:30", "18:00"];
      }
      if (this.startTime === "16:30") {
        return ["17:00", "17:30", "18:00", "18:30"];
      }
      if (this.startTime === "17:00") {
        return ["17:30", "18:00", "18:30", "19:00"];
      }
      if (this.startTime === "17:30") {
        return ["18:00", "18:30", "19:00", "19:30"];
      }
      if (this.startTime === "18:00") {
        return ["18:30", "19:00", "19:30", "20:00"];
      }
      if (this.startTime === "18:30") {
        return ["19:00", "19:30", "20:00"];
      }
      if (this.startTime === "19:00") {
        return ["19:30", "20:00"];
      }
      if (this.startTime === "19:30") {
        return ["20:00"];
      }

      return []; // ถ้า startTime ไม่มีใน timeOptions
    },

    validateNumber() {
      this.numPeople = this.numPeople.replace(/\D/g, "");
    },

    formatDate(date: Date) {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };

      const thaiDate = new Intl.DateTimeFormat("th-TH", options).format(date);

      return thaiDate;
    },
    allowedDates(date: Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const isHoliday = this.holidays.includes(formattedDate);

      return !isHoliday;
    },
    handleDateUpdate(val: any) {
      this.startDate = val;
      this.endDate = val;
      this.endRepeatDate = val;
      this.startMenu = false;
    },
    async fetchHolidays() {
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
            this.holidays = responseData.result.data.map(
              (holiday: { Date: string }) => holiday.Date
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      }
    },
  },
});

const showDatePicker = ref(false);
const currentDate = ref("");
const selectedDate = ref<string | null>(null);
const holidays = ref<string[]>([]);

const allowedDates = (date: unknown) => {
  if (!(date instanceof Date)) return false;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const isHoliday = holidays.value.includes(formattedDate);

  return !isHoliday;
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
