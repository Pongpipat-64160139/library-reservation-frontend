import { defineStore } from "pinia";
import normalBookService from "../services/normalBookService";
import { NormalRoomBooking } from "../types/normalRoomBooking";

export const useNormalRoomBookStore = defineStore("normal-room-booking", () => {
  const nrbService = normalBookService;
  async function createNewBooking(nrb: NormalRoomBooking) {
    const res = await nrbService.createNRB(nrb);
    const newNRB = res.data;
    return newNRB;
  }
  async function getAllReserve() {
    return await nrbService.getAllRNB();
  }
  async function findOneReserve(id: number) {
    return await nrbService.getNRBById(id);
  }
  async function updateReserve(id: number, nrb: NormalRoomBooking) {
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
  return {
    createNewBooking,
    getAllReserve,
    findOneReserve,
    updateReserve,
    deleteReserve,
  };
});
