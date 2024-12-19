<template class="back-ground">
  <Header_page />

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
        <router-link
          to="/table_study"
          class="ps-16 pt-4 regularstu-title regularstu-line"
        >
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </router-link>
      </span>

      <v-slide-group show-arrows class="ps-13">
        <v-slide-group-item v-for="(image, index) in studys" :key="index">
          <div class="ma-4 d-flex flex-column align-center">
            <img :src="image.src" :alt="image.alt" class="slide-image" />
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
        <h1 class="ps-16 pt-5 head1-title">Entertain Room</h1>
        <router-link
          to="/table_entertain"
          class="pt-4 regularenter-title regularstu-line"
        >
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </router-link>
      </span>

      <v-slide-group show-arrows class="ps-13">
        <v-slide-group-item
          v-for="(image, index) in entertainment"
          :key="index"
        >
          <div class="ma-4 d-flex flex-column align-center">
            <img :src="image.src" :alt="image.alt" class="slide-image" />
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
        <router-link
          to="/table_meeting"
          class="ps-16 pt-4 regularmeet-title regularstu-line"
        >
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </router-link>
      </span>

      <v-slide-group show-arrows class="">
        <v-slide-group-item v-for="(image, index) in meeting" :key="index">
          <div class="ma-4 d-flex flex-column align-center">
            <img :src="image.src" :alt="image.alt" class="slide-image" />
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

// สร้างข้อมูลแบบ static ข้างนอก
const studys = [
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
];

const entertainment = [
  {
    src: stv,
    alt: "ห้องศึกษากลุ่มมัลติมีเดีย (STV) ชั้น 6",
    caption: "ห้องศึกษากลุ่มมัลติมีเดีย ชั้น 6",
  },
  { src: karake, alt: "LIBRA OKE ชั้น 6", caption: "LIBRA OKE ชั้น 6" },
  {
    src: minitheater,
    alt: "MINI THEATER ชั้น 6",
    caption: "MINI THEATER ชั้น 6",
  },
];

const meeting = [
  { src: room201, alt: "ห้อง 201 ชั้น 2", caption: "ห้อง 201 ชั้น 2" },
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
];

export default {
  name: "SlideGroupWithStaticImages",
  data() {
    return {
      studys,
      entertainment,
      meeting,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

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
  margin-left: 355px;
  margin-top: 10px;
}
.regularenter-title {
  font-weight: 400;
  font-size: 16px;
  margin-left: 447px;
  margin-top: 10px;
}
.regularmeet-title {
  font-weight: 400;
  font-size: 16px;
  margin-left: 395px;
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
  transition: transform 0.3s ease-in-out;
}

.slide-image:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
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
  background-color: #f9f3ea; /* พื้นหลังสีหลัก */
  background-image: url("@/assets/crisp-paper-ruffles.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.ms-kob {
  margin-top: -615px;
}

.regularstu-line {
  cursor: pointer;
  text-decoration: none;
  color: #493628;
  transition: text-decoration 0.2s ease-in-out;
  position: relative;
  z-index: 10;
}
</style>
