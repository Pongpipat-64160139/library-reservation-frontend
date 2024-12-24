import http from "../axios";

export function getAllRoleRoom() {
  return http.get("/role-room-access");
}

export function getRoomById(id: number) {
  return http.get(`/role-room-access/${id}`);
}
export default {
  getAllRoleRoom,
  getRoomById,
};
