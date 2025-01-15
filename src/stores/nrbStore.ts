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
      const findNRB = await nrbService.getNRBById(id);
      if (!findNRB) {
        throw new Error("Not found");
      }
      const updateNRB = await nrbService.updateNRB(id, nrb);
      return updateNRB;
    } catch (error) {
      throw new Error("Error updating");
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
