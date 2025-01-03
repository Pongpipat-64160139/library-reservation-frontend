<script setup lang="ts">
import Form_study from "../form/form_study.vue";
</script>

<template>
  <Header_page />
  <v-container
    fluid
    class="back-ground ms-kob"
  >
    <Form_study />
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
  font-size: 20px;
}
.back-ground {
  background-color: #f9f3ea;
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}
.ms-kob {
  margin-top: -300px;
}
</style>
