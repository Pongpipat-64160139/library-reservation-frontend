<template>
  <v-row>
    <!-- Col แรกอยู่ฝั่งซ้าย -->
    <v-col cols="12" md="5" class="ms-15">
      <div>
        <v-img :src="buulib" width="400" height="100" class="mt-15"></v-img>
        <p class="font-text mt-3 ms-9">Welcome to our online</p>
        <p class="font-text ms-9">library reservation system!</p>

        <v-card-text class="mt-15 ms-6">
          <p class="font-head2">Username</p>
          <v-form @submit.prevent="submitForm" class="width-form">
            <!-- ทำกรอบและมุมมนให้กับ v-text-field โดยไม่มีเส้นใต้ -->
            <v-text-field
              class="mt-2 text-field-rounded"
              label="Username"
              type="text"
              v-model="username"
               prepend-inner-icon="mdi-account-circle-outline"

              hide-details
            ></v-text-field>

            <p class="font-head2 mt-9">Password</p>
            <v-text-field
              class="mt-2 text-field-rounded"
              hide-details
              label="Password"
              type="password"
              v-model="password"
               prepend-inner-icon="mdi-lock-outline"
            ></v-text-field>
          </v-form>
          <v-btn
            to="/home_page"
            width="500"
            height="50"
            class="mt-10 font-bold"
            color="#C2AC9E"
            size="x-large"
            >Login</v-btn
          >
        </v-card-text>
      </div>
    </v-col>

    <!-- Col ที่สองอยู่ฝั่งขวา -->
    <v-col cols="12" md="6">
      <v-img :src="lib" width="900" height="750" class="mt-2"></v-img>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import lib from "@/assets/lib.png";
import buulib from "@/assets/buulib.png";
export default defineComponent({
  data() {
    return {
      lib,
      buulib,
      username: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      if (this.username && this.password) {
        console.log("Form submitted:", {
          username: this.username,
          password: this.password,
        });
      }
    },
  },
});
</script>

<style>
/* เพิ่มการอ้างอิงฟอนต์ Kanit จาก Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

/* ใช้ฟอนต์ Kanit ทั่วทั้งโปรเจ็กต์ */
* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.font-head {
  font-weight: 400;
  font-size: 20px;
}

.font-head2 {
  font-weight: 600;
  font-size: 20px;
}

.font-text {
  font-weight: 300;
  font-size: 35px;
  font-style: italic;
}

.width-form {
  width: 500px;
}

/* ทำกรอบและมุมมนให้กับ v-text-field โดยไม่ใช้เส้นใต้ */
.text-field-rounded .v-input__control {
  border-radius: 5px;
  border: 2px solid #493628;
}

.text-field-rounded .v-input__slot {
  border-radius: 10px;
}

.v-input__control .v-input__slot {
  border-bottom: none;
  /* เอาเส้นใต้ของ v-text-field ออก */
}

.font-bold {
  font-weight: bold !important;
  font-size: 18px !important;
  
}
</style>
