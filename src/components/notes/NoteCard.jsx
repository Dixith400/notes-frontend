import NoteForm from "./NoteForm";

const NoteCard = ({
  note,
  isEditing,
  editName,
  editContent,
  onEditNameChange,
  onEditContentChange,
  onStartEdit,
  onCancelEdit,
  onSave,
  onDelete,
}) => {
  if (isEditing) {
    return (
      <NoteForm
        title="Edit note"
        name={editName}
        content={editContent}
        submitLabel="Save"
        onNameChange={onEditNameChange}
        onContentChange={onEditContentChange}
        onSubmit={onSave}
        onCancel={onCancelEdit}
      />
    );
  }

  return (
    <article className="flex min-h-52 flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex-1">
        <h2 className="break-words text-lg font-semibold text-stone-950">
          {note.name}
        </h2>
        <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-stone-600">
          {note.content}
        </p>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={onStartEdit}
          className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-amber-300"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default NoteCard;
