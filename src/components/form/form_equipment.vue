<template>
  <v-container fluid>
    <v-sheet class="mx-auto size-sheet" elevation="8">
      <h1 class="equipment-text">อุปกรณ์ที่ต้องการ</h1>

      <!-- ส่วน checkbox สำหรับเลือกอุปกรณ์แบบวนลูป -->
      <v-container>
        <v-row cols="12">
          <v-col
            v-for="(item, index) in equipmentList"
            :key="item.eq_Id"
            cols="4"
          >
            <v-checkbox
              class="select-box width-formcheckbox"
              :label="item.equip_Name"
              :value="item.eq_Id"
              @click="selectedEquipment(index)"
            />
          </v-col>
        </v-row>
      </v-container>

      <!-- ส่วนฟอร์มสำหรับอุปกรณ์เพิ่มเติม -->
      <span>
        <h1 class="head-text">อื่น ๆ</h1>
        <v-textarea
          v-model="eqother"
          label=""
          rows="3"
          outlined
          class="text-field-rounded"
        />
      </span>

      <!-- คอมโพเนนต์สำหรับเลือกร้านอาหาร -->
      <span>
        <Form_restaurant />
      </span>

      <!-- ส่วนการแนบไฟล์เพิ่มเติม -->
      <span>
        <h1 class="head-text">ไฟล์เอกสารเพิ่มเติม*</h1>
        <v-file-input
          v-model="selectedFile"
          class="text-field-rounded-file width-file"
          label="เพิ่มไฟล์"
          single-line
          outlined
        />
      </span>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { useDocumentStore } from "@/stores/documentStore";
import { useEquipmentStore } from "@/stores/equipmentStore";
import type { Equipment } from "@/types/equipment";
import { ref, onMounted, watch } from "vue";

const equipmentStore = useEquipmentStore();
// อาร์เรย์ของรายการอุปกรณ์
const equipmentList = ref<Equipment[]>([]);
const eqother = ref<string>();
const selectedFile = ref<File | null>(null);
const documentFileStore = useDocumentStore();
watch(selectedFile, (newFile) => {
  documentFileStore.currentDocument = newFile;
  console.log("File :", documentFileStore.currentDocument);
});
watch(eqother, (newEq) => {
  console.log("Selected equipment : ", newEq);
});
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

.size-sheet {
  width: 1190px;
  height: auto;
  background-color: #dfd3c3;
  border-radius: 8px;
  margin-top: 20px;
}

.equipment-text {
  font-size: 15px;
  font-weight: 600;
  margin-left: 24px;
  padding-top: 20px;
  padding-bottom: 30px;
}

.select-box {
  font-size: 18px;
  color: #493628;
}

.select-box ::v-deep(.v-label) {
  font-size: 15px;
  font-weight: 400;
  color: #493628;
}

.width-formcheckbox {
  width: 300px;
  margin-left: 25px;
  color: #493628;
  margin-top: -40px;
}

.head-text {
  font-size: 15px;
  font-weight: 600;
  margin-left: 24px;
  padding-bottom: 10px;
}

.text-field-rounded ::v-deep(.v-input__control) {
  background-color: #f5eded;
  border-radius: 5px;
  border: 2px solid #493628;
  margin-left: 45px;
  margin-right: 20px;
}

.width-file {
  margin-left: 5px;
  color: #493628;
}

.text-field-rounded-file ::v-deep(.v-input__control) {
  background-color: #f5eded;
  border-radius: 5px;
  border: 2px solid #493628;
  margin-right: 20px;
}
</style>
