<template>
  <v-app style="background-color: #f9f3ea">
    <!-- กำหนดพื้นหลังสำหรับทั้งแอป -->
    <v-app-bar
      :elevation="3"
      class="head-font"
      style="background-color: #eae2d6; height: 80px"
    >
      <div class="d-flex align-items-center ms-10">
        <v-img
          src="https://media.discordapp.net/attachments/1311938195914625025/1311973048882303056/logo-informatics.png?ex=674acd9e&is=67497c1e&hm=bf1b7252b42cdfdaec4df9bc4698c42697369e88434a07df25f9e0cf9f4e6aa6&=&format=webp&quality=lossless&width=312&height=312"
          width="60"
          height="60"
          class="mr-3 mt-2"
        ></v-img>
        <div class="mt-4">
          <div>BUU Library</div>
          <div>ระบบจองการใช้พื้นที่บริการ</div>
        </div>
      </div>

      <div class="d-flex mt-11 ms-136">
        <div>
          <v-breadcrumbs :items="items" divider="|"></v-breadcrumbs>
        </div>
      </div>

      <div class="ms-020 mt-4 text-center">
        <div>64160136</div>
        <div>ออกจากระบบ</div>
      </div>
    </v-app-bar>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface BreadcrumbItem {
  title: string;
  disabled: boolean;
  href: string;
}

export default defineComponent({
  data() {
    return {
      items: [
        {
          title: "สถานะการจอง",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          title: "คู่มือใช้งาน",
          disabled: false,
          href: "breadcrumbs_link_1",
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
</style>
