import http from "../axios";
export function getAllRole() {
  return http.get("/roles");
}
export function getRoleById(id: number) {
  return http.get(`/roles/${id}`);
}
export default {
  getAllRole,
  getRoleById
};
