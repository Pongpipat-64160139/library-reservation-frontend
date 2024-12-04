<template>
  <v-app style="background-color: #f9f3ea">
    <!-- กำหนดพื้นหลังสำหรับทั้งแอป -->
    <v-app-bar
      :elevation="3"
      class="head-font"
      style="background-color: #eae2d6; height: 80px"
    >
      <router-link
        to="/home_page"
        class="d-flex align-items-center ms-10 custom-router-link"
      >
        <v-img :src="logobuu" width="57" height="57" class="mr-3 mt-2"></v-img>
        <div class="mt-3">
          <div>BUU Library</div>
          <div>ระบบจองการใช้พื้นที่บริการ</div>
        </div>
      </router-link>

      <div class="d-flex mt-11 ms-136">
        <div>
          <v-breadcrumbs :items="items" divider="|"></v-breadcrumbs>
        </div>
      </div>

      <div class="ms-020 mt-4 text-center">
        <div>64160136</div>
        <router-link to="/login_page" class="custom-router-link"
          >ออกจากระบบ</router-link
        >
      </div>
    </v-app-bar>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import logobuu from "@/assets/logobuu.png";
import router from "@/router";

interface BreadcrumbItem {
  title: string;
  disabled: boolean;
  href: string;
}

export default defineComponent({
  data() {
    return {
      logobuu,
      items: [
        {
          title: "สถานะการจอง",
          disabled: false,
          href: "/status_page",
        },
        {
          title: "คู่มือใช้งาน",
          disabled: false,
          href: "/form_study",
        },
        {
          title: "Floor-Room",
          disabled: false,
          href: "breadcrumbs_link_2",
        },
        {
          title: "ข้อร้องเรียน/ เสนอแนะ",
          disabled: false,
          href: "breadcrumbs_link_2",
        },
      ] as BreadcrumbItem[],
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

.head-font {
  font-weight: 400;
  font-size: 16px;
}

.left-al {
  text-align: left;
}

.ms-136 {
  margin-left: 700px;
}

.ms-020 {
  margin-left: 70px;
}

.text-center {
  text-align: center;
}

.custom-router-link {
  text-decoration: none; /* เอาเส้นใต้ออก */
  color: inherit;
}

.custom-router-link:hover {
  text-decoration: none; /* ไม่มีเส้นใต้ตอนโฮเวอร์ */
}
</style>
