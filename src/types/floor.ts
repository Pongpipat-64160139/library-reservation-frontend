import type { Room } from "./room";

export interface Floor {
  floorId: number;

  floor_Number: number;

  total_Room: number;

  openTime: string;

  closedTime: string;

  rooms: Room[];
}
