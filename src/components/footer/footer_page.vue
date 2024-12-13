<template>
    <v-footer class="footer">
      <v-container>
        <div class="breadcrumbs">
          <span
            v-for="(item, index) in breadcrumbs"
            :key="index"
            class="breadcrumb-item"
          >
            <v-icon
              v-if="item.icon"
              class="breadcrumb-icon"
            >
              {{ item.icon }}
            </v-icon>
            <a :href="item.href" class="breadcrumb-link">
              {{ item.title }}
            </a>
            <!-- แสดง Divider ยกเว้นตัวสุดท้าย -->
            <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-divider">
              |
            </span>
          </span>
        </div>
      </v-container>
    </v-footer>
  </template>
  
  <script lang="ts" setup>
  const breadcrumbs = [
    {
      title: "มุมมองรายวัน",
      disabled: false,
      href: "/status_page",
      icon: "mdi-calendar-today", // ใช้ไอคอน Today
    },
    {
      title: "มุมมองรายเดือน",
      disabled: false,
      href: "/form_study",
      icon: "mdi-calendar-month", // ใช้ไอคอน Calendar Month
    },
  ];
  </script>
  
  <style scoped>
  /* เพิ่มการอ้างอิงฟอนต์ Kanit จาก Google Fonts */
  @import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");
  
  /* ใช้ฟอนต์ Kanit ทั่วทั้งโปรเจ็กต์ */
  * {
    font-family: "Kanit", sans-serif;
    color: #493628;
  }
  
  /* ปรับลดความสูงของ Footer */
  .footer {
    background-color: #eae2d6;
    color: #493628; /* สีข้อความ */
    height: 30px; /* ลดความสูง */
    padding: 0; /* ลด Padding */
    display: flex; /* ใช้ flex เพื่อจัดตำแหน่ง */
    align-items: center; /* จัดเนื้อหาให้อยู่ตรงกลางแนวตั้ง */
    justify-content: center; /* จัดเนื้อหาให้อยู่ตรงกลางแนวนอน */
    box-shadow: 0px -3px 3px rgba(0, 0, 0, 0.2); /* เพิ่มเงา */
  }
  
  /* ทำให้ Breadcrumbs อยู่ในบรรทัดเดียวกัน */
  .breadcrumbs {
    display: flex;
    align-items: center;
    justify-content: l;
  }
  
  /* ไอคอนและข้อความใน Breadcrumb */
  .breadcrumb-item {
    display: flex;
    align-items: center;
    margin-right: 5px; /* ระยะห่างระหว่าง Item */
  }
  
  .breadcrumb-icon {
    margin-right: 5px; /* ระยะห่างระหว่างไอคอนกับข้อความ */
    font-size: 18px; /* ขนาดของไอคอน */
  }
  
  /* สไตล์สำหรับลิงก์ Breadcrumb */
  .breadcrumb-link {
    text-decoration: none;
    color: inherit;
  }
  
  .breadcrumb-link:hover {
    text-decoration: underline; /* เส้นใต้เมื่อ Hover */
  }
  
  /* Divider */
  .breadcrumb-divider {
    margin: 0 8px; /* ระยะห่างระหว่าง Divider */
  }
  </style>
  