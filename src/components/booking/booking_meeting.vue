<template>
  <Header_page />
  <v-container fluid class="back-ground ms-kob">
    <Form_meeting />
    <Form_equipment class="mt-1" />
    <v-btn to="/table_meeting" type="submit" class="save-btn custom-btn">
      <v-icon left>mdi-content-save</v-icon>
      จองห้อง
    </v-btn>
  </v-container>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.head-title {
  font-weight: 600;
  font-size: 16px;
}

.save-btn {
  margin-left: 100px;
  margin-top: 20px;
  font-weight: 600;
  font-size: 16px;
}

.custom-btn {
  background-color: #f5eded !important;
  color: #493628 !important;
  margin-left: 1190px;
  width: 150px;
  height: 40px;
  border: 2px solid #493628;
}

.custom-btn .v-icon {
  color: #493628 !important;
  margin-right: 10px;
}

.back-ground {
  background-color: #f9f3ea;
}

.ms-kob {
  margin-top: -300px;
}
</style>
