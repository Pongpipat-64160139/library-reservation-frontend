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
              v-model="breakMorning.Serve_Time"
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              :disabled="!isEnableBreakMorning"
            />
            <!-- กรอกจำนวนคนสำหรับอาหารว่างช่วงเช้า -->
            <v-text-field
              v-model="breakMorning.Quantity"
              label="จำนวนคน"
              type="number"
              class="me-4 text-field-rounded width-amount"
              :disabled="!isEnableBreakMorning"
            />
            <!-- กรอกงบประมาณต่อคนสำหรับอาหารว่างช่วงเช้า -->
            <v-text-field
              v-model="breakMorning.CostPerson"
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
              v-model="breakLunch.Serve_Time"
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              :disabled="!isEnableBreakmidday"
            />
            <!-- กรอกจำนวนคนสำหรับอาหารว่างช่วงกลางวัน -->
            <v-text-field
              v-model="breakLunch.Quantity"
              label="จำนวนคน"
              type="number"
              class="me-4 text-field-rounded width-amount"
              :disabled="!isEnableBreakmidday"
            />
            <!-- กรอกงบประมาณต่อคนสำหรับอาหารว่างช่วงกลางวัน -->
            <v-text-field
              v-model="breakLunch.CostPerson"
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
              v-model="breakAfternoon.Serve_Time"
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              :disabled="!isEnableBreakAfternoon"
            />
            <!-- กรอกจำนวนคนสำหรับอาหารว่างช่วงบ่าย -->
            <v-text-field
              v-model="breakAfternoon.Quantity"
              label="จำนวนคน"
              type="number"
              class="me-4 text-field-rounded width-amount"
              :disabled="!isEnableBreakAfternoon"
            />
            <!-- กรอกงบประมาณต่อคนสำหรับอาหารว่างช่วงบ่าย -->
            <v-text-field
              v-model="breakAfternoon.CostPerson"
              class="text-field-rounded width-money"
              label="งบประมาณต่อคน"
              type="number"
              :disabled="!isEnableBreakAfternoon"
            />
          </div>

          <!-- ส่วนของตัวเลือกอาหารกลางวัน -->
          <h4 class="ms-10 head-more">อาหารเที่ยง</h4>
          <v-checkbox
            class="d-flex flex-wrap ms-8 mg-break"
            label="อาหารกลางวัน"
            v-model="isEnableLunch"
          />
          <div class="d-flex flex-wrap">
            <!-- เลือกเวลาอาหารกลางวัน -->
            <v-select
              v-model="lunch!.Serve_Time"
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time mt-2"
              :menu-props="{ maxHeight: 200 }"
              :disabled="!isEnableLunch"
            />
            <!-- กรอกจำนวนคนสำหรับอาหารกลางวัน -->
            <v-text-field
              v-model="lunch!.Quantity"
              label="จำนวนคน"
              type="number"
              class="me-4 text-field-rounded width-amount mt-2"
              :disabled="!isEnableLunch"
            />
            <!-- กรอกงบประมาณต่อคนสำหรับอาหารกลางวัน -->
            <v-text-field
              v-model="lunch!.CostPerson"
              class="text-field-rounded width-money mt-2"
              label="งบประมาณต่อคน"
              type="number"
              :disabled="!isEnableLunch"
            />
          </div>
          <!-- ส่วนรายละเอียดเพิ่มเติม -->
          <div>
            <h1 class="head-more ms-10">รายละเอียดเพิ่มเติม</h1>
            <v-textarea
              v-model="srbStore.newSRB.order_Description"
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
// -----------------------------
// Import Modules and Types
// -----------------------------
import { useOrderDetialStore } from "@/stores/orderStore"; // ใช้งาน store สำหรับจัดการ OrderDetail
import { useSpecialRoomStore } from "@/stores/srbStore";
import type { OrderDetail } from "@/types/orderDetail"; // ประเภทข้อมูลสำหรับ OrderDetail
import { ref, watch } from "vue"; // เครื่องมือของ Vue สำหรับ reactive และการติดตามค่า

