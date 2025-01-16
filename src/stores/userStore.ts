import { defineStore } from "pinia";
import userService from "../services/userService";
import { User } from "../types/user";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userservice = userService;
  const leaderUser = ref<User>();
  function getAllUsers() {
    const users = userservice.getAllUsers();
    console.log(users);
    return users;
  }
  async function getUserById(id: number) {
    const res = await userservice.getUserById(id);
    leaderUser.value = res.data;
    return leaderUser.value;
  }

  return { getAllUsers, getUserById, leaderUser };
});
