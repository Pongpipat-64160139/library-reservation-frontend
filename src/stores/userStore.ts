import { defineStore } from "pinia";
import userService from "../services/userService";

export const useUserStore = defineStore("user", () => {
  const userservice = userService;
  function getAllUsers() {
    const users = userservice.getAllUsers();
    console.log(users);
    return users;
  }

  return { getAllUsers };
});
