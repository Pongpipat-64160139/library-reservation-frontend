import { defineStore } from "pinia";
import floorService from "../services/floorService";
import specialRoomService from "../services/specialRoomService";
import {
  PostSpecialRoom,
  UpdateSpecialRoom,
} from "../types/specialRoomBooking";

export const useSpecialRoomStore = defineStore("specialRoom", () => {
  const srbService = specialRoomService;

  async function createSpecialRoom(srb: PostSpecialRoom) {
    const res = await srbService.createSpecialRoomBooking(srb);
    return res.data;
  }
  async function updateSpecialRoom(id: number, srb: UpdateSpecialRoom) {
    const updateSrb = await srbService.updateSpecialRoomBooking(id, srb);
    return updateSrb.data;
  }
  async function getAllSRBBook() {
    return await srbService.getAllSpecialRoom();
  }
  async function getOneById(id: number) {
    const res = await srbService.getOneById(id);
    return res.data;
  }
  async function updateReseveStatus(id: number, updateStatus: string) {
    const res = await srbService.updateSpecialRoomBooking(id, {
      reseve_status: updateStatus,
    });
    return res.data;
  }

  async function cancelResevedSpecial(
    id: number,
    updateStatus: string,
    updateReason: string,
    updateCancelTime: string
  ) {
    const res = await srbService.updateSpecialRoomBooking(id, {
      reseve_status: updateStatus,
      cancelTime: updateCancelTime,
      reason: updateReason,
    });
    return res.data;
  }
  return {
    cancelResevedSpecial,
    updateReseveStatus,
    getOneById,
    createSpecialRoom,
    getAllSRBBook,
    updateSpecialRoom,
  };
});
