import type { Role } from "./role";
import type { Room } from "./room";
import type { User } from "./user";

export interface Confirmation {
  confirm_Id: number;

  role: Role;

  room: Room;

  user: User;
}
