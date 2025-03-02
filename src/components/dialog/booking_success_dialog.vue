<template>
  <v-dialog v-model="localShowDialog" persistent class="dialog-size">
    <v-card>
      <p class="topic-text">จองห้องสำเร็จ</p>

      <v-card-actions class="justify-center">
        <v-btn class="btn-closedailog" @click="closeDialog">ปิด</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  showDialog: Boolean,
});

const emit = defineEmits(["update:showDialog"]);

const localShowDialog = ref(props.showDialog);

watch(
  () => props.showDialog,
  (newVal) => {
    localShowDialog.value = newVal;
  }
);

const closeDialog = () => {
  localShowDialog.value = false;
  emit("update:showDialog", false);
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.dialog-size {
  width: 500px;
}

.topic-text {
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
}

.dialog-text {
  font-weight: 400;
  font-size: 18px;
  text-align: center;
}

.v-card-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* ทำให้ขยายให้เต็ม */
  padding: 0;
}

.btn-closedailog {
  font-weight: 400;
  font-size: 17px;
  text-align: center;
  background-color: #b5cfb7;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  margin-top: 25px;
  margin-bottom: 20px;
}
</style>
