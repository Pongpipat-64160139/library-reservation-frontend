import { defineStore } from "pinia";
import specialRoomService from "../services/specialRoomService";
import {
  PostSpecialRoom,
  UpdateSpecialRoom,
} from "../types/specialRoomBooking";
import { ref } from "vue";

export const useSpecialRoomStore = defineStore("specialRoom", () => {
  const srbService = specialRoomService;
  const newSRB = ref<PostSpecialRoom>({
    people_Count: 0, // ค่าเริ่มต้นเป็น 0 (ยังไม่มีคน)
    contract_Number: "", // ค่าเริ่มต้นเป็น String ว่าง
    start_Date: "", // ค่าเริ่มต้นให้เป็นค่าว่าง
    start_Time: "",
    end_Date: "",
    end_Time: "",
    stage_Name: "",
    equip_Descript: "",
    order_Description: "",
    document: 0, // ID เอกสารเป็น 0
    userId: 0, // ค่าเริ่มต้นให้เป็น 0 (ยังไม่มีการระบุผู้ใช้)
    reason: "",
    cancelTime: "",
    roomId: 0, // ค่าเริ่มต้นให้เป็น 0
  });
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
    newSRB,
    cancelResevedSpecial,
    updateReseveStatus,
    getOneById,
    createSpecialRoom,
    getAllSRBBook,
    updateSpecialRoom,
  };
});
