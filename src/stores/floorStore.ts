import { defineStore } from "pinia";
import floorService from "../services/floorService";

export const useFloorStore = defineStore("floor", () => {
  const floorservice = floorService;
  async function getAllFloors() {
    const floors = await floorservice.getAllFlors();
    console.log(floors.data);
    return floors;
  }
  return { getAllFloors };
});
