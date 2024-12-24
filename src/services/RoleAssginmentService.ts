import http from "../axios";
import { RoleAssignment } from "../types/roleAssignment";

export function getAllRoleAssginment() {
  return http.get("/role-assignments");
}
export function getByOneRoleAssignment(id: number) {
  return http.get(`/role-assignments/${id}`);
}

export function createRoleAssignment(roleAssignments: RoleAssignment) {
  return http.post("/role-assignments", roleAssignments);
}

export function deleteRoleAssignment(id: number) {
  return http.delete(`/role-assignments/${id}`);
}
export default {
  getAllRoleAssginment,
  getByOneRoleAssignment,
  createRoleAssignment,
  deleteRoleAssignment,
};
