<template>
  <v-row>
    <!-- Col ซ้าย -->
    <v-col cols="12" md="5" class="ms-15">
      <div>
        <v-img :src="buulib" width="350" height="100" class="mt-10" />
        <p class="font-text mt-3 ms-9">Welcome to our online</p>
        <p class="font-text ms-9">library reservation system!</p>

        <v-card-text class="mt-15 ms-6">
          <p class="font-head2">Username</p>
          <v-form class="width-form" @submit.prevent="submitForm">
            <v-text-field
              v-model="username"
              class="mt-2 text-field-rounded"
              label="Username"
              type="text"
              prepend-inner-icon="mdi-account-circle-outline"
              hide-details
            />

            <p class="font-head2 mt-9">Password</p>
            <v-text-field
              v-model="password"
              class="mt-2 text-field-rounded"
              hide-details
              label="Password"
              type="password"
              prepend-inner-icon="mdi-lock-outline"
            />
          </v-form>
          <v-btn
            to="/home_page"
            width="500"
            height="50"
            class="mt-10 font-bold"
            color="#C2AC9E"
            size="x-large"
          >
            Login
          </v-btn>
        </v-card-text>
      </div>
    </v-col>

    <!-- Col ขวา -->
    <v-col cols="12" md="6">
      <v-img :src="lib" width="700" height="700" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import lib from "@/assets/lib.png";
import buulib from "@/assets/buulib.png";

const data = {
  lib,
  buulib,
  username: "",
  password: "",
};

const methods = {
  submitForm() {
    if (data.username && data.password) {
      console.log("Form submitted:", {
        username: data.username,
        password: data.password,
      });
    }
  },
};

export default {
  data() {
    return data;
  },
  methods,
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

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

.text-field-rounded .v-input__control {
  border-radius: 5px;
  border: 2px solid #493628;
}

.text-field-rounded .v-input__slot {
  border-radius: 10px;
}

.v-input__control .v-input__slot {
  border-bottom: none;
}

.font-bold {
  font-weight: bold !important;
  font-size: 18px !important;
}
</style>
