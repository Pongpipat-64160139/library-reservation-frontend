import { defineStore } from "pinia";
import participantService from "../services/participantService";
import type { ParticipantPostPayload } from "../types/participant";

export const useParticipantStore = defineStore("participant", () => {
  const participantservice = participantService;
  async function createParticipant(participant: ParticipantPostPayload) {
    const res = await participantservice.createParticipant(participant);
    return res.data;
  }
  function getAllParticipants() {
    return participantservice.getAllParticipants();
  }
  async function findOneParticipant(id: number) {
    return await participantservice.getParticipantById(id);
  }
  async function updateParticipant(participant: ParticipantPostPayload) {}
  return {
    createParticipant,
    getAllParticipants,
    findOneParticipant,
    updateParticipant,
  };
});
