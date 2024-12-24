<script lang="ts" setup>
import { useRoleRoomStore } from "@/stores/roleRoomStore";
import { useRoomStore } from "@/stores/roomStore";
import { ref } from "vue";

// เรียกใช้งาน store
const roomStore = useRoomStore();

// กำหนดค่าเริ่มต้น
const data = ref("Entertain");

// ฟังก์ชันดึงข้อมูล
async function getData(name: string) {
  console.log("Type received in Store:", name);
  try {
    const room = await roomStore.selectRoomByType(name);
    console.log("Response from Service:", room); // ตรวจสอบ Response
    return room.data; // คืนค่าข้อมูล
  } catch (error) {
    console.error("Error in selectRoomByType:", error); // แสดง Error ถ้าเกิดปัญหา
    throw error;
  }
}
</script>

<template>
  <div>
    <!-- ปุ่มที่ส่งค่าผ่าน data.value -->
    <v-btn @click="getData(data)">Test</v-btn>
  </div>
</template>
