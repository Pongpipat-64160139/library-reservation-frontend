<template>
  <Header_page />
  <v-container fluid class="back-ground ms-kob">
    <div>
      <div class="calendar-header">
        <div class="year-month-selector">
          <button
            @click="showMonthDropdown = !showMonthDropdown"
            class="month-button"
          >
            {{ months[selectedMonth - 1] }}
          </button>
          <div v-if="showMonthDropdown" class="dropdown-month">
            <div
              v-for="(month, index) in months"
              :key="index"
              @click="changeMonth(index + 1)"
              class="dropdown-item"
            >
              {{ month }}
            </div>
          </div>

          <!-- ปุ่มเลือกปี -->
          <button
            @click="showYearDropdown = !showYearDropdown"
            class="year-button"
          >
            {{ selectedYear + 543 }}
          </button>
          <div v-if="showYearDropdown" class="dropdown-year">
            <div
              v-for="year in years"
              :key="year"
              @click="changeYear(year - 543)"
              class="dropdown-item"
            >
              {{ year }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <table class="calendar-table">
      <thead>
        <tr>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in calendar" :key="week[0].date">
          <td v-for="day in week" :key="day.date">
            <div class="date-cell">
              <span>{{ day.day }}</span>
              <div v-if="day.bookings && day.bookings.length">
                <div
                  v-for="(booking, index) in day.bookings.slice(0, 3)"
                  :key="index"
                  :class="getBookingClass(booking.status)"
                >
                  <p>{{ booking.name }}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>
import { useNormalRoomBookStore } from "@/stores/nrbStore"; // Import the store

export default {
  data() {
    const currentYear = new Date().getFullYear();

    return {
      selectedYear: currentYear,
      selectedMonth: new Date().getMonth() + 1,
      showMonthDropdown: false,
      showYearDropdown: false,
      years: [currentYear - 1, currentYear, currentYear + 1].map(year => year + 543), // Convert to Buddhist years
      months: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
      daysOfWeek: [
        "อาทิตย์",
        "จันทร์",
        "อังคาร",
        "พุธ",
        "พฤหัสบดี",
        "ศุกร์",
        "เสาร์",
      ],
      calendar: [],
      bookings: [], // Remove mockup data
    };
  },
  methods: {
    async fetchBookings() {
      try {
        const nrbStore = useNormalRoomBookStore();
        const response = await nrbStore.getAllReserve();
        console.log("API response:", response);

        if (Array.isArray(response.data)) {
          this.bookings = response.data.map((booking) => {
            // ดึง username จาก userBookings array
            const userName = booking.userBookings && booking.userBookings[0]?.user?.Username || "ไม่ระบุ";
            return {
              date: booking.startDate,
              name: userName,
              status: booking.reseve_status,
            };
          });
          this.updateCalendar();
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    },
    updateCalendar() {
      const year = this.selectedYear;
      const month = this.selectedMonth;
      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);

      let calendar = [];
      let week = [];
      for (let i = 0; i < firstDay.getDay(); i++) {
        week.push({ day: "", date: null, bookings: [] });
      }

      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month - 1, day);
        const formattedDate = date.toLocaleDateString("en-CA"); // ให้ผลลัพธ์เป็น YYYY-MM-DD โดยไม่เปลี่ยนเวลา
        const bookings = this.bookings.filter((b) => b.date === formattedDate);

        week.push({ day, date: formattedDate, bookings });

        if (week.length === 7) {
          calendar.push(week);
          week = [];
        }
      }

      if (week.length) {
        while (week.length < 7) {
          week.push({ day: "", date: null, bookings: [] });
        }
        calendar.push(week);
      }

      this.calendar = calendar;
    },
    changeMonth(month) {
      this.selectedMonth = month;
      this.showMonthDropdown = false;
      this.updateCalendar();
    },
    changeYear(year) {
      this.selectedYear = year;
      this.showYearDropdown = false;
      this.updateCalendar();
    },
    handleClickOutside(event) {
      if (
        !event.target.closest(".dropdown-month") &&
        !event.target.closest(".month-button")
      ) {
        this.showMonthDropdown = false;
      }
      if (
        !event.target.closest(".dropdown-year") &&
        !event.target.closest(".year-button")
      ) {
        this.showYearDropdown = false;
      }
    },
    getBookingClass(status) {
      if (status === "จองล่วงหน้า") {
        return "status-pending";
      } else if (status === "กำลังใช้งาน") {
        return "status-active";
      }
      return "";
    },
  },
  async mounted() {
    try {
      await this.fetchBookings(); // Call the function to fetch bookings
    } catch (error) {
      console.error("Error during mounted hook:", error);
    }
    document.addEventListener("click", this.handleClickOutside);
  },
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
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.ms-kob {
  margin-top: -600px;
}

.calendar-header {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.year-month-selector {
  display: flex;
  gap: 20px;
  position: relative;
  font-size: 16px;
}

.month-button {
  padding: 10px;
  background-color: #f5eded;
  border: 2px solid #493628;
  border-radius: 5px;
  cursor: pointer;
  width: 120px;
}

.year-button {
  padding: 10px;
  background-color: #f5eded;
  border: 2px solid #493628;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
}

.dropdown-month {
  position: absolute;
  background-color: #f5eded;
  border: 2px solid #493628;
  border-radius: 5px;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 50px;
  width: 120px;
}

.dropdown-year {
  position: absolute;
  background-color: #f5eded;
  border: 2px solid #493628;
  border-radius: 5px;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 50px;
  width: 100px;
  margin-left: 140px;
}

.dropdown-item {
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #b5cfb7;
}

.calendar-table {
  width: 100%;
  border-collapse: collapse;
}

.calendar-table th {
  border: 2px solid #493628;
  background-color: #f9f3ea;
  text-align: center;
  vertical-align: top;
  width: 14.28%;
  height: 30px;
}

.calendar-table td {
  border: 2px solid #493628;
  background-color: #f9f3ea;
  text-align: center;
  vertical-align: top;
  width: 14.28%;
  height: 95px;
}

.date-cell {
  padding: 5px;
}

.booking {
  background-color: #b5cfb7;
  padding: 5px;
  border-radius: 5px;
}

.status-pending {
  background-color: rgb(196, 196, 196);
  /* สีเหลืองสำหรับสถานะจองล่วงหน้า */
  color: #493628;
  /* เปลี่ยนสีตัวอักษรถ้าจำเป็น */
  border-radius: 5px;
  padding: 2px;
  margin-top: 5px;
}

.status-active {
  background-color: #b5cfb7;
  /* สีเขียวสำหรับสถานะกำลังใช้งาน */
  color: #493628;
  /* เปลี่ยนสีตัวอักษรถ้าจำเป็น */
  border-radius: 5px;
  padding: 2px;
  margin-top: 5px;
}

/* Phones */
@media only screen and (max-width: 480px) {
  .ms-kob {
    margin-top: -550px;
  }

  .calendar-header {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  }

  .month-button {
    padding: 10px;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    cursor: pointer;
    width: 90px;
    font-size: 10px;
  }

  .year-button {
    padding: 10px;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    cursor: pointer;
    width: 70px;
    font-size: 10px;
  }

  .dropdown-month {
    position: absolute;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 50px;
    width: 90px;
    font-size: 10px;
  }

  .dropdown-year {
    position: absolute;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 50px;
    width: 70px;
    margin-left: 110px;
    font-size: 10px;
  }

  .calendar-table th {
    border: 2px solid #493628;
    background-color: #f9f3ea;
    text-align: center;
    vertical-align: top;
    width: 13%;
    height: 20px;
    font-size: 8px;
    padding: 5px;
  }

  .calendar-table td {
    border: 2px solid #493628;
    background-color: #f9f3ea;
    text-align: center;
    vertical-align: top;
    width: 14.28%;
    height: 70px;
    font-size: 7px;
  }
}

/* Phones landscape*/
@media only screen and (min-width: 481px) and (max-width: 760px) {
  .ms-kob {
    margin-top: -200px;
  }

  .calendar-header {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  }

  .month-button {
    padding: 10px;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    cursor: pointer;
    width: 90px;
    font-size: 10px;
  }

  .year-button {
    padding: 10px;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    cursor: pointer;
    width: 70px;
    font-size: 10px;
  }

  .dropdown-month {
    position: absolute;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 50px;
    width: 90px;
    font-size: 10px;
  }

  .dropdown-year {
    position: absolute;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 50px;
    width: 70px;
    margin-left: 110px;
    font-size: 10px;
  }

  .calendar-table th {
    border: 2px solid #493628;
    background-color: #f9f3ea;
    text-align: center;
    vertical-align: top;
    width: 13%;
    height: 20px;
    font-size: 10px;
    padding: 5px;
  }

  .calendar-table td {
    border: 2px solid #493628;
    background-color: #f9f3ea;
    text-align: center;
    vertical-align: top;
    width: 14.28%;
    height: 70px;
    font-size: 10px;
  }

  .booking {
    margin-top: 5px;
    background-color: #b5cfb7;
    padding: 5px;
    border-radius: 5px;
  }
}

/* restore */
@media only screen and (min-width: 761px) and (max-width: 769px) {
  .ms-kob {
    margin-top: -600px;
  }

  .calendar-header {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  }

  .month-button {
    padding: 10px;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    cursor: pointer;
    width: 90px;
    font-size: 10px;
  }

  .year-button {
    padding: 10px;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    cursor: pointer;
    width: 70px;
    font-size: 10px;
  }

  .dropdown-month {
    position: absolute;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 50px;
    width: 90px;
    font-size: 10px;
  }

  .dropdown-year {
    position: absolute;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 50px;
    width: 70px;
    margin-left: 110px;
    font-size: 10px;
  }

  .calendar-table th {
    border: 2px solid #493628;
    background-color: #f9f3ea;
    text-align: center;
    vertical-align: top;
    width: 13%;
    height: 20px;
    font-size: 10px;
    padding: 5px;
  }

  .calendar-table td {
    border: 2px solid #493628;
    background-color: #f9f3ea;
    text-align: center;
    vertical-align: top;
    width: 14.28%;
    height: 70px;
    font-size: 10px;
  }

  .booking {
    margin-top: 5px;
    background-color: #b5cfb7;
    padding: 5px;
    border-radius: 5px;
  }
}

/* Tablet  landscape */
@media only screen and (min-width: 769px) and (max-width: 1024px) {
  .ms-kob {
    margin-top: -880px;
  }

  .calendar-header {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  }

  .month-button {
    padding: 10px;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    cursor: pointer;
    width: 90px;
    font-size: 10px;
  }

  .year-button {
    padding: 10px;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    cursor: pointer;
    width: 70px;
    font-size: 10px;
  }

  .dropdown-month {
    position: absolute;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 50px;
    width: 100px;
    font-size: 10px;
  }

  .dropdown-year {
    position: absolute;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 50px;
    width: 80px;
    margin-left: 120px;
    font-size: 10px;
  }

  .calendar-table th {
    border: 2px solid #493628;
    background-color: #f9f3ea;
    text-align: center;
    vertical-align: top;
    width: 13%;
    height: 20px;
    font-size: 10px;
    padding: 5px;
  }

  .calendar-table td {
    border: 2px solid #493628;
    background-color: #f9f3ea;
    text-align: center;
    vertical-align: top;
    width: 14.28%;
    height: 70px;
    font-size: 10px;
  }

  .booking {
    margin-top: 5px;
    background-color: #b5cfb7;
    padding: 5px;
    border-radius: 5px;
  }
}
</style>