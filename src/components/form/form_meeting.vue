<template class="back-ground">
  <v-container fluid class="back-ground ms-kob">
    <!-- Sheet1 จองห้อง -->
    <v-sheet
      class="mx-auto mt-10"
      elevation="8"
      max-width="1200"
      style="background-color: #dfd3c3; border-radius: 16px"
    >
      <h1 class="pt-5 head-title text-center pb-10">จองห้อง</h1>

      <!-- span1 -->
      <span class="d-flex">
        <h1 class="ms-16 pt-5 head1-title">ชื่อ</h1>
        <v-text-field
          class="width-formname text-field-rounded"
          single-line
          outlined
          label=""
        />
        <h1 class="ps-15 pt-5 head1-title">จำนวนคน</h1>
        <v-text-field
          class="width-formamount text-field-rounded"
          single-line
          label=""
          v-model="numPeople"
          :rules="[(v) => /^\d+$/.test(v) || '']"
          @input="validateNumber"
        />

        <h1 class="ps-15 pt-5 head1-title">เบอร์โทรติดต่อ</h1>
        <v-text-field
          class="width-formtell text-field-rounded pe-7"
          single-line
          label=""
          v-model="phoneNumber"
          :rules="[(v) => /^\d{10}$/.test(v) || '']"
        />
      </span>

      <!-- span2 -->
      <span class="d-flex">
        <h1 class="ps-7 pt-5 head1-title">วันที่เริ่ม</h1>
        <v-text-field
          class="width-formdate text-field-rounded"
          single-line
          outlined
          label=""
        />
        <h1 class="ps-5 pt-5 head1-title">เวลา</h1>
        <v-select
          v-model="startTime"
          :items="timeOptions"
          outlined
          label=""
          class="width-formtime text-field-rounded pe-7"
        />
        <h1 class="pt-5 head1-title">วันที่จบ</h1>
        <v-text-field
          class="width-formdate text-field-rounded"
          single-line
          outlined
          label=""
        />
        <h1 class="ps-5 pt-5 head1-title">เวลา</h1>
        <v-select
          v-model="endTime"
          :items="filteredEndTimes"
          outlined
          label=""
          class="width-formtime1 text-field-rounded pe-7"
        />
      </span>

      <!-- span3 -->
      <span class="d-flex">
        <h1 class="ps-16 pt-5 head1-title">ชั้น</h1>
        <v-select
          v-model="floor"
          :items="[2, 3, 4, 5, 6, 7]"
          outlined
          label="เลือกชั้น"
          class="width-formfloor text-field-rounded"
        />
        <h1 class="ps-15 pt-5 head1-title">ห้อง</h1>
        <v-select
          v-model="room"
          :items="availableRooms"
          outlined
          label="เลือกห้อง"
          class="width-formroom text-field-rounded"
        />
        <h1 class="ps-15 pt-5 head1-title">ชื่อป้ายเวที</h1>
        <v-text-field
          class="width-formtag text-field-rounded pe-7"
          single-line
          outlined
          label="กรุณาแจ้งล่วงหน้า 3 วันทำการ"
        />
      </span>

      <!-- span4 -->
      <span class="d-flex">
        <h1 class="ps-12 pt-5 head1-title">ทำซ้ำ</h1>
        <v-select
          v-model="repeatOption"
          :items="['ไม่', 'ทำซ้ำ']"
          outlined
          label=""
          class="width-formfloor text-field-rounded"
        />
        <h1 class="ps-12 pt-5 head1-title">สิ้นสุด</h1>
        <v-text-field
          class="width-formroom text-field-rounded"
          single-line
          outlined
          label=""
        />
        <h1 class="ps-15 width-formblank1"></h1>
      </span>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    return {
      numPeople: "",
      phoneNumber: "",
      startDate: "",
      startTime: "08:00",
      endDate: "",
      endTime: "-",
      floor: 2,
      room: 201,
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
      ],
      floorRooms: {
        2: ["201"],
        3: [
          "ศึกษากลุ่ม 1",
          "ศึกษากลุ่ม 2",
          "ศึกษากลุ่ม 3",
          "ศึกษากลุ่ม 4",
          "ศึกษากลุ่ม 5",
          "ศึกษากลุ่ม 6",
        ],
        4: [
          "ศึกษากลุ่ม 1",
          "ศึกษากลุ่ม 2",
          "ศึกษากลุ่ม 3",
          "ศึกษากลุ่ม 4",
          "ศึกษากลุ่ม 5",
        ],
        5: ["Lecturer's Room 1", "Lecturer's Room 2", "Lecturer's Room 3"],
        6: [
          "604 Smart Board",
          "Mini Studio",
          "Cyber Zone 1",
          "Cyber Zone 2",
          "Live for Life",
        ],
        7: ["706", "707"],
      },
      showStartDatePicker: false,
      showEndDatePicker: false,
      currentStartDate: "",
      currentEndDate: "",
    };
  },
  computed: {
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
        return ["17:30", "18:00", "18:30"];
      }
      if (this.startTime === "17:30") {
        return ["18:00", "18:30"];
      }
      if (this.startTime === "18:00") {
        return ["18:30"];
      }

      return this.timeOptions.filter((time) => time !== "-");
    },
    availableRooms() {
      // Ensure that this.floor is valid before accessing floorRooms
      return this.floor !== null && this.floor !== undefined
        ? this.floorRooms[this.floor]
        : [];
    },
  },

  methods: {
    validateNumber() {
      // กรองเฉพาะตัวเลข
      this.numPeople = this.numPeople.replace(/\D/g, "");
    },
  },
});
</script>

<style scoped>
/* เพิ่มการอ้างอิงฟอนต์ Kanit จาก Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

/* ใช้ฟอนต์ Kanit ทั่วทั้งโปรเจ็กต์ */
* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.head-title {
  font-weight: 600;
  font-size: 24px;
}

.head1-title {
  font-weight: 400;
  font-size: 18px;
  font-weight: 600;
  margin-top: -4px;
}

.text-center {
  text-align: center;
}

.mt-2 {
  margin-top: 10px;
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
  margin-left: 20px;
  color: #493628;
}

.width-formamount {
  font-size: 50px;
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
  font-size: 20px;
  margin-left: 20px;
  color: #493628;
  width: 135px;
}

.width-formtime1 {
  font-size: 20px;
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
  width: 10px;
  font-size: 50px;
  margin-left: 20px;
  color: #493628;
}

.width-formroom {
  width: 100px;
  font-size: 50px;
  margin-left: 20px;
  color: #493628;
}

.width-formtag {
  width: 130px;
  font-size: 50px;
  margin-left: 20px;
  color: #493628;
}

.width-formblank1 {
  width: 465px;
  font-size: 50px;
  margin-left: 20px;
  color: #493628;
}

.text-field-rounded ::v-deep(.v-input__control) {
  background-color: #f5eded; /* ตั้งค่าสีพื้นหลัง */
  border-radius: 5px;
  border: 2px solid #493628;
}

.text-field-rounded ::v-deep(.v-input) {
  border-radius: 10px;
}
</style>
