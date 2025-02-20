import http from "../axios";
import { UpdateUser } from "../types/user";

export function checkAndLoginUser(username: string, password: string) {
  return http.post(`/users/login`, { username, password }); // ✅ ส่งไปใน Body
}

export function updateLastLoginUser(id: number, updateData: Partial<UpdateUser>) {
  return http.patch(`/users/${id}`, updateData);
}

export function getUserByUsername(username: string) {
  return http.get(`/users/findUserName`, {
    params: { username: username },
  });
}
export function getDataUserformAPI(username: string, password: string) {
  return http.get(`users/CheckPersonsLogin`, {
    params: { username: username, password: password }, // ใช้ params เพื่อส่ง Query String
  });
}
export default {
  checkAndLoginUser,
  updateLastLoginUser,
  getUserByUsername,
  getDataUserformAPI,
};
