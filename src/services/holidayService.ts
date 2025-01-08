import http from "../axios";

export function getHolidaysByYears(years: string[]) {
  return http.get("/holidays", {
    params: { years: years.join(",") }, // แปลง Array เป็น String "2023,2024"
  });
}

export default {
  getHolidaysByYears,
};
