<template>
  <router-view />
  <div id="app">
    <LoginPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginPage from "../components/home/login_page.vue";
export default defineComponent({
  name: "App",
  components: {
    LoginPage,
  },
});
</script>

<style></style>
