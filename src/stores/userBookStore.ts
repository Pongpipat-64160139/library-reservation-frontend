import { defineStore } from "pinia";
import { ref } from "vue";
import type { UBPostpayload, UserBooking } from "../types/userBooking";
import userBookService from "../services/userBookService";

export const useUserBookStore = defineStore("userbooking", () => {
  const userBooking = ref<UserBooking>();
  const userbookservice = userBookService;

  async function getAllUserBook() {
    return await userbookservice.getAllUserBooks();
  }
  async function findOneUserBooking(id: number) {
    return await userbookservice.getUserBookById(id);
  }
  async function createNewUserBook(userBooking: UBPostpayload) {
    const res = await userbookservice.createUserBook(userBooking);
    const newUserBooking = res.data;
    return newUserBooking;
  }

  return {
    userBooking,
    getAllUserBook,
    findOneUserBooking,
    createNewUserBook,
  };
});
