<template class="back-ground">
  <!-- ส่วน container หลักที่ครอบทุกองค์ประกอบ -->
  <v-container fluid class="back-ground ms-kob">
    <!-- Sheet1: ส่วนของฟอร์มการจองห้อง -->
    <v-sheet
      class="mx-auto mt-10"
      elevation="8"
      max-width="1200"
      style="background-color: #dfd3c3; border-radius: 16px"
    >
      <!-- หัวข้อหลัก -->
      <h1 class="pt-7 head-equipment ms-10">อุปกรณ์ที่ต้องการ</h1>
      <h1 class="head-plsselect ms-10 pb-5">กรุณาเลือกอุปกรณ์ที่ต้องการ</h1>

      <!-- ส่วน checkbox สำหรับเลือกอุปกรณ์แบบวนลูป -->
      <v-container>
        <v-row cols="12">
          <v-col
            v-for="(item, index) in equipmentList"
            :key="item.eq_Id"
            cols="4"
          >
            <v-checkbox
              class="head-selectequipment width-formcheckbox"
              :label="item.equip_Name"
              :value="item.eq_Id"
              @click="selectedEquipment(index)"
            />
          </v-col>
        </v-row>
      </v-container>

      <!-- ส่วนฟอร์มสำหรับอุปกรณ์เพิ่มเติม -->
      <span>
        <h1 class="head-another ms-10">อื่น ๆ</h1>
        <v-textarea
          v-model="eqother"
          label=""
          rows="3"
          outlined
          class="ms-13 text-field-rounded me-7 mt-2"
        />
      </span>

      <!-- คอมโพเนนต์สำหรับเลือกร้านอาหาร -->
      <span>
        <Form_restaurant />
      </span>

      <!-- ส่วนการแนบไฟล์เพิ่มเติม -->
      <span>
        <h1 class="head-more ms-10 mt-5">ไฟล์เอกสารเพิ่มเติม</h1>
        <v-file-input
          class="text-field-rounded width-file mt-2"
          label="เพิ่มไฟล์"
          single-line
          outlined
        />
      </span>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { useEquipmentStore } from "@/stores/equipmentStore";
import type { Equipment } from "@/types/equipment";
import { ref, computed, onMounted } from "vue";

const equipmentStore = useEquipmentStore();
// อาร์เรย์ของรายการอุปกรณ์
const equipmentList = ref<Equipment[]>([]);
const eqother = ref<string>();
async function selectedEquipment(itemIndex: number) {
  const findEQ = equipmentList.value.find((eq) => eq.eq_Id === itemIndex + 1);
  let selected = equipmentStore.selectedEQForm;
  const checkDuplicate = selected.some((eq) => eq.eq_Id === findEQ?.eq_Id);
  if (!checkDuplicate) {
    selected.push(equipmentList.value[itemIndex]);
    equipmentStore.selectedEQForm = selected;
    console.log("Selected equipment : ", equipmentStore.selectedEQForm);
  } else {
    selected = selected.filter((eq) => eq.equip_Name !== findEQ?.equip_Name);
    equipmentStore.selectedEQForm = selected;
    console.log("Selected equipment : ", equipmentStore.selectedEQForm);
  }
}
async function loadDataEquipment() {
  const loadData = await equipmentStore.getAllEquipment();
  equipmentList.value = equipmentStore.allEquipment;
}

onMounted(async () => {
  try {
    await loadDataEquipment();
    await equipmentStore.resetSelcetedEquipment();
  } catch (error) {
    console.error("Error loading data:", error);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.head-equipment {
  font-weight: 600;
  font-size: 16px;
}

.head-plsselect {
  font-weight: 100;
  font-size: 15px;
}

.head-selectequipment {
  font-size: 18px;
  color: #493628;
}

.head-selectequipment ::v-deep(.v-label) {
  font-size: 15px;
  font-weight: 500;
  color: #493628;
}

.head-another {
  font-size: 16px;
  color: #493628;
  margin-top: -15px;
}

.head-more {
  font-weight: 600;
  font-size: 16px;
  color: #493628;
  margin-top: 10px;
}

.pd-more {
  padding-right: 80px;
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

.width-formcheckbox {
  width: 300px;
  margin-left: 40px;
  color: #493628;
  margin-top: -25px;
}

.width-file {
  margin-left: 12px;
  color: #493628;
  padding-right: 28px;
}

.width-formblank1 {
  width: 465px;
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
