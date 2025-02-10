import { Confirmation } from "./confirmation";
import { Floor } from "./floor";
import { NormalRoomBooking } from "./normalRoomBooking";
import { RoleRoomAccess } from "./roleRoomAccess";

export interface Room {
  roomId: number;

  room_Name: string;

  capacity: number;

  max_hours: number;

  room_Status: string;

  room_Type: string;

  room_Minimum: number;

  orderFood: string;

  RoomKey:string

  imagePath:string;

  DetailRoom:string;

  floor: Floor;

  // confirmations: Confirmation[];

  // normalRoomBookings: NormalRoomBooking[];

  // roleRoomAccesses: RoleRoomAccess[];

  // specialRoomBookings: SpecialRoomBooking[];
}
