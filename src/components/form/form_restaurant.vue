<template>
  <h1 class="head-text">ตัวเลือกเพิ่มเติม</h1>

  <!-- ส่วนของแผงขยายข้อมูลตัวเลือกเพิ่มเติม -->
  <v-expansion-panels class="size-panel">
    <v-expansion-panel
      class="expansion-panel"
      title="ต้องการอาหารว่าง/กลางวัน (กรุณาแจ้งล่วงหน้า 2 วันทำการ)"
    >
      <template #text>
        <div>
          <!-- ส่วนของตัวเลือกอาหารว่าง -->
          <h4 class="head-text">อาหารว่าง</h4>

          <!-- Break เช้า -->
          <v-checkbox
            class="d-flex break-text"
            label="Break เช้า"
            v-model="isEnableBreakMorning"
          />
          <div class="d-flex flex-wrap">
            <v-select
              v-model="breakMorning.Serve_Time"
              label="เวลา"
              :items="times"
              class="me-4 text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              :disabled="!isEnableBreakMorning"
            />

            <v-text-field
              v-model="breakMorning.Quantity"
              label="จำนวนคน"
              type="number"
              class="text-field-rounded width-amount"
              :disabled="!isEnableBreakMorning"
            />

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
            class="d-flex break-text"
            label="Break กลางวัน"
            v-model="isEnableBreakmidday"
          />
          <div class="d-flex flex-wrap">
            <v-select
              v-model="breakLunch.Serve_Time"
              label="เวลา"
              :items="times"
              class="text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              :disabled="!isEnableBreakmidday"
            />

            <v-text-field
              v-model="breakLunch.Quantity"
              label="จำนวนคน"
              type="number"
              class="text-field-rounded width-amount"
              :disabled="!isEnableBreakmidday"
            />

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
            class="d-flex break-text"
            label="Break บ่าย"
            v-model="isEnableBreakAfternoon"
          />
          <div class="d-flex flex-wrap">
            <v-select
              v-model="breakAfternoon.Serve_Time"
              label="เวลา"
              :items="times"
              class="text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              :disabled="!isEnableBreakAfternoon"
            />

            <v-text-field
              v-model="breakAfternoon.Quantity"
              label="จำนวนคน"
              type="number"
              class="text-field-rounded width-amount"
              :disabled="!isEnableBreakAfternoon"
            />

            <v-text-field
              v-model="breakAfternoon.CostPerson"
              class="text-field-rounded width-money"
              label="งบประมาณต่อคน"
              type="number"
              :disabled="!isEnableBreakAfternoon"
            />
          </div>

          <h4 class="head-text">อาหารกลางวัน</h4>
          <v-checkbox
            class="d-flex break-text"
            label="อาหารกลางวัน"
            v-model="isEnableLunch"
          />
          <div class="d-flex">
            <v-select
              v-model="lunch!.Serve_Time"
              label="เวลา"
              :items="times"
              class="text-field-rounded width-time"
              :menu-props="{ maxHeight: 200 }"
              :disabled="!isEnableLunch"
            />

            <v-text-field
              v-model="lunch!.Quantity"
              label="จำนวนคน"
              type="number"
              class="text-field-rounded width-amount"
              :disabled="!isEnableLunch"
            />

            <v-text-field
              v-model="lunch!.CostPerson"
              class="text-field-rounded width-money"
              label="งบประมาณต่อคน"
              type="number"
              :disabled="!isEnableLunch"
            />
          </div>

          <div>
            <h1 class="head-text">รายละเอียดเพิ่มเติม</h1>
            <v-textarea
              v-model="srbStore.newSRB.order_Description"
              label=""
              rows="3"
              outlined
              class="text-field-more"
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

.head-text {
  font-size: 15px;
  font-weight: 600;
  margin-left: 24px;
  padding-bottom: 10px;
}

.break-text {
  margin-top: -10px;
  margin-left: 24px;
}

.size-panel {
  width: 1125px;
}

.expansion-panel {
  color: #493628;
  background-color: #f5eded;
  margin-left: 90px;
  border-radius: 5px;
  border: 2px solid #493628;
  margin-bottom: 20px;
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

.text-field-rounded ::v-deep(.v-input__control) {
  background-color: #f5eded;
  border-radius: 5px;
  border: 2px solid #493628;
}

.text-field-more ::v-deep(.v-input__control) {
  background-color: #f5eded;
  border-radius: 5px;
  border: 2px solid #493628;
  margin-left: 40px;
  width: 985px;
}
</style>
