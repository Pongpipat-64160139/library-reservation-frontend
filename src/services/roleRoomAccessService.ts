import http from "../axios";

export function getAllRoleRoom() {
  return http.get("/role-room-access");
}

export function getByOneRoleRoom(id: number) {
  return http.get(`/role-room-access/${id}`);
}
export default {
  getAllRoleRoom,
  getByOneRoleRoom,
};
