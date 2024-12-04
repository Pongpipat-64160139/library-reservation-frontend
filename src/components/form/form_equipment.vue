<template class="back-ground">
  <v-container fluid class="back-ground ms-kob">
    <!-- Sheet1 จองห้อง -->
    <v-sheet
      class="mx-auto mt-10"
      elevation="8"
      max-width="1200"
      style="background-color: #dfd3c3; border-radius: 16px"
    >
      <h1 class="pt-7 head-equipment ms-10">อุปกรณ์ที่ต้องการ</h1>
      <h1 class="head-plsselect ms-10 pb-5">กรุณาเลือกอุปกรณ์ที่ต้องการ</h1>

      <span class="d-flex">
        <v-checkbox
          class="head-selectequipment width-formcheckbox"
          v-model="selected"
          label="โปรเจคเตอร์"
          value="1"
        ></v-checkbox>
        <v-checkbox
          class="head-selectequipment width-formcheckbox"
          v-model="selected"
          label="เครื่องคอมพิวเตอร์ (วิทยากร)"
          value="2"
        ></v-checkbox>
        <v-checkbox
          class="head-selectequipment width-formcheckbox"
          v-model="selected"
          label="โต๊ะลงทะเบียน"
          value="3"
        ></v-checkbox>
        <v-checkbox
          class="head-selectequipment width-formcheckbox"
          v-model="selected"
          label="ระบบเครื่องเสียง"
          value="4"
        ></v-checkbox>
      </span>
      <span class="d-flex">
        <v-checkbox
          class="head-selectequipment width-formcheckbox"
          v-model="selected"
          label="ระบบ ZOOM Meeting"
          value="5"
        ></v-checkbox>
        <v-checkbox
          class="head-selectequipment width-formcheckbox"
          v-model="selected"
          label="ระบบถ่ายทอดการประชุม"
          value="6"
        ></v-checkbox>
        <v-checkbox
          class="head-selectequipment width-formcheckbox"
          v-model="selected"
          label="ห้องอาหาร ชั้น 3 ตึกใหม่"
          value="7"
        ></v-checkbox>
        <h1 class="head-selectequipment width-formcheckbox"></h1>
      </span>
      <span>
        <h1 class="head-another ms-10">อื่น ๆ</h1>
        <v-textarea
          label=""
          rows="3"
          outlined
          class="ms-13 text-field-rounded me-7 mt-2"
        ></v-textarea>
      </span>
      <span
        ><h1 class="head-more ms-10 mt-5">ตัวเลือกเพิ่มเติม</h1>
        <v-expansion-panels class="pd-more ms-16 me-1">
          <v-expansion-panel
            v-for="i in 1"
            class="me-7 head-inmore ps-1 mb-5"
            :key="i"
            text="halo"
            title="ต้องการอาหารว่าง/กลางวัน (กรุณาแจ้งล่วงหน้า 2 วันทำการ)"
          ></v-expansion-panel></v-expansion-panels
      ></span>
      <span class="d-flex">
        <h1 class="head-more ms-10 mt-5">เอกสารเพิ่มเติม</h1>
        <v-file-input
          class="text-field-rounded width-file"
          label=""
          variant="outlined"
        > <!-- ใส่ไอคอนและข้อความใน slot -->

          <template #label>
            <v-icon>mdi-file-plus</v-icon> <!-- เปลี่ยนเป็นไอคอนที่ต้องการ -->

            เพิ่มไฟล์
          </template></v-file-input>
      </span>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      selected: ["John"] as string[], // ใช้ `as` เพื่อกำหนดชนิดข้อมูล
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

.head-equipment {
  font-weight: 600;
  font-size: 20px;
}

.head-plsselect {
  font-weight: 100;
  font-size: 18px;
}

.head-selectequipment {
  font-size: 20px;
  color: #493628;
}

.head-selectequipment ::v-deep(.v-label) {
  font-size: 18px;
  font-weight: 500;
  color: #493628;
}

.head-another {
  font-size: 18px;
  color: #493628;
  margin-top: -15px;
}

.head-more {
  font-weight: 600;
  font-size: 20px;
  color: #493628;
  margin-top: 10px;
}

.head-inmore {
  font-weight: 500;
  font-size: 18px;
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
  width: 100px;
  margin-left: 10px;
  color: #493628;
  padding-right: 30px;
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
