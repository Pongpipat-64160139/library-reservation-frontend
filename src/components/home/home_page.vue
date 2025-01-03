<template class="back-ground">
  <Header_page />

  <v-container
    fluid
    class="back-ground ms-kob"
  >
    <h1 class="pt-5 head-title text-center pb-10">
      ประเภทห้อง
    </h1>

    <!-- Sheet1 Group Study Room -->
    <v-sheet class="mx-auto study_box">
      <span class="d-flex">
        <h1 class="ps-16 pt-5 head1-title">Group Study Room</h1>
        <router-link
          to="/table_study"
          class="ps-16 pt-4 regular-study-title regularstu-line"
        >
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </router-link>
      </span>

      <v-slide-group
        show-arrows
        class="ps-13"
      >
        <v-slide-group-item
          v-for="(room, index) in studys"
          :key="index"
        >
          <div
            class="ma-4 d-flex flex-column align-center"
            @click="openDialog(room)"
          >
            <img
              :src="room.src"
              :alt="room.alt"
              class="slide-image"
            >
            <span class="mt-2 text-center room-caption">{{
              room.caption
            }}</span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <!-- Sheet2 Entertainment Room -->
    <v-sheet class="mx-auto mt-10 entertain_box">
      <span class="d-flex">
        <h1 class="ps-16 pt-5 head1-title">Entertain Room</h1>
        <router-link
          to="/table_entertain"
          class="pt-4 regular-entertain-title regularstu-line"
        >
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </router-link>
      </span>

      <v-slide-group
        show-arrows
        class="ps-13"
      >
        <v-slide-group-item
          v-for="(room, index) in entertainment"
          :key="index"
        >
          <div
            class="ma-4 d-flex flex-column align-center"
            @click="openDialog(room)"
          >
            <img
              :src="room.src"
              :alt="room.alt"
              class="slide-image"
            >
            <span class="mt-2 text-center room-caption">
              {{ room.caption }}
            </span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <!-- Sheet3 Entertainment Room -->
    <v-sheet class="mx-auto mt-10 mb-10 meeting_box">
      <span class="d-flex">
        <h1 class="ps-16 pt-5 head1-title">Meeting Room</h1>
        <router-link
          to="/table_meeting"
          class="ps-16 pt-4 regular-meeting-title regularstu-line"
        >
          จองห้อง <v-icon right>mdi-arrow-right</v-icon>
        </router-link>
      </span>

      <v-slide-group
        show-arrows
        class=""
      >
        <v-slide-group-item
          v-for="(room, index) in meeting"
          :key="index"
        >
          <div
            class="ma-4 d-flex flex-column align-center"
            @click="openDialog(room)"
          >
            <img
              :src="room.src"
              :alt="room.alt"
              class="slide-image"
            >
            <span class="mt-2 text-center room-caption">
              {{ room.caption }}
            </span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <v-dialog
      v-model="dialog"
      overlay
      max-width="900px"
    >
      <v-card class="style_dialog">
        <v-card-title class="headline text-center text-bold mt-8">
          {{
            selectedRoom.caption
          }}
        </v-card-title>
        <v-card-text>
          <div class="d-flex">
            <!-- ซ้าย -->
            <div class="text-left ms-4">
              <!-- ไอคอนและข้อความจำนวนห้อง -->
              <div class="align-center mb-16 mt-16">
                <p>จำนวน {{ selectedRoom.count }} ห้อง</p>
                <img
                  :src="selectedRoom.gifRoom"
                  alt="Room GIF"
                  class="icon-gif me-2"
                >
              </div>
              <div class="align-center mt-16">
                <p>จำนวน {{ selectedRoom.seats }} ที่นั่ง</p>
                <img
                  :src="selectedRoom.gifSeat"
                  alt="Room GIF"
                  class="icon-gif me-2"
                >
              </div>
            </div>

            <!-- กลาง -->
            <img
              :src="selectedRoom.src"
              :alt="selectedRoom.alt"
              class="dialog-image mx-auto"
            >

            <!-- ขวา -->
            <div class="text-left me-4">
              <div class="align-center mb-16 mt-16">
                <p>รับกุญแจชั้น {{ selectedRoom.key }}</p>
                <img
                  :src="key_gif"
                  alt="Dressing Room Icon"
                  class="icon-gif"
                >
              </div>
              <div class="align-center mt-16">
                <p>ผู้มีสิทธิ์จอง</p>
                <img
                  :src="selectedRoom.gifRole"
                  alt="Room GIF"
                  class="icon-gif me-2"
                >
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import room201 from "@/assets/201.png";
import cyber1 from "@/assets/cyber1.png";
import cyber2 from "@/assets/cyber2.png";
import karaoke from "@/assets/karaoke.png";
import lectureroom from "@/assets/lectureroom.png";
import liveforlife from "@/assets/liveforlife.png";
import ministudio from "@/assets/ministudio.png";
import minitheater from "@/assets/minitheater.png";
import smartboard from "@/assets/smartboard.png";
import study3 from "@/assets/study3.png";
import study4 from "@/assets/study4.png";
import study5 from "@/assets/study5.png";
import stv from "@/assets/stv.png";
import talk_gif from "@/assets/talk.gif";
import key_gif from "@/assets/key.gif";
import movie_gif from "@/assets/watching-movie.gif";
import karaoke_gif from "@/assets/karaoke.gif";
import cinema_gif from "@/assets/cinema.gif";
import chair_gif from "@/assets/chair.gif";
import couch_gif from "@/assets/couch.gif";
import seat_gif from "@/assets/seats.gif";
import cyber_gif from "@/assets/cyber.gif";
import studio_gif from "@/assets/studio.gif";
import live_gif from "@/assets/live.gif";
import board_gif from "@/assets/board.gif";
import lecroom_gif from "@/assets/lecroom.gif";
import meet201_gif from "@/assets/meet201.gif";
import university_gif from "@/assets/university.gif";
import teacher_gif from "@/assets/teacher.gif";
import officer_gif from "@/assets/officer.gif";

