<template>
    <v-container>
      <!-- ใช้ v-menu เพื่อให้ date picker เปิดในรูปแบบ dropdown -->
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
      >
        <template #activator="{ props }">
          <!-- ปุ่มหรือฟิลด์ที่ใช้เปิด dropdown -->
          <v-text-field
            v-bind="props"
            v-model="date"
            label="เลือกวันที่"
            readonly
            append-icon="mdi-calendar"
          />
        </template>
        <v-date-picker v-model="date" @input="menu = false" />
      </v-menu>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menu: false, // สำหรับควบคุมการเปิดปิดของ dropdown
        date: null, // เก็บวันที่ที่เลือก
      };
    },
  };
  </script>
  