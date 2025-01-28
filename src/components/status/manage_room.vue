<template>
  <Header_page />
  <v-container fluid class="back-ground mg-toppage">
    <!-- Breadcrumbs -->
    <v-breadcrumbs
      :items="items"
      divider=">"
      class="text-breadcrumbs mg-toptable"
    >
      <template #item="{ item }" class="">
        <router-link
          v-if="!item.disabled && item.href"
          :to="item.href"
          class="breadcrumb-link"
        >
          {{ item.title }}
        </router-link>

        <span v-else class="breadcrumb-disabled">
          {{ item.title }}
        </span>
      </template>
    </v-breadcrumbs>

    <v-row>
      <!-- ปฏิทิน Flatpickr ใช้เลือกวันที่ -->
      <v-col class="d-flex justify-center" cols="10">
        <vue-flatpickr
          v-model="selectedDate"
          class="text-center btn-date"
          :config="flatpickrConfig"
          :key="$route.fullPath"
        />
      </v-col>

      <!-- ปุ่มสำหรับเปิด Dialog เพื่อตั้งค่าการเปิด-ปิดห้อง (ทุกห้อง) -->
      <v-col cols="2">
        <v-btn
          class="btn-settingroom"
          rounded
          large
          @click="closeServiceDialog = true"
        >
          <v-icon left> mdi-close </v-icon>
          ตั้งค่าการเปิด-ปิดห้อง
        </v-btn>
      </v-col>
    </v-row>

    <div v-for="floor in 6" :key="floor" class="mg-bttable">
      <h2 class="text-floor">ชั้น {{ floor + 1 }}</h2>
      <v-data-table
        :headers="headers"
        :items="filteredRooms(floor + 1)"
        class="rd-table"
        style="table-layout: fixed; width: 100%"
        hide-default-footer
      >
        <template #headers>
          <tr>
            <th style="width: 20%">ห้อง</th>
            <th style="width: 20%">ผู้จอง</th>
            <th style="width: 20%">เวลา</th>
            <th style="width: 20%">สถานะ</th>
            <th style="width: 20%">จัดการ</th>
          </tr>
        </template>
        <template #item="{ item, index }">
          <tr :class="index % 2 === 0 ? 'row-even' : 'row-odd'">
            <td>{{ item.room }}</td>
            <td>{{ item.user }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.status }}</td>
            <!-- ปุ่มสำหรับเปิด Dialog เพื่อปิดบริการจองห้อง (รายห้อง) -->
            <td>
              <v-btn
                icon
                class="btn-setting-oneroom"
                width="40"
                height="40"
                @click="showDialog(item)"
              >
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <!-- Dialog ปิดให้บริการจองห้อง (รายห้อง) -->
    <v-dialog v-model="dialog" max-width="500px" max-height="600px">
      <v-card>
        <v-card-title class="dialog-setting text-center mt-5">
          ตั้งค่าการเปิด-ปิดบริการ (รายห้อง)
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="remark"
            label="หมายเหตุ"
            density="compact"
            variant="outlined"
          />

          <v-select
            v-model="status"
            label="สถานะ"
            :items="['เปิด', 'ปิด']"
            density="compact"
            variant="outlined"
          />

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="startDate"
                label="วันที่เริ่ม"
                type="date"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="startTime"
                label="เวลา"
                type="time"
                density="compact"
                variant="outlined"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="endDate"
                label="ถึงวันที่"
                type="date"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="endTime"
                label="เวลา"
                type="time"
                density="compact"
                variant="outlined"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-select
                v-model="selectedFloor"
                label="ชั้น"
                :items="Object.keys(floorRooms)"
                density="compact"
                variant="outlined"
                @update:model-value="updateRoomOptions"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="selectedRoom"
                label="ห้อง"
                :items="roomOptions"
                density="compact"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="d-flex justify-center mb-5">
          <v-btn class="rd-btncancel" variant="flat" @click="dialog = false">
            ยกเลิก
          </v-btn>
          <v-btn class="btn-cancel" variant="flat" @click="saveChanges">
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog ปิดให้บริการจองห้อง (ทุกห้อง) -->
    <v-dialog v-model="closeServiceDialog" max-width="500px" max-height="600px">
      <v-card>
        <v-card-title class="dialog-setting text-center mt-5">
          ตั้งค่าการเปิด-ปิดบริการ (ทุกห้อง)
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="remark"
            label="หมายเหตุ"
            density="compact"
            variant="outlined"
          />

          <v-select
            v-model="status"
            label="สถานะ"
            :items="['เปิด', 'ปิด']"
            density="compact"
            variant="outlined"
          />

          <v-radio-group v-model="selectedDayType" label="เลือกวัน">
            <v-row class="d-flex align-center">
              <v-col cols="6">
                <v-radio label="วันปกติ" value="วันปกติ"></v-radio>
              </v-col>
              <v-col cols="6">
                <v-radio
                  label="วันเสาร์-อาทิตย์"
                  value="วันเสาร์-อาทิตย์"
                ></v-radio>
              </v-col>
            </v-row>
          </v-radio-group>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="startDate"
                label="วันที่เริ่ม"
                type="date"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="startTime"
                label="เวลา"
                type="time"
                density="compact"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="endDate"
                label="ถึงวันที่"
                type="date"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="endTime"
                label="เวลา"
                type="time"
                density="compact"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center mb-5">
          <v-btn
            class="rd-btncancel"
            variant="flat"
            @click="closeServiceDialog = false"
          >
            ยกเลิก
          </v-btn>
          <v-btn class="btn-cancel" variant="flat" @click="saveCloseService">
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import VueFlatpickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { Thai } from "flatpickr/dist/l10n/th.js";
const selectedDayType = ref("วันปกติ");
const selectedDate = ref<string | null>(null);

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
  parseDate: (dateStr: string, format: string) => {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10) - 543;
      return new Date(year, month, day);
    }
    return null;
  },

  onReady: (selectedDates: Date[], dateStr: string, instance: any) => {
    const updateYearDropdown = () => {
      const yearSelect = instance?.yearElements?.[0]; // ตรวจสอบว่ามีค่าอยู่จริง
      if (yearSelect) {
        yearSelect.value = (instance.currentYear + 543).toString();
        Array.from(yearSelect.options).forEach((option) => {
          const optionYear = parseInt(option.value, 10);
          option.textContent = (optionYear + 543).toString();
        });
      }
    };

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
        if (!isNaN(currentYear)) {
          yearDropdown.value = (currentYear + 543).toString();
        }
      };

      updateYearsToThai();
      yearDropdown.addEventListener("change", updateYearsToThai);
    }
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
  },

  onYearChange: (
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

const closeServiceDialog = ref(false);

watch(selectedDayType, (newValue) => {
  if (newValue === "วันปกติ") {
    startTime.value = "08:00";
    endTime.value = "20:30";
  } else if (newValue === "วันเสาร์-อาทิตย์") {
    startTime.value = "09:00";
    endTime.value = "19:00";
  }
});

const saveCloseService = () => {
  console.log("หมายเหตุ:", remark.value);
  console.log("สถานะ:", status.value);
  console.log("วันที่เริ่ม:", startDate.value, startTime.value);
  console.log("ถึงวันที่:", endDate.value, endTime.value);
  closeServiceDialog.value = false;
};
const items = [
  { title: "อนุมัติสถานะการจอง", disabled: false, href: "/manage_status" },
  { title: "สถานะห้อง", disabled: true, href: "/" },
];

const headers = [
  { title: "ห้อง", key: "room" },
  { title: "ผู้จอง", key: "user" },
  { title: "วันที่", key: "date" },
  { title: "สถานะ", key: "status" },
  { title: "จัดการ", key: "actions" },
];

const floorRooms: FloorRooms = {
  2: ["201 (20-50)"],
  3: [
    "ศึกษากลุ่ม 1 (3-5)",
    "ศึกษากลุ่ม 2 (3-5)",
    "ศึกษากลุ่ม 3 (3-5)",
    "ศึกษากลุ่ม 4 (3-5)",
    "ศึกษากลุ่ม 5 (3-5)",
    "ศึกษากลุ่ม 6 (3-5)",
  ],
  4: [
    "ศึกษากลุ่ม 1 (3-5)",
    "ศึกษากลุ่ม 2 (3-5)",
    "ศึกษากลุ่ม 3 (3-5)",
    "ศึกษากลุ่ม 4 (3-5)",
    "ศึกษากลุ่ม 5 (3-5)",
  ],
  5: [
    "ศึกษากลุ่ม 1 (3-5)",
    "ศึกษากลุ่ม 2 (3-5)",
    "ศึกษากลุ่ม 3 (3-5)",
    "ศึกษากลุ่ม 4 (3-5)",
    "ศึกษากลุ่ม 5 (3-5)",
    "Lecturer's Room 1 (3-5)",
    "Lecturer's Room 2 (3-5)",
    "Lecturer's Room 3 (3-5)",
  ],
  6: [
    "STV 1 (3-5)",
    "STV 2 (3-5)",
    "STV 3 (3-5)",
    "STV 4 (3-5)",
    "STV 5 (3-5)",
    "STV 6 (3-5)",
    "STV 7 (3-5)",
    "STV 8 (3-5)",
    "STV 9 (3-5)",
    "LIBRA OKE 1 (3-5)",
    "LIBRA OKE 2 (3-5)",
    "MINI THEATER (10-30)",
    "604 Smart Board (8-10)",
    "Mini Studio",
    "Cyber Zone 1 (ไม่เกิน 70)",
    "Cyber Zone 2 (ไม่เกิน 30)",
    "Live for Life (มากกว่า 3)",
  ],
  7: ["706", "707"],
};

const mockUsers = [
  "สมชาย ใจดี",
  "สมหญิง รักเรียน",
  "นพดล ก้าวหน้า",
  "กนกพร ตั้งใจ",
  "อนุชา ขยัน",
  "วิไลวรรณ สุขสันต์",
  "สุชาติ สมบูรณ์",
  "ศิริพร จันทร์เจริญ",
];

const data = ref(
  Object.entries(floorRooms).flatMap(([floor, rooms]) =>
    rooms.map((room) => {
      const hasUser = Math.random() > 0.5; // สุ่มว่ามีผู้จองหรือไม่
      return {
        room,
        user: hasUser
          ? mockUsers[Math.floor(Math.random() * mockUsers.length)]
          : "-", // ถ้าไม่มี ให้เป็น "-"
        time: hasUser ? "08:00-10:00" : "-", // ถ้าไม่มี ให้เป็น "-"
        status: hasUser ? (Math.random() > 0.5 ? "ไม่ว่าง" : "จอง") : "ว่าง", // ถ้าไม่มี ให้เป็น "ว่าง"
        floor: Number(floor),
      };
    })
  )
);

const filteredRooms = (floor: number) => {
  return data.value
    .filter((item) => item.floor === floor)
    .map((item) => ({
      ...item,
      user: item.user === "-" ? "-" : item.user, // หากไม่มีการจอง ผู้จอง = "-"
      time: item.time === "-" ? "-" : item.time, // หากไม่มีการจอง เวลา = "-"
      status: item.status || "ว่าง", // หากไม่มีสถานะ ให้สถานะ = "ว่าง"
    }));
};

const dialog = ref(false);
const selectedItem = ref<any>(null);

const showDialog = (item: any) => {
  selectedItem.value = item;
  dialog.value = true;
};

interface FloorRooms {
  [key: string]: string[];
}

const remark = ref("");
const status = ref("เปิด");
const startDate = ref(new Date().toISOString().split("T")[0]);
const endDate = ref(new Date().toISOString().split("T")[0]);
const startTime = ref("08:00");
const endTime = ref("20:30");

const saveChanges = () => {
  console.log("หมายเหตุ:", remark.value);
  console.log("สถานะ:", status.value);
  console.log("วันที่เริ่ม:", startDate.value, startTime.value);
  console.log("ถึงวันที่:", endDate.value, endTime.value);
  console.log("ชั้น:", selectedFloor.value);
  console.log("ห้อง:", selectedRoom.value);
  dialog.value = false;
};

const selectedFloor = ref("2");
const roomOptions = ref<string[]>(floorRooms[selectedFloor.value]);
const selectedRoom = ref(roomOptions.value[0]);

const updateRoomOptions = () => {
  roomOptions.value = floorRooms[selectedFloor.value] || [];
  selectedRoom.value = roomOptions.value[0] || "";
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.back-ground {
  background-color: #f9f3ea;
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.mg-toppage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  margin-top: 100px;
}

.text-breadcrumbs {
  font-weight: 600;
  font-size: 24px;
  margin-top: -1px;
}

.mg-toptable {
  margin-bottom: -25px;
}

.breadcrumb-link {
  text-decoration: none;
  color: #493628;
  font-weight: 400;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-disabled {
  color: #493628;
  font-weight: 600;
}

.btn-date {
  width: 300px;
  background-color: #f5eded;
  border: 1px solid #493628;
  height: 57px;
  border-radius: 5px;
  z-index: 1000;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  margin-left: 900px;
}

.btn-settingroom {
  font-weight: 400;
  font-size: 16px;
  color: #493628;
  background-color: #f5eded;
  border: 1px solid #493628;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 270px;
  height: 57px;
}

.btn-settingroom:hover {
  background-color: #f5eded;
}

.mg-bttable {
  margin-bottom: 25px;
}

.text-floor {
  margin-bottom: 10px;
  margin-left: 15px;
}

.rd-table {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #cdbba7; /* กำหนดกรอบของตาราง */
  border-collapse: collapse; /* ให้กรอบรวมกัน */
  font-size: 18px;
}

.dialog-setting {
  font-weight: 600;
  font-size: 18px;
}

.row-even {
  background-color: #f2efea;
}

.row-odd {
  background-color: #e6dfd5;
}

th {
  background-color: #cdbba7;
  font-weight: bold;
  font-size: 16px;
}

.btn-setting-oneroom {
  background-color: #f5eded;
  border-radius: 10px;
  border: 1px solid #493628;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
}

.rd-btncancel {
  font-weight: 400;
  font-size: 16px;
  color: #493628;
  background-color: #dad0c2;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  margin-right: 30px;
}

.btn-cancel {
  font-weight: 400;
  font-size: 16px;
  background-color: #b5cfb7;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
}

.rd-form,
.v-input.v-input--outlined .v-input__control {
  border-radius: 5px !important;
  border: 2px solid #493628;
  height: 55px;
}


</style>