const studys = [
  {
    src: study3,
    alt: "ห้องศึกษากลุ่ม ชั้น 3",
    caption: "ห้องศึกษากลุ่ม ชั้น 3",
    key: "2",
    count: "6",
    seats: "3-5",
    eligible: "นักศึกษา",
    gifRoom: talk_gif,
    gifSeat: chair_gif,
    gifRole: university_gif,
  },
  {
    src: study4,
    alt: "ห้องศึกษากลุ่ม ชั้น 4",
    caption: "ห้องศึกษากลุ่ม ชั้น 4",
    key: "4",
    count: "5",
    seats: "3-5",
    eligible: "นักศึกษา",
    gifRoom: talk_gif,
    gifSeat: chair_gif,
    gifRole: university_gif,
  },
  {
    src: study5,
    alt: "ห้องศึกษากลุ่ม ชั้น 5",
    caption: "ห้องศึกษากลุ่ม ชั้น 5",
    key: "4",
    count: "5",
    seats: "3-5",
    eligible: "นักศึกษา",
    gifRoom: talk_gif,
    gifSeat: chair_gif,
    gifRole: university_gif,
  },
];

const entertainment = [
  {
    src: stv,
    alt: "ห้องศึกษากลุ่มมัลติมีเดีย (STV) ชั้น 6",
    caption: "ห้องศึกษากลุ่มมัลติมีเดีย ชั้น 6",
    key: "6",
    count: "9",
    seats: "3-5",
    eligible: "นักศึกษา",
    gifRoom: movie_gif,
    gifSeat: couch_gif,
    gifRole: university_gif,
  },
  {
    src: karaoke,
    alt: "LIBRA OKE ชั้น 6",
    caption: "LIBRA OKE ชั้น 6",
    key: "6",
    count: "2",
    seats: "3-5",
    eligible: "นักศึกษา",
    gifRoom: karaoke_gif,
    gifSeat: couch_gif,
    gifRole: university_gif,
  },
  {
    src: minitheater,
    alt: "MINI THEATER ชั้น 6",
    caption: "MINI THEATER ชั้น 6",
    key: "6",
    count: "1",
    seats: "10-30",
    eligible: "นักศึกษา",
    gifRoom: cinema_gif,
    gifSeat: seat_gif,
    gifRole: university_gif,
  },
];

