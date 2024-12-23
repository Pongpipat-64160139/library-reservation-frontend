import { Confirmation } from "./confirmation";
import { Floor } from "./floor";
import { NormalRoomBooking } from "./normalRoomBooking";
import { RoleRoomAccess } from "./roleRoomAccess";
import { SpecialRoomBooking } from "./specialRoomBooking";

export interface Room {
  roomId: number;

  room_Name: string;

  capacity: number;

  max_hours: number;

  room_Status: string;

  room_Type: string;

  room_Minimum: number;

  orderFood: string;

  floor: Floor;

  confirmations: Confirmation[];

  normalRoomBookings: NormalRoomBooking[];

  roleRoomAccesses: RoleRoomAccess[];

  specialRoomBookings: SpecialRoomBooking[];
}
