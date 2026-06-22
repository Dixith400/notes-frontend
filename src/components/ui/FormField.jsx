const FormField = ({ label, ...inputProps }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-stone-700">{label}</span>
    <input
      {...inputProps}
      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-950 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
    />
  </label>
);

export default FormField;
