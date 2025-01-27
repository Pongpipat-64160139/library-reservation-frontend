import { defineStore } from "pinia";
import equipmentService from "../services/equipmentService";
import { ref } from "vue";
import { Equipment } from "../types/equipment";

export const useEquipmentStore = defineStore("equipment", () => {
  const equipmentservice = equipmentService;
  const allEquipment = ref<Equipment[]>([]);
  const selectedEQForm = ref<Equipment[]>([]);
  async function getAllEquipment() {
    const res = await equipmentservice.getAllEquipment();
    allEquipment.value = res.data;
    return allEquipment;
  }
  async function getEquipmentById(id: number) {
    const res = await equipmentservice.getEquipmentById(id);
    return res.data;
  }
  function resetSelcetedEquipment() {
    selectedEQForm.value = [];
    return selectedEQForm.value;
  }
  return {
    selectedEQForm,
    getEquipmentById,
    getAllEquipment,
    allEquipment,
    equipmentservice,
    resetSelcetedEquipment,
  };
});
