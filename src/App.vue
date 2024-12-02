<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomePage from "./components/home/home_page.vue";

export default defineComponent({
  name: "App",
  components: {
    HomePage,
  },
});
</script>

<style></style>
