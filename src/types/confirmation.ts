import { Role } from "./role";
import { Room } from "./room";
import { User } from "./user";

export interface Confirmation {
  confirm_Id: number;

  role: Role;

  room: Room;

  user: User;
}
