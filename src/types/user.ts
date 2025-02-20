import { Confirmation } from "./confirmation";
import { RoleAssignment } from "./roleAssignment";
import { GetSpecialRoomBooking } from "./specialRoomBooking";
import { UserBooking } from "./userBooking";

export interface User {
  userId: number;

  /** First name of the user */
  firstname: string;

  /** Last name of the user */
  lastname: string;

  /** Unique username */
  Username: string;

  /** Optional prefix name (e.g., Mr., Ms., Dr.) */
  Prefix_Name?: string;

  /** Email address of the user */
  Email: string;

  /** Optional phone number */
  Phone?: string;

  /** Optional department name */
  Department_Name?: string;

  /** Optional position name */
  Position_Name?: string;

  /** Type of person (e.g., OU=People) */
  TypePersons: string;

  /** Agency the user belongs to */
  Agency: string;

  /** Account status (e.g., Active) */
  Status: string;

  /** Optional management position name */
  ManagementPositionName?: string;

  /** LDAP authentication flag */
  Ldap: number;

  /** Last login timestamp */
  lastLoginAt: string;

  /** Role assignments associated with the user */
  roleAssignments: RoleAssignment[];

  /** Confirmations related to the user */
  confirmations: Confirmation[];

  /** Bookings made by the user */
  userBookings: UserBooking[];

  /** Special room bookings made by the user */
  specialRoomBookings: GetSpecialRoomBooking[];
}
export interface UpdateUser {
  /** First name of the user */
  firstname: string;

  /** Last name of the user */
  lastname: string;

  /** Unique username */
  Username: string;

  /** Optional prefix name (e.g., Mr., Ms., Dr.) */
  Prefix_Name?: string;

  /** Email address of the user */
  Email: string;

  /** Optional phone number */
  Phone?: string;

  /** Optional department name */
  Department_Name?: string;

  /** Optional position name */
  Position_Name?: string;

  /** Type of person (e.g., OU=People) */
  TypePersons: string;

  /** Agency the user belongs to */
  Agency: string;

  /** Account status (e.g., Active) */
  Status: string;

  /** Optional management position name */
  ManagementPositionName?: string;

  /** LDAP authentication flag */
  Ldap: number;

  /** Last login timestamp */
  lastLoginAt: string;
}
