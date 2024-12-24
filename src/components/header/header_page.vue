<template>
  <v-app class="back-ground">
    <v-app-bar
      :elevation="3"
      class="head-font"
      style="background-color: #eae2d6; height: 80px"
    >
      <router-link
        to="/home_page"
        class="d-flex align-items-center ms-10 custom-router-link"
      >
        <v-img :src="logobuu" width="54" height="54" class="mr-3 mt-3"></v-img>
        <div class="mt-5">
          <div class="buu-font">BUU Library</div>
          <div class="buu-font">ระบบจองห้องสมุด</div>
        </div>
      </router-link>

      <div class="d-flex mt-11 ms-136 buu-font">
        <div>
          <v-breadcrumbs :items="items" divider="|"></v-breadcrumbs>
        </div>
      </div>

      <div class="ms-020 mt-4 text-center">
        <div>64160136</div>
        <router-link to="/login_page" class="custom-router-link buu-font"
          >ออกจากระบบ</router-link
        >
      </div>
    </v-app-bar>
  </v-app>
</template>

<script lang="ts">
import logobuu from "@/assets/logobuu.png";

interface BreadcrumbItem {
  title: string;
  disabled: boolean;
  href: string;
}

const items: BreadcrumbItem[] = [
  {
    title: "สถานะการจอง",
    disabled: false,
    href: "/status_page",
  },
  {
    title: "คู่มือใช้งาน",
    disabled: false,
    href: "/manage_status",
  },
  {
    title: "รายละเอียดห้อง",
    disabled: false,
    href: "/testAPIVue",
  },
];

export default {
  data() {
    return {
      logobuu,
    };
  },
  computed: {
    items() {
      return items;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.back-ground {
  background-color: #f9f3ea;
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.head-font {
  font-weight: 400;
  font-size: 16px;
}

.buu-font {
  font-weight: 400;
  font-size: 14px;
}

.left-al {
  text-align: left;
}

.ms-136 {
  margin-left: 800px;
}

.ms-020 {
  margin-left: 70px;
}

.text-center {
  text-align: center;
}

.custom-router-link {
  text-decoration: none;
  color: inherit;
}

.custom-router-link:hover {
  text-decoration: none;
}
</style>
