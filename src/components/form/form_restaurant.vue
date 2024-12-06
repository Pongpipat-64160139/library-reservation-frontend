<template>
  <h1 class="head-more ms-10 mt-5">ตัวเลือกเพิ่มเติม</h1>
  <v-expansion-panels class="pd-more ms-16 me-1">
    <v-expansion-panel
      class="me-7 head-inmore ps-1 mb-5"
      title="ต้องการอาหารว่าง/กลางวัน (กรุณาแจ้งล่วงหน้า 2 วันทำการ)"
    >
      <template v-slot:text>
        <div class="cl-div">
          <!-- อาหารว่าง -->
          <h4 class="ms-10">อาหารว่าง</h4>
          <v-checkbox
            class="d-flex flex-wrap ms-8 mg-break"
            label="Break เช้า"
          />
          <div class="d-flex flex-wrap">
            <v-select
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              v-model="breakMorning.time"
            ></v-select>
            <v-text-field
              label="จำนวนคน"
              type="number"
              class="me-4 text-field-rounded width-amount"
              v-model="breakMorning.people"
            ></v-text-field>
            <v-text-field
              class="text-field-rounded width-money"
              label="งบประมาณต่อคน"
              type="number"
              v-model="breakMorning.budget"
            ></v-text-field>
          </div>

          <v-checkbox
            class="d-flex flex-wrap ms-8 mg-break"
            label="Break กลางวัน"
          />
          <div class="d-flex flex-wrap">
            <v-select
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              v-model="breakLunch.time"
            ></v-select>
            <v-text-field
              label="จำนวนคน"
              type="number"
              class="me-4 text-field-rounded width-amount"
              v-model="breakLunch.people"
            ></v-text-field>
            <v-text-field
              class="text-field-rounded width-money"
              label="งบประมาณต่อคน"
              type="number"
              v-model="breakLunch.budget"
            ></v-text-field>
          </div>

          <v-checkbox
            class="d-flex flex-wrap ms-8 mg-break"
            label="Break บ่าย"
          />
          <div class="d-flex flex-wrap">
            <v-select
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              v-model="breakAfternoon.time"
            ></v-select>
            <v-text-field
              label="จำนวนคน"
              type="number"
              class="me-4 text-field-rounded width-amount"
              v-model="breakAfternoon.people"
            ></v-text-field>
            <v-text-field
              class="text-field-rounded width-money"
              label="งบประมาณต่อคน"
              type="number"
              v-model="breakAfternoon.budget"
            ></v-text-field>
          </div>

          <!-- อาหารกลางวัน -->
          <h4 class="ms-10 mg-lunch">อาหารกลางวัน</h4>
          <div class="d-flex flex-wrap">
            <v-select
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time mt-2"
              :menu-props="{ maxHeight: 200 }"
              v-model="lunch.time"
            ></v-select>
            <v-text-field
              label="จำนวนคน"
              type="number"
              class="me-4 text-field-rounded width-amount mt-2"
              v-model="lunch.people"
            ></v-text-field>
            <v-text-field
              class="text-field-rounded width-money mt-2"
              label="งบประมาณต่อคน"
              type="number"
              v-model="lunch.budget"
            ></v-text-field>
          </div>
        </div>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      times: [
        "-",
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
      ], // รายการเวลาที่เลือกได้
      breakMorning: { time: "-", people: 0, budget: 0 },
      breakLunch: { time: "-", people: 0, budget: 0 },
      breakAfternoon: { time: "-", people: 0, budget: 0 },
      lunch: { time: "-", people: 0, budget: 0 },
    };
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

.head-more {
  font-weight: 600;
  font-size: 18px;
  color: #493628;
  margin-top: 10px;
}

.width-file {
  width: 100px;
  margin-left: 10px;
  color: #493628;
  padding-right: 30px;
}

.head-inmore {
  font-weight: 500;
  font-size: 17px;
  color: #493628;
  margin-top: 10px;
  background-color: #f5eded;
  border: 2px solid #493628;
}

.pd-more {
  padding-right: 80px;
}

.text-field-rounded ::v-deep(.v-input__control) {
  background-color: #f5eded;
  /* ตั้งค่าสีพื้นหลัง */
  border-radius: 5px;
  border: 2px solid #493628;
}

.text-field-rounded ::v-deep(.v-input) {
  border-radius: 10px;
}

.width-time {
  width: 30px;
  margin-left: 40px;
  margin-right: 20px;
  margin-top: -5px;
  color: #493628;
}

.width-amount {
  width: 30px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: -5px;
  color: #493628;
}

.width-money {
  width: 30px;
  margin-left: 20px;
  margin-right: 50px;
  margin-top: -5px;
  color: #493628;
}

.mg-lunch {
  margin-top: 10px;
}

.mg-break {
  margin-top: -10px;
}

.cl-div {
  background-color: #f5eded;
  border-radius: 10px;
}
</style>
