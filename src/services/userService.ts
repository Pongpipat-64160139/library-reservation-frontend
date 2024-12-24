import http from "../axios";
import { User } from "../types/user";
export function getAllUsers() {
  return http.get("/users");
}
export function getbyOneUser(id: string) {
  return http.get(`/users/${id}`);
}

export function createUser(users: User) {
  return http.post("/users", users);
}

export function updateUser(id: string, users: User) {
  return http.put(`/users/${id}`, users);
}

export function deleteUser(id: string) {
  return http.delete(`/users/${id}`);
}
export default {
  getAllUsers,
  createUser,
  getbyOneUser,
  updateUser,
  deleteUser,
};
