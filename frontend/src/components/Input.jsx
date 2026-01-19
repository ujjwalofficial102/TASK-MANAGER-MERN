export default function Input({ label, type = "text", value, onChange, name }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
        type={type}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
}
