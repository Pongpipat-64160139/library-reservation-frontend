import http from "../axios";

export function getAllEquipment() {
  return http.get("/equipments");
}
export function getEquipmentById(id: number){
  return http.get(`/equipments/${id}`);
}
export default {
  getAllEquipment,
  getEquipmentById,
};
