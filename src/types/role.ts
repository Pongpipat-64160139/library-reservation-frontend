import { Confirmation } from "./confirmation";
import { RoleAssignment } from "./roleAssignment";
import { RoleRoomAccess } from "./roleRoomAccess";

export interface Role {
  roleId: number;

  position: string;

  roleAssignments: RoleAssignment[];

  confirmations: Confirmation[];

  roleRoomAccesses: RoleRoomAccess[];
}
