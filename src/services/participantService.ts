import http from "../axios";
import { Participant } from "../types/participant";

export function getAllParticipants() {
  return http.get("/participants");
}

export function getParticipantById(id: number) {
  return http.get(`/participants/${id}`);
}

export function createParticipant(participant: Participant) {
  return http.post("/participants", participant);
}

export function updateParticipant(id: number, participant: Participant) {
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
