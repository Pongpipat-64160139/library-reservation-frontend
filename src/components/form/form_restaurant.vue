<template>
  <!-- หัวข้อหลักของตัวเลือกเพิ่มเติม -->
  <h1 class="head-more ms-10 mt-5">ตัวเลือกเพิ่มเติม</h1>

  <!-- ส่วนของแผงขยายข้อมูลตัวเลือกเพิ่มเติม -->
  <v-expansion-panels class="pd-more ms-16 me-1">
    <v-expansion-panel
      class="me-7 head-inmore ps-1 mb-5"
      title="ต้องการอาหารว่าง/กลางวัน (กรุณาแจ้งล่วงหน้า 2 วันทำการ)"
    >
      <!-- ส่วนเนื้อหาที่ถูกแสดงเมื่อกดขยาย -->
      <template #text>
        <div class="cl-div">
          <!-- ส่วนของตัวเลือกอาหารว่าง -->
          <h4 class="ms-10 head-more">อาหารว่าง</h4>

          <!-- Break เช้า -->
          <v-checkbox
            class="d-flex flex-wrap ms-8 mg-break"
            label="Break เช้า"
            v-model="isEnableBreakMorning"
          />
          <div class="d-flex flex-wrap">
            <!-- เลือกเวลาอาหารว่างช่วงเช้า -->
            <v-select
              v-model="breakMorning.time"
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              :disabled="!isEnableBreakMorning"
            />
            <!-- กรอกจำนวนคนสำหรับอาหารว่างช่วงเช้า -->
            <v-text-field
              v-model="breakMorning.people"
              label="จำนวนคน"
              type="number"
              class="me-4 text-field-rounded width-amount"
              :disabled="!isEnableBreakMorning"
            />
            <!-- กรอกงบประมาณต่อคนสำหรับอาหารว่างช่วงเช้า -->
            <v-text-field
              v-model="breakMorning.budget"
              class="text-field-rounded width-money"
              label="งบประมาณต่อคน"
              type="number"
              :disabled="!isEnableBreakMorning"
            />
          </div>

          <!-- Break กลางวัน -->
          <v-checkbox
            class="d-flex flex-wrap ms-8 mg-break"
            label="Break กลางวัน"
            v-model="isEnableBreakmidday"
          />
          <div class="d-flex flex-wrap">
            <!-- เลือกเวลาอาหารว่างช่วงกลางวัน -->
            <v-select
              v-model="breakLunch.time"
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              :disabled="!isEnableBreakmidday"
            />
            <!-- กรอกจำนวนคนสำหรับอาหารว่างช่วงกลางวัน -->
            <v-text-field
              v-model="breakLunch.people"
              label="จำนวนคน"
              type="number"
              class="me-4 text-field-rounded width-amount"
              :disabled="!isEnableBreakmidday"
            />
            <!-- กรอกงบประมาณต่อคนสำหรับอาหารว่างช่วงกลางวัน -->
            <v-text-field
              v-model="breakLunch.budget"
              class="text-field-rounded width-money"
              label="งบประมาณต่อคน"
              type="number"
              :disabled="!isEnableBreakmidday"
            />
          </div>

          <!-- Break บ่าย -->
          <v-checkbox
            class="d-flex flex-wrap ms-8 mg-break"
            label="Break บ่าย"
            v-model="isEnableBreakAfternoon"
          />
          <div class="d-flex flex-wrap">
            <!-- เลือกเวลาอาหารว่างช่วงบ่าย -->
            <v-select
              v-model="breakAfternoon.time"
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              :disabled="!isEnableBreakAfternoon"
            />
            <!-- กรอกจำนวนคนสำหรับอาหารว่างช่วงบ่าย -->
            <v-text-field
              v-model="breakAfternoon.people"
              label="จำนวนคน"
              type="number"
              class="me-4 text-field-rounded width-amount"
              :disabled="!isEnableBreakAfternoon"
            />
            <!-- กรอกงบประมาณต่อคนสำหรับอาหารว่างช่วงบ่าย -->
            <v-text-field
              v-model="breakAfternoon.budget"
              class="text-field-rounded width-money"
              label="งบประมาณต่อคน"
              type="number"
              :disabled="!isEnableBreakAfternoon"
            />
          </div>

          <!-- ส่วนของตัวเลือกอาหารกลางวัน -->
          <h4 class="ms-10 head-more mg-lunch">อาหารกลางวัน</h4>
          <div class="d-flex flex-wrap">
            <!-- เลือกเวลาอาหารกลางวัน -->
            <v-select
              v-model="lunch.time"
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time mt-2"
              :menu-props="{ maxHeight: 200 }"
            />
            <!-- กรอกจำนวนคนสำหรับอาหารกลางวัน -->
            <v-text-field
              v-model="lunch.people"
              label="จำนวนคน"
              type="number"
              class="me-4 text-field-rounded width-amount mt-2"
            />
            <!-- กรอกงบประมาณต่อคนสำหรับอาหารกลางวัน -->
            <v-text-field
              v-model="lunch.budget"
              class="text-field-rounded width-money mt-2"
              label="งบประมาณต่อคน"
              type="number"
            />
          </div>

          <!-- ส่วนรายละเอียดเพิ่มเติม -->
          <div>
            <h1 class="head-more ms-10">รายละเอียดเพิ่มเติม</h1>
            <v-textarea
              label=""
              rows="3"
              outlined
              class="ms-10 text-field-rounded me-7 mt-2"
            />
          </div>
        </div>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const isEnableBreakMorning = ref(false);
const isEnableBreakmidday = ref(false);
const isEnableBreakAfternoon = ref(false);
// ตัวเลือกเวลาที่สามารถเลือกได้ในฟอร์ม
const times = ref([
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
]);
// ตัวแปรเก็บข้อมูลสำหรับอาหารว่างช่วงเช้า กลางวัน บ่าย และอาหารกลางวัน
const breakMorning = ref({
  time: "-",
  people: 0,
  budget: 0,
});

const breakLunch = ref({
  time: "-",
  people: 0,
  budget: 0,
});

const breakAfternoon = ref({
  time: "-",
  people: 0,
  budget: 0,
});

const lunch = ref({
  time: "-",
  people: 0,
  budget: 0,
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.head-more {
  font-weight: 600;
  font-size: 16px;
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
  padding-right: 78px;
  padding-left: 2px;
}

.text-field-rounded ::v-deep(.v-input__control) {
  background-color: #f5eded;
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
