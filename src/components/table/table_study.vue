<template>
  <Header_page />
  <v-container fluid class="back-ground ms-kob">
    <v-container>
      <v-row justify="center" align="center">
        <!-- Dropdown สำหรับเลือกประเภทห้อง -->
        <v-col
          class="d-flex justify-center"
          cols="auto"
          style="margin-right: 100px"
        >
          <v-select
            class="width-dd v-selectcolor"
            label="ประเภทห้อง"
            :items="typeroom"
            v-model="selectedPage"
            @update:modelValue="onSelectChange"
          >
          </v-select>
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
            <v-icon class="calendar-icon">mdi-calendar</v-icon>
          </v-btn>

          <!-- v-date-picker แสดงเมื่อ showDatePicker เป็น true -->
          <v-date-picker
            v-if="showDatePicker"
            class="date-picker-position"
            v-model="selectedDate"
            @update:model-value="handleDateSelect"
            @click:clear="selectedDate = null"
            :allowed-dates="allowedDates"
            :day-class="getDayClass"
          ></v-date-picker>
        </v-col>
      </v-row>
    </v-container>
    <!-- ตารางสำหรับชั้น 3 -->
    <h1 class="pt-5 head-title pb-10 ml-left">
      ชั้น 3 ห้อง ศึกษากลุ่ม
      <v-icon class="mb-1 ms-2">mdi-account-group</v-icon>
    </h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="font-table">เวลา</th>
            <th
              class="room-column font-table"
              v-for="(room, index) in rooms3"
              :key="room"
            >
              {{ room }}
              <v-icon class="ms-2">mdi-television</v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, index) in timeSlots"
            :key="time"
            :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
            @click.stop="goToFormStudy"
          >
            <td class="time-column font-table">{{ time }}</td>
            <td class="room6-column" v-for="room in rooms3" :key="room"></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 4 -->
    <h1 class="pt-5 head-title pb-10 ml-left">
      ชั้น 4 ห้อง ศึกษากลุ่ม
      <v-icon class="mb-1 ms-2">mdi-account-group</v-icon>
    </h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th class="font-table" v-for="(room, index) in rooms4" :key="room">
              {{ room }}
              <v-icon v-if="index === 3 || index === 4" class="ms-2"
                >mdi-television</v-icon
              >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, index) in timeSlots"
            :key="time"
            :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
            @click.stop="goToFormStudy"
          >
            <td class="time-column font-table">{{ time }}</td>
            <td class="room5-column" v-for="room in rooms4" :key="room"></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>

    <!-- ตารางสำหรับชั้น 5 -->
    <h1 class="pt-5 head-title pb-10 ml-left">
      ชั้น 5 ห้อง ศึกษากลุ่ม
      <v-icon class="mb-1 ms-2">mdi-account-group</v-icon>
    </h1>
    <v-container class="ms-minustop">
      <v-simple-table class="table-bordered">
        <thead>
          <tr>
            <th class="time-column font-table">เวลา</th>
            <th class="font-table" v-for="(room, index) in rooms5" :key="room">
              {{ room }}
              <v-icon v-if="index === 3 || index === 4" class="ms-2"
                >mdi-television</v-icon
              >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, index) in timeSlots"
            :key="time"
            :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
            @click.stop="goToFormStudy"
          >
            <td class="time-column font-table">{{ time }}</td>
            <td class="room5-column" v-for="room in rooms5" :key="room"></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </v-container>
  <Footer_page />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Footer_page from "../footer/footer_page.vue";

const showDatePicker = ref(false);
const currentDate = ref("");
const selectedDate = ref<string | null>(null);
const holidays = ref<string[]>([]); // Store holiday dates

// Fetch holidays from API
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
      // เก็บวันหยุดจาก result.data
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

onMounted(() => {
  const currentYear = new Date().getFullYear().toString();
  fetchHolidays(currentYear).then(() => {
    console.log("Holidays fetched:", holidays.value); // Log to check the holidays
  });
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
    weekday: "long", // แสดงชื่อวัน
    day: "numeric", // แสดงวันที่
    month: "long", // แสดงเดือน
    year: "numeric", // แสดงปี
  };

  // ใช้ Intl.DateTimeFormat เพื่อแสดงวันที่ในรูปแบบที่ต้องการ
  const formatter = new Intl.DateTimeFormat("th-TH", options);
  currentDate.value = formatter.format(date);
};

// เรียกใช้ฟังก์ชั่นเพื่อให้ได้วันที่ปัจจุบันเมื่อโหลดหน้า
getCurrentDate();

const router = useRouter();
const selectedPage = ref("Group Study Room");

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

const rooms3 = ["ห้อง 1", "ห้อง 2", "ห้อง 3", "ห้อง 4", "ห้อง 5", "ห้อง 6"];
const rooms4 = ["ห้อง 1", "ห้อง 2", "ห้อง 3", "ห้อง 4", "ห้อง 5"];
const rooms5 = ["ห้อง 1", "ห้อง 2", "ห้อง 3", "ห้อง 4", "ห้อง 5"];

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
</script>

<style scoped>
/* เพิ่มการอ้างอิงฟอนต์ Kanit จาก Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
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

.room6-column {
  width: calc(100% / 6);
}

.room5-column {
  width: calc(100% / 5);
}

.table-bordered thead th {
  background-color: #ead8c0;
  font-weight: bold;
}

.table-bordered td {
  position: relative;
  z-index: 1;
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

.ms-kob {
  margin-top: -600px;
}

.ms-minustop {
  margin-top: -40px;
}

.ml-left {
  margin-left: 240px;
}

.width-dd {
  width: 300px;
}

.v-select .v-input__control {
  border-radius: 4px;
}

.back-ground {
  background-color: #f9f3ea;
}

.v-selectcolor {
  background-color: #f5eded;
  border: 1px solid #493628;
  height: 57px;
  border-radius: 5px;
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
  margin-left: 10px;
  font-size: 20px;
  color: #493628;
}

.v-date-picker :deep(.v-btn) {
  font-size: 10px !important;
  /* ปรับขนาดฟอนต์ */
  width: 20px !important;
  height: 20px !important;
  border-radius: 100% !important;
  /* หากต้องการให้ปุ่มเป็นวงกลม */
}

/* ขนาดฟอนต์สำหรับ "Select date" */
.v-date-picker :deep(.v-picker-title) {
  font-size: 15px !important;
  margin-top: 10px;
}
</style>
