import { defineStore } from "pinia";
import floorService from "../services/floorService";
import participantService from "../services/participantService";
import { Participant } from "../types/participant";

export const useParticipantStore = defineStore("participant", () => {
  const participantservice = participantService;
  async function createParticipant(participant: Participant) {
    return await participantservice.createParticipant(participant);
  }
  function getAllParticipants() {
    return participantservice.getAllParticipants();
  }
  async function findOneParticipant(id: number) {
    return await participantservice.getParticipantById(id);
  }
  async function updateParticipant(participant: Participant) {
    return await participantservice.updateParticipant(
      participant.participant_ID,
      participant
    );
  }
  return {
    createParticipant,
    getAllParticipants,
    findOneParticipant,
    updateParticipant,
  };
});
