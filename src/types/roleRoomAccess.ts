import type { Role } from "./role";
import type { Room } from "./room";

export interface RoleRoomAccess {
  access_ID: number;

  room: Room;

  role: Role;
}
