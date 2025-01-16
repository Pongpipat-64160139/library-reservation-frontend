import { defineStore } from "pinia";
import floorService from "../services/floorService";
import participantService from "../services/participantService";
import { ParticipantPostPayload } from "../types/participant";

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
