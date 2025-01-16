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
            {{ selectedYear }}
          </button>
          <div v-if="showYearDropdown" class="dropdown-year">
            <div
              v-for="year in years"
              :key="year"
              @click="changeYear(year)"
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
                <p v-if="day.bookings.length > 3">...และอื่น ๆ</p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>
export default {
  data() {
    const currentYear = new Date().getFullYear();
    return {
      selectedYear: currentYear,
      selectedMonth: new Date().getMonth() + 1,
      showMonthDropdown: false,
      showYearDropdown: false,
      years: Array.from({ length: 11 }, (_, i) => currentYear - 5 + i),
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
      bookings: [
        // Mock Data for Last Year
        { date: "2024-01-10", name: "สมชาย", status: "จองล่วงหน้า" },
        { date: "2024-02-15", name: "สายฝน", status: "กำลังใช้งาน" },
        { date: "2024-03-20", name: "บุญช่วย", status: "กำลังใช้งาน" },
        { date: "2024-04-25", name: "สมหมาย", status: "จองล่วงหน้า" },
        { date: "2024-05-05", name: "นฤมล", status: "กำลังใช้งาน" },
        { date: "2024-06-10", name: "กัลยา", status: "จองล่วงหน้า" },
        { date: "2024-07-15", name: "ประภา", status: "กำลังใช้งาน" },
        { date: "2024-08-20", name: "มงคล", status: "จองล่วงหน้า" },
        { date: "2024-09-25", name: "วรพล", status: "กำลังใช้งาน" },
        { date: "2024-10-10", name: "สมคิด", status: "กำลังใช้งาน" },
        { date: "2024-11-15", name: "ปวีณา", status: "จองล่วงหน้า" },
        { date: "2024-12-20", name: "ณัฐพล", status: "กำลังใช้งาน" },

        // Current Year Data
        { date: "2025-01-10", name: "กานต์", status: "กำลังใช้งาน" },
        { date: "2025-01-10", name: "นุชา", status: "จองล่วงหน้า" },
        { date: "2025-01-10", name: "สมฤดี", status: "กำลังใช้งาน" },
        { date: "2025-01-15", name: "มานพ", status: "กำลังใช้งาน" },
        { date: "2025-01-15", name: "วรรณา", status: "จองล่วงหน้า" },
        { date: "2025-01-15", name: "ประหยัด", status: "กำลังใช้งาน" },
        { date: "2025-01-20", name: "ณัฐ", status: "กำลังใช้งาน" },
        { date: "2025-01-20", name: "นภา", status: "จองล่วงหน้า" },
        { date: "2025-01-20", name: "ศุภชัย", status: "กำลังใช้งาน" },
        { date: "2025-01-25", name: "วรางค์", status: "กำลังใช้งาน" },
        { date: "2025-01-25", name: "กาญจนา", status: "จองล่วงหน้า" },
        { date: "2025-01-25", name: "ปิยะ", status: "กำลังใช้งาน" },
      ],
    };
  },
  methods: {
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
        const date = new Date(year, month - 1, day).toISOString().split("T")[0];
        const bookings = this.bookings.filter((b) => b.date === date);

        week.push({ day, date, bookings });

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
  mounted() {
    this.updateCalendar();
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
  background-color: rgb(196, 196, 196); /* สีเหลืองสำหรับสถานะจองล่วงหน้า */
  color: #493628; /* เปลี่ยนสีตัวอักษรถ้าจำเป็น */
  border-radius: 5px;
  padding: 2px;
  margin-top: 5px;
}

.status-active {
  background-color: #b5cfb7; /* สีเขียวสำหรับสถานะกำลังใช้งาน */
  color: #493628; /* เปลี่ยนสีตัวอักษรถ้าจำเป็น */
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
