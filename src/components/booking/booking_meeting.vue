<template>
  <Header_page />
  <v-container fluid class="back-ground ms-kob">
    <Form_meeting />
    <Form_equipment class="mt-1" />
    <!-- to="/table_meeting" -->
    <v-btn type="submit" class="save-btn custom-btn" @click="saveReserved()">
      <v-icon left> mdi-content-save </v-icon>
      จองห้อง
    </v-btn>
  </v-container>
</template>
<script setup lang="ts">
import { useDocumentStore } from "@/stores/documentStore";
import { useEquipmentStore } from "@/stores/equipmentStore";
import { useOrderDetialStore } from "@/stores/orderStore";
import { onMounted } from "vue";

const eqStore = useEquipmentStore();
const orderStore = useOrderDetialStore();
const documentFileStore = useDocumentStore();
onMounted(() => {
  try {
  } catch (error) {
    console.error("error load data ", error);
  }
});
async function saveReserved() {
  const eq = await eqStore.selectedEQForm;
  const orders = await orderStore.orders;
  const file = await documentFileStore.currentDocument;
  const res = await documentFileStore.newDocumentFile(file!);
  await console.log("DocumentStore :", res);
}
</script>
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
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.ms-kob {
  margin-top: -300px;
}
</style>
