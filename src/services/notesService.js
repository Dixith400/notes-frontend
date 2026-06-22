import { apiClient } from "./apiClient";

class NotesService {
  list() {
    return apiClient.request("/notes");
  }

  create(note) {
    return apiClient.request("/notes", {
      method: "POST",
      body: JSON.stringify(note),
    });
  }

  update(noteId, note) {
    return apiClient.request(`/notes/${noteId}`, {
      method: "PUT",
      body: JSON.stringify(note),
    });
  }

  delete(noteId) {
    return apiClient.request(`/notes/${noteId}`, {
      method: "DELETE",
    });
  }
}

export const notesService = new NotesService();
