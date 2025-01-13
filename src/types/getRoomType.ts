export interface GetRoomType {
  // id?: number;
  roomId: number;
  roomName: string;
  capacity: number;
  maxHours: number;
  roomStatus: string;
  roomType: string;
  roomMinimum: number;
  orderFood: string;
  floorId: number;
}
