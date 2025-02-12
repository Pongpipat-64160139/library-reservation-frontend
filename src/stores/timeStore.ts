import { defineStore } from "pinia";
import { ref } from "vue";

export const useTimeStore = defineStore("timeStore", () => {
  const timeOptionsInMinutes = ref<number[]>([]); // แปลงรายการเวลาทั้งหมดเป็นนาทีรวม
  const timeOptions = ref([
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ]);
  const currentTotalMinutes = getCurrentTimeInMinutes();
  const timeSlots = ref<string[]>([]);
  const endTimeSlots = ref<string[]>([]);

  // ดึงเวลาปัจจุบันและแปลงเป็นนาทีรวม
  function getCurrentTimeInMinutes(): number {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    return hour * 60 + minutes; // นาทีรวม
  }

  // แปลงเวลาทั้งหมดใน `timeOptions` เป็นนาทีรวม
  function convertTimeOptionsToMinutes(): void {
    timeOptionsInMinutes.value = timeOptions.value.map((time) => {
      const [hour, minutes] = time.split(":").map(Number);
      return hour * 60 + minutes;
    });
  }

  // หาค่าเวลาที่มากกว่าหรือเท่ากับเวลาปัจจุบัน
  function findNextAvailableTime(): string | null {
    convertTimeOptionsToMinutes(); // อัปเดต `timeOptionsInMinutes`
    const nextTimeInMinutes = timeOptionsInMinutes.value.find(
      (time) => time >= currentTotalMinutes
    );
    if (nextTimeInMinutes !== undefined) {
      const hours = Math.floor(nextTimeInMinutes / 60)
        .toString()
        .padStart(2, "0"); // แปลงเป็น ชั่วโมง
      const minutes = (nextTimeInMinutes % 60).toString().padStart(2, "0"); // แปลงเป็นนาที
      return `${hours}:${minutes}`; // แปลงกลับเป็นรูปแบบ HH:mm
    }
    return null; // ไม่มีเวลาในอนาคต
  }

  function generateTimeSlots(startTime: string, endTime: string): string[] {
    // ล้างข้อมูลใน timeSlots ก่อน
    timeSlots.value = [];

    // แปลงเวลาจุดเริ่มต้นและสิ้นสุดเป็นนาทีรวม
    const convertToMinutes = (time: string): number => {
      const [hour, minutes] = time.split(":").map(Number);
      return hour * 60 + minutes;
    };

    // แปลงนาทีรวมกลับเป็นรูปแบบ HH:mm
    const convertToTime = (minutes: number): string => {
      const hours = Math.floor(minutes / 60)
        .toString()
        .padStart(2, "0");
      const mins = (minutes % 60).toString().padStart(2, "0");
      return `${hours}:${mins}`;
    };

    let currentMinutes = convertToMinutes(startTime); // เวลาปัจจุบัน
    const endMinutes = convertToMinutes(endTime); // เวลาสิ้นสุด

    // สร้างเวลาทีละ 30 นาที
    while (currentMinutes <= endMinutes) {
      timeSlots.value.push(convertToTime(currentMinutes));
      currentMinutes += 30; // เพิ่มเวลา 30 นาทีในแต่ละรอบ
    }

    return timeSlots.value;
  }
  function generateEndTimeSlots(startTime: string, maxhours: number, closingTime: string) {
    // ล้างข้อมูลใน endTimeSlots
    endTimeSlots.value = [];
  
    // ฟังก์ชันแปลงเวลาเป็นนาทีรวม
    const convertToMinutes = (time: string): number => {
      const [hour, minutes] = time.split(":").map(Number);
      return hour * 60 + minutes;
    };
  
    // ฟังก์ชันแปลงนาทีรวมกลับเป็นเวลา HH:mm
    const convertToTime = (times: number): string => {
      const hours = Math.floor(times / 60)
        .toString()
        .padStart(2, "0");
      const mins = (times % 60).toString().padStart(2, "0");
      return `${hours}:${mins}`;
    };
  
    // คำนวณเวลาสิ้นสุดตามเวลาที่กำหนด (startTime + maxhours)
    const maxEndTime = convertToMinutes(startTime) + maxhours * 60;
  
    // คำนวณเวลาปิดบริการ (closingTime)
    const closingTimeInMinutes = convertToMinutes(closingTime);
  
    // ใช้เวลาที่น้อยที่สุดระหว่าง `maxEndTime` และ `closingTimeInMinutes`
    const finalEndTime = Math.min(maxEndTime, closingTimeInMinutes);
  
    let currentTime = convertToMinutes(startTime) + 30; // เริ่มที่เวลาถัดไป (startTime + 30 นาที)
  
    // สร้างช่วงเวลาเพิ่มทีละ 30 นาทีจนถึง `finalEndTime`
    while (currentTime <= finalEndTime) {
      endTimeSlots.value.push(convertToTime(currentTime));
      currentTime += 30;
    }
  }
  
  function updateEndTime(times: string) {
    const [hour, minute] = times.split(":").map(Number);
    const totalMinutes = hour * 60 + minute;
    const newTotalMinutes = totalMinutes + 30;
    const convertToHour = Math.floor(newTotalMinutes / 60)
      .toString()
      .padStart(2, "0");
    const convertToMinutes = (newTotalMinutes % 60).toString().padStart(2, "0");
    return `${convertToHour}:${convertToMinutes}`;
  }

  return {
    timeOptions,
    currentTotalMinutes,
    findNextAvailableTime,
    getCurrentTimeInMinutes,
    convertTimeOptionsToMinutes,
    generateTimeSlots,
    timeSlots,
    generateEndTimeSlots,
    endTimeSlots,
    updateEndTime,
  };
});
