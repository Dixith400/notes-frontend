const NoteForm = ({
  title,
  name,
  content,
  submitLabel,
  onNameChange,
  onContentChange,
  onSubmit,
  onCancel,
}) => (
  <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
    <h2 className="text-lg font-semibold text-stone-950">{title}</h2>

    <div className="mt-4 space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-950 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(event) => onContentChange(event.target.value)}
        className="min-h-32 w-full resize-y rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-950 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
        rows={4}
      />
    </div>

    <div className="mt-4 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onSubmit}
        className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
      >
        {submitLabel}
      </button>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-stone-200 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
        >
          Cancel
        </button>
      )}
    </div>
  </div>
);

export default NoteForm;
