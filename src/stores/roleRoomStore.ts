import { defineStore } from "pinia";
import floorService from "../services/floorService";
import roleRoomAccessService from "../services/roleRoomAccessService";

export const useRoleRoomStore = defineStore("role-room-access", () => {
  const roleRoomAccess = roleRoomAccessService;
  async function findOneRoleRoom(id: number) {
    const roleRoomAccess = await roleRoomAccessService.getByOneRoleRoom(id);
    console.log(roleRoomAccess.data);
    return roleRoomAccess.data;
  }
  return {
    findOneRoleRoom,
  };
});
