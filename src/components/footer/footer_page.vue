<template>
  <v-footer class="footer">
    <v-container>
      <div class="breadcrumbs">
        <span
          v-for="(item, index) in breadcrumbs"
          :key="index"
          class="breadcrumb-item"
        >
          <v-icon v-if="item.icon" class="breadcrumb-icon">
            {{ item.icon }}
          </v-icon>
          <a :href="item.href" class="breadcrumb-link">
            {{ item.title }}
          </a>
          <span
            v-if="index < breadcrumbs.length - 1"
            class="breadcrumb-divider"
          >
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
    icon: "mdi-calendar-today",
  },
  {
    title: "มุมมองรายเดือน",
    disabled: false,
    href: "/form_study",
    icon: "mdi-calendar-month",
  },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.footer {
  background-color: #eae2d6;
  color: #493628;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px -3px 3px rgba(0, 0, 0, 0.2);
}

.breadcrumbs {
  display: flex;
  align-items: center;
  justify-content: l;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.breadcrumb-icon {
  margin-right: 5px;
  font-size: 18px;
}

.breadcrumb-link {
  text-decoration: none;
  color: inherit;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-divider {
  margin: 0 8px;
}
</style>