// -----------------------------
// Store Initialization
// -----------------------------
const orderStore = useOrderDetialStore(); // สร้าง store สำหรับจัดการคำสั่งซื้อ
const srbStore = useSpecialRoomStore();
// -----------------------------
// Reactive Variables
// -----------------------------
// ตัวแปร boolean สำหรับเปิด-ปิดฟอร์มแต่ละส่วน
const isEnableBreakMorning = ref(false); // สถานะเปิด/ปิดของอาหารว่างช่วงเช้า
const isEnableBreakmidday = ref(false); // สถานะเปิด/ปิดของอาหารว่างช่วงกลางวัน
const isEnableBreakAfternoon = ref(false); // สถานะเปิด/ปิดของอาหารว่างช่วงบ่าย
const isEnableLunch = ref(false); // สถานะเปิด/ปิดของอาหารกลางวัน

// ตัวเลือกเวลาที่สามารถเลือกได้
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

// ตัวแปร reactive สำหรับเก็บข้อมูลของอาหารแต่ละช่วงเวลา
const breakMorning = ref<OrderDetail>({
  Serve_Time: "-",
  Serve_Name: "พักเบรคเช้า",
  Serve_Categories: "อาหารว่าง",
});

const breakLunch = ref<OrderDetail>({
  Serve_Time: "-",
  Serve_Name: "พักเบรคเที่ยง",
  Serve_Categories: "อาหารว่าง",
});

const breakAfternoon = ref<OrderDetail>({
  Serve_Time: "-",
  Serve_Name: "พักเบรคบ่าย",
  Serve_Categories: "อาหารว่าง",
});

const lunch = ref<OrderDetail>({
  Serve_Time: "-",
  Serve_Name: "อาหารเที่ยง",
  Serve_Categories: "อาหารเที่ยง",
});

// -----------------------------
// Watchers
// -----------------------------
// Watch สำหรับตรวจสอบการเปลี่ยนแปลงของตัวแปรเปิด/ปิดในแต่ละส่วน

// ตรวจสอบสถานะอาหารว่างช่วงเช้า
watch(isEnableBreakMorning, async (newValue, oldValue) => {
  console.log(`เช็คเช้า: จาก ${oldValue} เป็น ${newValue}`);
  if (newValue === true) {
    console.log(typeof breakMorning.value.Quantity); // ตรวจสอบประเภทข้อมูล
    await orderStore.orders.push(breakMorning.value); // เพิ่มข้อมูลเข้า orders
  } else {
    // ลบข้อมูลออกจาก orders
    orderStore.orders = orderStore.orders.filter(
      (order) => order.Serve_Name !== breakMorning.value.Serve_Name
    );
  }
});

// ตรวจสอบสถานะอาหารว่างช่วงกลางวัน
watch(isEnableBreakmidday, async (newValue, oldValue) => {
  console.log(`เช็คกลางวัน: จาก ${oldValue} เป็น ${newValue}`);
  if (newValue === true) {
    await orderStore.orders.push(breakLunch.value); // เพิ่มข้อมูลเข้า orders
  } else {
    // ลบข้อมูลออกจาก orders
    orderStore.orders = orderStore.orders.filter(
      (order) => order.Serve_Name !== breakLunch.value.Serve_Name
    );
  }
});

// ตรวจสอบสถานะอาหารว่างช่วงบ่าย
watch(isEnableBreakAfternoon, async (newValue, oldValue) => {
  console.log(`เช็คบ่าย: จาก ${oldValue} เป็น ${newValue}`);
  if (newValue === true) {
    await orderStore.orders.push(breakAfternoon.value); // เพิ่มข้อมูลเข้า orders
  } else {
    // ลบข้อมูลออกจาก orders
    orderStore.orders = orderStore.orders.filter(
      (order) => order.Serve_Name !== breakAfternoon.value.Serve_Name
    );
  }
});

// ตรวจสอบสถานะอาหารกลางวัน
watch(isEnableLunch, async (newValue, oldValue) => {
  console.log(`อาหารกลางวัน: จาก ${oldValue} เป็น ${newValue}`);
  if (newValue === true) {
    await orderStore.orders.push(lunch.value); // เพิ่มข้อมูลเข้า orders
  } else {
    // ลบข้อมูลออกจาก orders
    orderStore.orders = orderStore.orders.filter(
      (order) => order.Serve_Name !== lunch.value.Serve_Name
    );
  }
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
