<template class="back-ground">
  <v-row class="back-ground mg-toppage">
    <v-col cols="12" md="5" class="mg-leftcol">
      <div class="background-form">
        <v-img :src="buulib" class="mg-imagebuulib" />
        <p class="title-font mg-titlefont">Welcome to our online</p>
        <p class="title-font mg-titlefont">library reservation system!</p>

        <v-card-text class="mg-formfont">
          <p class="formusername-font">Username</p>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="username"
              class="form-border"
              label="Username"
              type="text"
              prepend-inner-icon="mdi-account-circle-outline"
              hide-details
            />

            <p class="formpassword-font">Password</p>
            <v-text-field
              v-model="password"
              class="form-border"
              hide-details
              label="Password"
              type="password"
              prepend-inner-icon="mdi-lock-outline"
            />
          </v-form>
          <v-btn
            class="btn-form"
            color="#C2AC9E"
            size="x-large"
            @click="submitForm"
          >
            Login
          </v-btn>
        </v-card-text>
      </div>
    </v-col>

    <v-col cols="12" md="6">
      <v-img
        v-if="isDesktop || (!isMobile && !isTablet)"
        :src="lib"
        class="mg-imagelib"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import lib from "@/assets/lib.png";
import buulib from "@/assets/buulib.png";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const isMobile = ref(false);
const isTablet = ref(false);
const isDesktop = ref(false);
const router = useRouter(); //
const checkScreenSize = () => {
  const width = window.innerWidth;

  isMobile.value = width < 768; // 📌 ซ่อนรูปถ้าหน้าจอเล็กกว่า 768px
  isTablet.value = width >= 800 && width <= 1280; // 📌 ซ่อนรูปถ้าหน้าจออยู่ระหว่าง 800px - 1280px
  isDesktop.value = width >= 1025 && width <= 1440; // ✅ แสดงรูปที่ 1025px - 1440px
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});

const username = ref<string>("");
const password = ref<string>("");

const submitForm = async () => {
  if (username.value && password.value) {
    await userStore.checkLoignAndSaveDataUser(
      username.value.toString(),
      password.value.toString()
    );
    if (userStore.isLoign) {
      userStore.getLocalStorageUser()
      router.push("/home/home_page");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.back-ground {
  background-color: #f9f3ea;
  /* พื้นหลังสีหลัก */
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.background-form {
  margin-top: 25px;
  margin-bottom: 5px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
}

.mg-imagebuulib {
  padding: 15px;
  margin-top: 20px;
  margin-left: 30px;
  width: 400px;
}

.title-font {
  font-weight: 300;
  font-size: 35px;
  font-style: italic;
}

.formusername-font {
  font-weight: 600;
  font-size: 20px;
}

.formpassword-font {
  font-weight: 600;
  font-size: 20px;
  margin-top: 20px;
}

.form-border .v-input__control {
  width: 500px;
  margin-top: 10px;
  border-radius: 5px;
  border: 2px solid #493628;
  width: 500px;
}

.form-border .v-input__slot {
  border-radius: 10px;
}

.v-input__control .v-input__slot {
  border-bottom: none;
}

.btn-form {
  margin-top: 35px;
  margin-bottom: 12px;
  font-weight: bold !important;
  font-size: 18px !important;
  width: 500px;
}

.mg-leftcol {
  margin-left: 60px;
}

.mg-titlefont {
  margin-left: 40px;
  margin-top: 15px;
}

.mg-imagelib {
  margin-top: 25px;
  margin-left: 30px;
  width: 800px;
}

.mg-formfont {
  margin-left: 30px;
  margin-top: 30px;
}

/* ipad แนวตั้ง*/
@media only screen and (min-width: 800px) and (max-width: 1280px) {
  .background-form {
    margin: auto; /* จัดตรงกลางแนวนอน */
    margin-top: 200px;
    margin-bottom: 150px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
    width: 500px;
  }

  .mg-imagebuulib {
    margin-top: 100px;
    width: 400px;
  }

  .title-font {
    font-weight: 300;
    font-size: 35px;
    font-style: italic;
  }

  .mg-titlefont {
    margin-top: 1px;
  }

  .formusername-font {
    font-weight: 600;
    font-size: 25px;
  }

  .formpassword-font {
    font-weight: 600;
    font-size: 25px;
    margin-top: 10px;
  }

  .mg-formfont {
    margin-top: 1px;
  }

  .form-border .v-input__control {
    width: 400px;
    margin-top: 10px;
    border-radius: 5px;
    border: 2px solid #493628;
  }

  .form-border .v-input__slot {
    border-radius: 10px;
  }

  .v-input__control .v-input__slot {
    border-bottom: none;
  }

  .btn-form {
    margin-top: 20px;
    font-weight: bold !important;
    font-size: 18px !important;
    width: 400px;
  }

  .mg-leftcol {
    margin-left: 1px;
  }
}

/* ipad แนวนอน*/
@media only screen and (min-width: 1025px) and (max-width: 1440px) {
  .background-form {
    margin-top: 115px;
    margin-bottom: 120px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
    width: 470px;
  }

  .mg-imagebuulib {
    margin-top: 100px;
    margin-left: 30px;
    width: 240px;
  }

  .title-font {
    font-weight: 300;
    font-size: 22px;
    font-style: italic;
  }

  .mg-titlefont {
    margin-left: 30px;
    margin-top: -5px;
  }

  .formusername-font {
    font-weight: 600;
    font-size: 18px;
  }

  .formpassword-font {
    font-weight: 600;
    font-size: 18px;
    margin-top: 10px;
  }

  .mg-formfont {
    margin-left: 20px;
    margin-top: -5px;
  }

  .form-border .v-input__control {
    width: 400px;
    margin-top: 10px;
    border-radius: 5px;
    border: 2px solid #493628;
  }

  .form-border .v-input__slot {
    border-radius: 10px;
  }

  .v-input__control .v-input__slot {
    border-bottom: none;
  }

  .btn-form {
    margin-top: 20px;
    font-weight: bold !important;
    font-size: 18px !important;
    width: 400px;
  }

  .mg-leftcol {
    margin-left: 20px;
  }

  .mg-imagelib {
    margin-top: 115px;
    margin-left: 50px;
    width: 810px;
  }
}

/* phone */
@media (max-width: 768px) {
  .background-form {
    margin: auto; /* จัดตรงกลางแนวนอน */
    margin-top: 50px;
    margin-bottom: 10px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
    width: 350px;
  }

  .mg-imagebuulib {
    margin-top: 30px;
    margin-left: 10px;
    width: 350px;
  }

  .title-font {
    font-weight: 300;
    font-size: 20px;
    font-style: italic;
  }

  .mg-titlefont {
    margin-left: 20px;
    margin-top: 15px;
  }

  .formusername-font {
    font-weight: 600;
    font-size: 12px;
  }

  .formpassword-font {
    font-weight: 600;
    font-size: 12px;
    margin-top: 30px;
  }

  .mg-formfont {
    margin-left: 5px;
    margin-top: 10px;
  }

  .form-border .v-input__control {
    width: 300px;
    margin-top: 10px;
    border-radius: 5px;
    border: 2px solid #493628;
  }

  .form-border .v-input__slot {
    border-radius: 10px;
  }

  .v-input__control .v-input__slot {
    border-bottom: none;
  }

  .btn-form {
    margin-top: 20px;
    font-weight: bold !important;
    font-size: 12px !important;
    width: 350px;
  }

  .mg-leftcol {
    margin-left: -1px;
  }

  .mg-imagelib {
    margin-top: 30px;
    margin-left: 30px;
    width: 700px;
  }
}
</style>
