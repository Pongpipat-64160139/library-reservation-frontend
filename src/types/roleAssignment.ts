import type { Role } from "./role";
import type { User } from "./user";

export interface RoleAssignment {
  roleAssId: number;

  role: Role;

  user: User;
}
