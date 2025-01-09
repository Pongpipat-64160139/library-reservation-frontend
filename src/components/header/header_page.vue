<template>
  <v-app class="back-ground">
    <v-app-bar
      :elevation="3"
      class="head-font"
      style="background-color: #eae2d6; height: 80px"
    >
      <router-link
        to="/home_page"
        class="d-flex align-items-center custom-router-link mg-leftimage"
      >
        <v-img :src="logobuu" class="mg-leftbuu mg-tophead image-size" />
        <div class="mt-5">
          <div class="buu-font">BUU Library</div>
          <div class="buu-font">ระบบจองห้องสมุด</div>
        </div>
      </router-link>

      <div class="d-flex mt-11 ms-136 breadcrumbs-font">
        <div>
          <v-breadcrumbs :items="items" divider="|" />
        </div>
      </div>

      <div class="ms-020 mt-4 text-center">
        <div class="user-font">64160136</div>
        <router-link to="/login_page" class="custom-router-link user-font">
          ออกจากระบบ
        </router-link>
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
.image-size {
  width: 55px;
  height: 55px;
}

.mg-leftimage {
  margin-left: 60px;
}
.mg-leftbuu {
  margin-right: 30px;
}
.head-font {
  font-weight: 400;
  font-size: 16px;
}

.buu-font {
  font-weight: 400;
  font-size: 14px;
}
.breadcrumbs-font {
  font-weight: 400;
  font-size: 14px;
}
.user-font {
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

.mg-tophead {
  margin-top: 11px;
}
/* ipad */

@media (max-width: 1024px) {
  .buu-font {
    font-weight: 400;
    font-size: 12px;
    margin-left: -10px;

  }
  .breadcrumbs-font {
    font-weight: 400;
    font-size: 12px;
    margin-left: 250px;
  }
  .user-font {
    font-weight: 400;
    font-size: 12px;
    margin-left: -30px;
    margin-top: 9px;
  }

  .image-size {
    width: 55px;
    height: 55px;
  }

  .mg-tophead {
    margin-top: 10px;
  }
}

@media (max-width: 768px) {
  .buu-font {
    font-weight: 400;
    font-size: 10px;
  }
  .breadcrumbs-font {
    font-weight: 400;
    font-size: 10px;
    margin: 20px 0;
    padding-top: 12px;
    margin-left: 15px;

  }
  .user-font {
    font-weight: 400;
    font-size: 10px;
    margin-left: -80px;
    margin-top: 1px;
  }

  .image-size {
    width: 35px;
    height: 35px;
  }

  .mg-tophead {
    margin-top: 15px;
  }

  .mg-leftimage {
    margin-left: 10px;
  }
  .mg-leftbuu {
    margin-right: 10px;
  }
}
</style>
