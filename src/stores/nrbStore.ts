import { defineStore } from "pinia";
import normalBookService from "../services/normalBookService";
import type {
  getStatusReserved,
  PostNormalReseved,
  UpdateNormalRoomBooking,
} from "../types/normalRoomBooking";
import { ref } from "vue";

export const useNormalRoomBookStore = defineStore("normal-room-booking", () => {
  const nrbService = normalBookService;
  const bookings = ref<getStatusReserved[]>([]);
  async function createNewBooking(nrb: PostNormalReseved) {
    const res = await nrbService.createNRB(nrb);
    const newNRB = res.data;
    return newNRB;
  }
  async function getAllReserve() {
    return await nrbService.getAllRNB();
  }
  async function findOneReserve(id: number) {
    const res = await nrbService.getNRBById(id);
    return res.data;
  }
  async function updateReserve(id: number, nrb: UpdateNormalRoomBooking) {
    try {
      // ตรวจสอบว่ามีการจองอยู่หรือไม่
      const existingBooking = await nrbService.getNRBById(id);
      if (!existingBooking || !existingBooking.data) {
        throw new Error(`Booking with ID ${id} not found`);
      }

      // อัปเดตการจอง
      const updatedBooking = await nrbService.updateNRB(
        existingBooking.data.nrbId,
        nrb
      );

      // ตรวจสอบผลลัพธ์
      if (!updatedBooking || !updatedBooking.data) {
        throw new Error(`Failed to update booking with ID ${id}`);
      }

      return updatedBooking.data; // คืนค่าที่อัปเดตสำเร็จ
    } catch (error: any) {
      console.error(
        `Error updating booking with ID ${id}:`,
        error.message || error
      );
      throw new Error(
        `Error updating booking: ${error.message || "Unknown error"}`
      );
    }
  }

  async function deleteReserve(id: number) {
    return nrbService.deleteNRB(id);
  }
  async function getStatusReserve(currentDate: string) {
    const res = await nrbService.getReservedRoom(currentDate);
    return res.data;
  }
  async function updateStatus(id: number, updateStatus: string) {
    const res = await nrbService.updateNRB(id, {
      reseve_status: updateStatus,
    });
    return res.data;
  }

  async function cancelReseved(
    id: number,
    updateReason: string,
    updateStatus: string,
    newCancelTime: string
  ) {
    const res = await nrbService.updateNRB(id, {
      reseve_status: updateStatus,
      reason: updateReason,
      cancelTime: newCancelTime,
    });
    return res.data;
  }
  async function getAllReservedRooms() {
    const res = await nrbService.getAllReserved();
    return res.data;
  }
  return {
    updateStatus,
    getAllReservedRooms,
    createNewBooking,
    getAllReserve,
    findOneReserve,
    updateReserve,
    deleteReserve,
    getStatusReserve,
    bookings,
    cancelReseved,
  };
});
