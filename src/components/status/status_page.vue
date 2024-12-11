<template class="back-ground">
  <!-- เรียกใช้ HeaderStudent ข้างบน -->
  <Header_page />

  <v-container fluid class="back-ground ms-kob">
    <h1 class="pt-5 head-title text-center pb-10">สถานะการจอง</h1>

    
  </v-container>
</template>

<script lang="ts">

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
  font-weight: 600;
  font-size: 20px;
}

.back-ground {
  background-color: #f9f3ea;
}

.ms-kob {
  margin-top: -600px;
}


</style>
