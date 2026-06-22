import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "./notes/NoteCard";
import NoteForm from "./notes/NoteForm";
import { notesService } from "../services/notesService";
import { tokenStorage } from "../utils/tokenStorage";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();

  // Load notes for the logged-in user before rendering the grid.
  async function fetchNotes() {
    const data = await notesService.list();
    setNotes(data);
  }

  useEffect(() => {
    notesService.list().then((data) => {
      setNotes(data);
    });
  }, []);

  const logout = () => {
    tokenStorage.clear();
    navigate("/login");
  };

  // Create, update, and delete all refresh the list to keep UI state simple.
  const createNote = async () => {
    await notesService.create({ name, content });
    await fetchNotes();
    setContent("");
    setName("");
  };

  const updateNote = async () => {
    await notesService.update(editId, { name: editName, content: editContent });
    setEditId(null);
    await fetchNotes();
  };

  const deleteNote = async (noteId) => {
    await notesService.delete(noteId);
    await fetchNotes();
  };

  const startEdit = (note) => {
    setEditId(note._id);
    setEditName(note.name);
    setEditContent(note.content);
  };

  return (
    <main className="min-h-screen bg-[#f4f0e8] px-4 py-6 text-stone-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Workspace
            </p>
            <h1 className="mt-1 text-3xl font-bold">My Notes</h1>
          </div>
          <button
            onClick={logout}
            className="w-full rounded-xl bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 sm:w-auto"
          >
            Logout
          </button>
        </header>

        <NoteForm
          title="Create a note"
          name={name}
          content={content}
          submitLabel="Create Note"
          onNameChange={setName}
          onContentChange={setContent}
          onSubmit={createNote}
        />

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              isEditing={editId === note._id}
              editName={editName}
              editContent={editContent}
              onEditNameChange={setEditName}
              onEditContentChange={setEditContent}
              onSave={updateNote}
              onCancelEdit={() => setEditId(null)}
              onStartEdit={() => startEdit(note)}
              onDelete={() => deleteNote(note._id)}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Notes;
