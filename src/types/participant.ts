import type { UserBooking } from "./userBooking";

export interface Participant {
  participant_ID: number;

  fullName: string;

  userbooking: UserBooking;
}
