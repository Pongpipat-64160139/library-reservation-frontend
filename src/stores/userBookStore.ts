import { defineStore } from "pinia";
import floorService from "../services/floorService";
import { ref } from "vue";
import { UserBooking } from "../types/userBooking";
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
  async function createNewUserBook(userBooking: UserBooking) {
    const newUserbook = await userbookservice.createUserBook(userBooking);
    return newUserbook;
  }

  return {
    userBooking,
    getAllUserBook,
    findOneUserBooking,
    createNewUserBook,
  };
});
