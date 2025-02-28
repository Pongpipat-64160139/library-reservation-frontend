import http from "../axios";
import type { ParticipantPostPayload } from "../types/participant";

export function getAllParticipants() {
  return http.get("/participants");
}

export function getParticipantById(id: number) {
  return http.get(`/participants/${id}`);
}

export function createParticipant(participant: ParticipantPostPayload) {
  return http.post("/participants", participant);
}

export function updateParticipant(
  id: number,
  participant: ParticipantPostPayload
) {
  return http.patch(`/participants/${id}`, participant);
}
export function deleteParticipant(id: number) {
  return http.delete(`/participants/${id}`);
}
export default {
  getAllParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
};
