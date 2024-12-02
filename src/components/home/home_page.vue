<template class="back-ground">
  <v-container fluid class="back-ground">
    <!-- เรียกใช้ HeaderStudent ข้างบน -->
    <Header_page />
  </v-container>

  <v-container fluid class="back-ground ms-kob">
    <h1 class="pt-5 head-title text-center pb-10">ประเภทห้อง</h1>

    <!-- Sheet1 Group Study Room -->
    <v-sheet
      class="mx-auto"
      elevation="8"
      max-width="800"
      style="background-color: #ead8c0; border-radius: 16px"
    >
      <span class="d-flex">
        <h1 class="ps-16 pt-5 head1-title">Group Study Room</h1>
          <h1 class="ps-16 pt-4 regularstu-title">
            จองห้อง <v-icon right>mdi-arrow-right</v-icon>
          </h1>
      </span>

      <v-slide-group show-arrows class="ps-13">
        <v-slide-group-item v-for="(image, index) in studys" :key="index">
          <div class="ma-4 d-flex flex-column align-center">
            <!-- รูปภาพ -->
            <img :src="image.src" :alt="image.alt" class="slide-image" />
            <!-- ข้อความใต้รูป -->
            <span class="mt-2 text-center room-caption">
              {{ image.caption }}
            </span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <!-- Sheet2 Entertainment Room -->
    <v-sheet
      class="mx-auto mt-10"
      elevation="8"
      max-width="800"
      style="background-color: #ead8c0; border-radius: 16px"
    >
      <span class="d-flex">
        <h1 class="ps-16 pt-5 head1-title">Group Study Room</h1>
        <h1 class="ps-16 pt-4 regularstu-title">
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </h1>
      </span>

      <v-slide-group show-arrows class="ps-13">
        <v-slide-group-item
          v-for="(image, index) in entertainment"
          :key="index"
        >
          <div class="ma-4 d-flex flex-column align-center">
            <!-- รูปภาพ -->
            <img :src="image.src" :alt="image.alt" class="slide-image" />
            <!-- ข้อความใต้รูป -->
            <span class="mt-2 text-center room-caption">
              {{ image.caption }}
            </span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <!-- Sheet3 Entertainment Room -->
    <v-sheet
      class="mx-auto mt-10 mb-10"
      elevation="8"
      max-width="800"
      style="background-color: #ead8c0; border-radius: 16px"
    >
      <span class="d-flex">
        <h1 class="ps-16 pt-5 head1-title">Meeting Room</h1>
        <h1 class="ps-16 pt-4 regularmeet-title">
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </h1>
      </span>

      <v-slide-group show-arrows class="">
        <v-slide-group-item v-for="(image, index) in meeting" :key="index">
          <div class="ma-4 d-flex flex-column align-center">
            <!-- รูปภาพ -->
            <img :src="image.src" :alt="image.alt" class="slide-image" />
            <!-- ข้อความใต้รูป -->
            <span class="mt-2 text-center room-caption">
              {{ image.caption }}
            </span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import room201 from "@/assets/201.png";
import cyber1 from "@/assets/cyber1.png";
import cyber2 from "@/assets/cyber2.png";
import karake from "@/assets/karake.png";
import lectureroom from "@/assets/lectureroom.png";
import lfl from "@/assets/lfl.png";
import ministudio from "@/assets/ministudio.png";
import minitheater from "@/assets/minitheater.png";
import smartboard from "@/assets/smartboard.png";
import study3 from "@/assets/study3.png";
import study4 from "@/assets/study4.png";
import study5 from "@/assets/study5.png";
import stv from "@/assets/stv.png";

export default defineComponent({
  name: "SlideGroupWithStaticImages",
  setup() {
    const studys = ref([
      {
        src: study3,
        alt: "ห้องศึกษากลุ่ม ชั้น 3",
        caption: "ห้องศึกษากลุ่ม ชั้น 3",
      },
      {
        src: study4,
        alt: "ห้องศึกษากลุ่ม ชั้น 4",
        caption: "ห้องศึกษากลุ่ม ชั้น 4",
      },
      {
        src: study5,
        alt: "ห้องศึกษากลุ่ม ชั้น 5",
        caption: "ห้องศึกษากลุ่ม ชั้น 5",
      },
    ]);

    const entertainment = ref([
      {
        src: stv,
        alt: "ห้องศึกษากลุ่มมัลติมีเดีย (STV) ชั้น 6",
        caption: "ห้องศึกษากลุ่มมัลติมีเดีย ชั้น 6",
      },
      {
        src: karake,
        alt: "LIBRA OKE ชั้น 6",
        caption: "LIBRA OKE ชั้น 6",
      },
      {
        src: minitheater,
        alt: "MINI THEATER ชั้น 6",
        caption: "MINI THEATER ชั้น 6",
      },
    ]);

    const meeting = ref([
      {
        src: room201,
        alt: "ห้อง 201 ชั้น 2",
        caption: "ห้อง 201 ชั้น 2",
      },
      {
        src: lectureroom,
        alt: "ห้อง Lecturer's Room ชั้น 5",
        caption: "ห้อง Lecturer's Room ชั้น 5",
      },
      {
        src: smartboard,
        alt: "ห้อง 604 Smart Board ชั้น 6",
        caption: "ห้อง 604 Smart Board ชั้น 6",
      },
      {
        src: ministudio,
        alt: "ห้อง Mini Studio ชั้น 6",
        caption: "ห้อง Mini Studio ชั้น 6",
      },
      {
        src: cyber1,
        alt: "ห้อง Cyber Zone I ชั้น 6",
        caption: "ห้อง Cyber Zone I ชั้น 6",
      },
      {
        src: cyber2,
        alt: "ห้อง Cyber Zone II ชั้น 6",
        caption: "ห้อง Cyber Zone II ชั้น 6",
      },
      {
        src: lfl,
        alt: "ห้อง Live for Life ชั้น 6",
        caption: "ห้อง Live for Life ชั้น 6",
      },
    ]);
    return {
      studys,
      entertainment,
      meeting,
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

.head-title {
  font-weight: 600;
  font-size: 24px;
}

.head1-title {
  font-weight: 600;
  font-size: 20px;
}

.regularstu-title {
  font-weight: 400;
  font-size: 16px;
  margin-left: 350px;
  margin-top: 10px;
}
.regularenter-title {
  font-weight: 400;
  font-size: 16px;
  margin-left: 330px;
  margin-top: 10px;
}
.regularmeet-title {
  font-weight: 400;
  font-size: 16px;
  margin-left: 385px;
  margin-top: 10px;
}

.room-caption {
  font-weight: 500;
  font-size: 16px;
}

.slide-image {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
}

.text-center {
  text-align: center;
}

.mt-2 {
  margin-top: 10px;
}

.v-slide-group__controls {
  z-index: 10;
}

.back-ground {
  background-color: #f9f3ea;
}

.ms-kob {
  margin-top: -750px;
}
</style>
