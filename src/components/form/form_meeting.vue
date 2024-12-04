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
          outlined
          label=""
        />
        <h1 class="ps-15 pt-5 head1-title">เบอร์โทรติดต่อ</h1>
        <v-text-field
          class="width-formtell text-field-rounded pe-7"
          single-line
          outlined
          label=""
        />
      </span>

      <!-- span2 -->
      <span class="d-flex">
        <h1 class="ps-7 pt-5 head1-title">วันที่เริ่ม</h1>
        <v-text-field
          class="width-formname text-field-rounded"
          single-line
          outlined
          label=""
        />
        <h1 class="ps-10 pt-5 head1-title">เวลา</h1>
        <v-text-field
          class="width-formamount text-field-rounded"
          single-line
          outlined
          label=""
        />
        <h1 class="ps-15 pt-5 head1-title">วันที่จบ</h1>
        <v-text-field
          class="width-formname text-field-rounded"
          single-line
          outlined
          label=""
        />
        <h1 class="ps-10 pt-5 head1-title">เวลา</h1>
        <v-text-field
          class="width-formamount text-field-rounded pe-7"
          single-line
          outlined
          label=""
        />
      </span>

      <!-- span3 -->
      <span class="d-flex">
        <h1 class="ps-16 pt-5 head1-title">ชั้น</h1>
        <v-text-field
          class="width-formfloor text-field-rounded"
          single-line
          outlined
          label=""
        />
        <h1 class="ps-15 pt-5 head1-title">ห้อง</h1>
        <v-text-field
          class="width-formroom text-field-rounded"
          single-line
          outlined
          label=""
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
        <v-text-field
          class="width-formfloor text-field-rounded"
          single-line
          outlined
          label=""
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

<script lang="ts"></script>

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
  width: 250px;
  height: 1px;
  font-weight: 500;
  margin-left: 20px;
  color: #493628;
}

.width-formamount {
  font-size: 50px;
  margin-left: 20px;
  color: #493628;
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
