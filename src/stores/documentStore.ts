import { defineStore } from "pinia";
import documentService from "../services/documentService";
import { ref } from "vue";

export const useDocumentStore = defineStore("document", () => {
  const documentFileService = documentService;
  const currentDocument = ref<File | null>(null);
  async function newDocumentFile(file: File) {
    const newFile = await documentFileService.createNewDocumentFile(file);
    return newFile.data;
  }
  return {
    currentDocument,
    newDocumentFile,
  };
});
