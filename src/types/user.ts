import { Confirmation } from "./confirmation";
import { RoleAssignment } from "./roleAssignment";
import { GetSpecialRoomBooking } from "./specialRoomBooking";
import { UserBooking } from "./userBooking";

export interface User {
  userId: number;

  username: string;

  password: string;

  firstName: string;

  lastName: string;

  email: string;

  roleAssignments: RoleAssignment[];

  confirmations: Confirmation[];

  userBookings: UserBooking[];

  specialRoomBookings: GetSpecialRoomBooking[];
}
