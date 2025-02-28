import http from "../axios";
import type { UBPostpayload } from "../types/userBooking";
export function getAllUserBooks() {
  return http.get("/user-bookings");
}

export function getUserBookById(id: number) {
  return http.get(`/user-bookings/${id}`);
}

export function createUserBook(userBook: UBPostpayload) {
  return http.post("/user-bookings", userBook);
}

export function updateUserBook(id: number, userBook: UBPostpayload) {
  return http.patch(`/user-bookings/${id}`, userBook);
}

export function deleteUserBook(id: number) {
  return http.delete(`/user-bookings/${id}`);
}
export default {
  getAllUserBooks,
  getUserBookById,
  createUserBook,
  updateUserBook,
  deleteUserBook,
};
