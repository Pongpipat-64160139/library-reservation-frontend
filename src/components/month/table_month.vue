<template>
  <Header_page />
  <v-container fluid class="back-ground ms-kob">
    <div>
      <div class="calendar-header">
        <div class="year-month-selector">
          <div class="selector-container">
             <!-- Dropdown ที่คลิกแล้วแสดง vue-month-picker -->
            <select
              v-model="selectedMonth"
              @focus="showMonthPicker = true"
              style="cursor: pointer"
            >
              <option
                v-for="(month, index) in months"
                :key="index"
                :value="index + 1"
              >
                {{ month }}
              </option>
            </select>

            <!-- Vue Month Picker -->
            <month-picker
              v-if="showMonthPicker"
              :value="{ month: selectedMonth - 1, year: selectedYear }"
              @input="onMonthYearChange"
              @close="showMonthPicker = false"
              :locale="{ months: months, years: years }"
            />
            <select class="mg-calendar" v-model="selectedYear" @change="updateCalendar">
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
            <span class="calendar-icon mdi mdi-calendar-month"></span>
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
                <div v-if="day.bookings && day.bookings.length" class="booking">
                  <div
                    v-for="(booking, index) in day.bookings.slice(0, 3)"
                    :key="index"
                  >
                    <p>{{ booking.name }} : {{ booking.status }}</p>
                  </div>
                  <p v-if="day.bookings.length > 3">...และอื่น ๆ</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    const currentYear = new Date().getFullYear();
    return {
      selectedYear: currentYear,
      selectedMonth: new Date().getMonth() + 1,
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
  },
  mounted() {
    this.updateCalendar();
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

.year-month-selector .selector-container {
  display: flex;
  align-items: center;
  border: 2px solid;
  justify-content: center;
  border-radius: 5px;
  padding: 10px;
  background-color: #f5eded;
  gap: 10px;
  width: 300px;
}

.year-month-selector select {
  border: none;
  font-size: 16px;
  outline: none;
}

.mg-calendar {
  margin-left: -20px;
}

.calendar-icon {
  font-size: 20px;
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
  border-radius: 10px;
}
</style>
