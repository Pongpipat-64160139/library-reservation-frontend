import type { Confirmation } from "./confirmation";
import type { RoleAssignment } from "./roleAssignment";
import type { RoleRoomAccess } from "./roleRoomAccess";

export interface Role {
  roleId: number;

  position: string;

  roleAssignments: RoleAssignment[];

  confirmations: Confirmation[];

  roleRoomAccesses: RoleRoomAccess[];
}
