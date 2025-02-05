import http from "../axios";
export function createNewDocumentFile(file: File) {
  const newFile = new FormData();
  newFile.append("file", file); // 'file' ต้องตรงกับ Controller
  return http.post("/documents/upload", newFile, {
    headers: {
      "Content-Type": "multipart/form-data; charset=UTF-8",
    },
  });
}
export default {
  createNewDocumentFile,
};
