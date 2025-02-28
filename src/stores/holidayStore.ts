import { defineStore } from "pinia";
import holidayService from "../services/holidayService";
import { ref } from "vue";
import type { Holiday } from "../types/holidays";

export const useHolidayStore = defineStore("holiday", () => {
  const holidayservice = holidayService;
  const saveCurrentHoliday = ref<Holiday[]>([]);
  
  async function getAllHolidayInYear(year: string[]) {
    const response = await holidayservice.getHolidaysByYears(year);
    saveCurrentHoliday.value = response.data;
    console.log(saveCurrentHoliday.value);
    return saveCurrentHoliday;
  }
  return {
    getAllHolidayInYear,
    saveCurrentHoliday,
  };
});
