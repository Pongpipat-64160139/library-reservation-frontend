import { defineStore } from "pinia";
import userService from "../services/userService";

import { UpdateUser, User } from "../types/user";

import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userservice = userService;
  const currentUser = ref<User>();
  const isLoign = ref(false);

  async function checkLoignAndSaveDataUser(username: string, password: string) {
    try {
      // 🚀 เรียกใช้งาน service `checkAndLoginUser` เพื่อตรวจสอบว่าผู้ใช้สามารถล็อกอินได้หรือไม่
      const response = await userservice.checkAndLoginUser(username, password);

      // ✅ กรณีที่ response.data ไม่ใช่ 0 (แสดงว่าผู้ใช้ไม่มีข้อมูลในระบบ)
      if (response.data != 0) {
        // 🔹 บันทึกข้อมูลผู้ใช้ลง LocalStorage เพื่อเก็บสถานะล็อกอิน
        localStorage.setItem("userLogin", JSON.stringify(response.data));
        // 🔹 กำหนดค่า `isLoign` เป็น `true` เพื่อบอกว่าผู้ใช้ล็อกอินสำเร็จ
        isLoign.value = true;
      }

      // ✅ กรณีที่ response.data เท่ากับ 0 (แสดงว่าผู้ใช้มีอยู่แล้วในระบบ)
      if (response.data == 0) {
        // 🔹 เรียก API `getDataUserformAPI` เพื่อนำเข้าข้อมูลผู้ใช้จากระบบอื่น
        const res = await userservice.getDataUserformAPI(username, password);

        // 🔹 ค้นหาผู้ใช้ในระบบปัจจุบันจาก Username
        const findUserByUsername = await userservice.getUserByUsername(
          username
        );

        // 🔹 ดึง `userId` ออกมาจากข้อมูลที่ค้นหาได้
        const userId: User = findUserByUsername.data;

        // 🔹 ดึงข้อมูล `data` ที่ได้จาก API เพื่อนำมาอัปเดต
        const updateUser: UpdateUser = res.data.data;

        // 🔹 สร้าง timestamp ปัจจุบันเพื่ออัปเดตค่า `lastLoginAt`
        const updateLastLogin = new Date().toISOString().split("T")[0];
        updateUser.lastLoginAt = updateLastLogin;

        // 🔹 อัปเดตค่า `lastLoginAt` ให้กับผู้ใช้
        const updateLogin = await userservice.updateLastLoginUser(
          userId.userId,
          updateUser
        );

        // 🔹 บันทึกข้อมูลผู้ใช้ที่ได้รับการอัปเดตลง LocalStorage
        localStorage.setItem("userLogin", JSON.stringify(updateLogin.data));

        // 🔹 กำหนดค่า `isLoign` เป็น `true` เพื่อยืนยันว่าผู้ใช้ล็อกอินสำเร็จ
        isLoign.value = true;
      }

      // ❌ ดักจับข้อผิดพลาดทั้งหมดที่เกิดขึ้นจาก try
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        // 🚨 ถ้าเป็น Error 500 ให้แจ้งเตือน
        if (status === 500) {
          console.error("🔥 Internal Server Error. Please try again later.");
          return null;
        }

        // 🚨 จัดการ Error อื่นๆ
        console.error(`❌ API Error (${status}):`, error.response.data);
        return null;
      } else {
        console.error("❌ Unknown error occurred:", error);
        return null;
      }
    }
  }

  function getLocalStorageUser() {
    const userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      currentUser.value = JSON.parse(userLogin);
    }
    return currentUser.value;
  }


  
  return {
    checkLoignAndSaveDataUser,
    currentUser,
    getLocalStorageUser,
    isLoign,
  };
});
