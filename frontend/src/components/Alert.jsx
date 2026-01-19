export default function Alert({ type = "error", message }) {
  if (!message) return null;

  const base = "p-3 rounded-xl text-sm";
  const styles =
    type === "success"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return <div className={`${base} ${styles}`}>{message}</div>;
}