const meeting = [
  {
    src: room201,
    alt: "ห้อง 201 ชั้น 2",
    caption: "ห้อง 201 ชั้น 2",
    key: "2",
    count: "1",
    seats: "20-50",
    eligible: "นักศึกษา",
    gifRoom: meet201_gif,
    gifSeat: chair_gif,
    gifRole: officer_gif,
  },
  {
    src: lectureroom,
    alt: "ห้อง Lecturer's Room ชั้น 5",
    caption: "ห้อง Lecturer's Room ชั้น 5",
    key: "4",
    count: "3",
    seats: "3-5",
    eligible: "นักศึกษา",
    gifRoom: lecroom_gif,
    gifSeat: chair_gif,
    gifRole: teacher_gif,
  },
  {
    src: smartboard,
    alt: "ห้อง 604 Smart Board ชั้น 6",
    caption: "ห้อง 604 Smart Board ชั้น 6",
    key: "6",
    count: "1",
    seats: "8-10",
    eligible: "นักศึกษา",
    gifRoom: board_gif,
    gifSeat: chair_gif,
    gifRole: university_gif,
  },
  {
    src: ministudio,
    alt: "ห้อง Mini Studio ชั้น 6",
    caption: "ห้อง Mini Studio ชั้น 6",
    key: "6",
    count: "1",
    seats: "มากกว่า 1",
    eligible: "นักศึกษา",
    gifRoom: studio_gif,
    gifSeat: chair_gif,
    gifRole: teacher_gif,
  },
  {
    src: cyber1,
    alt: "ห้อง Cyber Zone I ชั้น 6",
    caption: "ห้อง Cyber Zone I ชั้น 6",
    key: "6",
    count: "1",
    seats: "ไม่เกิน 70",
    eligible: "นักศึกษา",
    gifRoom: cyber_gif,
    gifSeat: chair_gif,
    gifRole: officer_gif,
  },
  {
    src: cyber2,
    alt: "ห้อง Cyber Zone II ชั้น 6",
    caption: "ห้อง Cyber Zone II ชั้น 6",
    key: "3",
    count: "5",
    seats: "ไม่เกิน 30",
    eligible: "นักศึกษา",
    gifRoom: cyber_gif,
    gifSeat: chair_gif,
    gifRole: officer_gif,
  },
  {
    src: liveforlife,
    alt: "ห้อง Live for Life ชั้น 6",
    caption: "ห้อง Live for Life ชั้น 6",
    key: "3",
    count: "5",
    seats: "มากกว่า 3",
    eligible: "นักศึกษา",
    gifRoom: live_gif,
    gifSeat: chair_gif,
    gifRole: university_gif,
  },
];

interface Room {
  src: string;
  alt: string;
  caption: string;
  key?: string;
  count?: string;
  seats?: string;
  eligible?: string;
  gifRoom?: string;
  gifSeat?: string;
  gifRole?: string;
}

export default {
  name: "SlideGroupWithStaticImages",

  data() {
    return {
      dialog: false,
      selectedRoom: {
        caption: "",
        key: "",
        count: "",
        seats: "",
        eligible: "",
        src: "",
        alt: "",
        gifRoom: "",
        gifSeat: "",
        gifRole: "",
      },
      studys,
      entertainment,
      meeting,
      talk_gif,
      key_gif,
      movie_gif,
      karaoke_gif,
      cinema_gif,
      chair_gif,
      couch_gif,
      seat_gif,
      cyber_gif,
      studio_gif,
      live_gif,
      board_gif,
      lecroom_gif,
      meet201_gif,
      university_gif,
      teacher_gif,
      officer_gif,
    };
  },

  methods: {
    openDialog(room: Room) {
      this.selectedRoom = {
        caption: room.caption || "",
        key: room.key || "",
        count: room.count || "",
        seats: room.seats || "",
        gifRoom: room.gifRoom || "",
        gifSeat: room.gifSeat || "",
        eligible: room.eligible || "",
        gifRole: room.gifRole || "",
        src: room.src || "",
        alt: room.alt || "",
      };
      this.dialog = true;
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

.head-title {
  font-weight: 600;
  font-size: 24px;
}

.head1-title {
  font-weight: 600;
  font-size: 20px;
}

.regular-study-title {
  font-weight: 400;
  font-size: 16px;
  margin-left: 355px;
  margin-top: 10px;
}
.regular-entertain-title {
  font-weight: 400;
  font-size: 16px;
  margin-left: 447px;
  margin-top: 10px;
}
.regular-meeting-title {
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

.text-bold {
  font-weight: 600;
}

.mt-2 {
  margin-top: 10px;
}

.v-slide-group__controls {
  z-index: 10;
}

.back-ground {
  background-color: #f9f3ea; /* พื้นหลังสีหลัก */
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.ms-kob {
  margin-top: -615px;
}

.align-center {
  text-align: center;
}

.regularstu-line {
  cursor: pointer;
  text-decoration: none;
  color: #493628;
  transition: text-decoration 0.2s ease-in-out;
  position: relative;
  z-index: 10;
}

@media (max-width: 500px) {
  .dialog-image {
    width: 250px;
    height: 250px;
  }
  .text-left {
    font-size: 14px;
  }
}

.icon-gif {
  width: 70px;
  height: 70px;
  margin-top: 10px;
}

.study_box {
  background-color: #ead8c0;
  border-radius: 16px;
  max-width: 800px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
}

.entertain_box {
  background-color: #ead8c0;
  border-radius: 16px;
  max-width: 800px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
}

.meeting_box {
  background-color: #ead8c0;
  border-radius: 16px;
  max-width: 800px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
}

.style_dialog {
  background-color: #fff;
  max-width: 900px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
}



</style>
