import { defineStore } from "pinia";
import eqbSerivce from "../services/eqbSerivce";
import type { PostEquipmentBooking } from "../types/equipmentBooking";
import { ref } from "vue";
export const useEqBookStore = defineStore("equipmentBook", () => {
  const equipmentBookService = eqbSerivce;

  function createdEQB(srbId: number, eqId: number) {
    const newEQB = ref<PostEquipmentBooking>({
      require: "ต้องการ",
      equipmnetId: eqId,
      srbId: srbId,
    });
    const createNewEQB = equipmentBookService.createQuipmentBook(newEQB.value);
    console.log("Creating EQB :", createNewEQB);
  }

  return {
    createdEQB,
  };
});
