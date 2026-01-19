import { useEffect, useState } from "react";

export default function EditTaskModal({ open, onClose, task, onSave }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        status: task.status || "pending",
      });
    }
  }, [task]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("title is required");
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">edit task</h3>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg border hover:bg-gray-100"
          >
            close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <input
            className="border rounded-xl px-3 py-2"
            placeholder="title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            className="border rounded-xl px-3 py-2 min-h-22.5"
            placeholder="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <select
            className="border rounded-xl px-3 py-2"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>

          <select
            className="border rounded-xl px-3 py-2"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>

          <button className="bg-black text-white rounded-xl py-2 font-medium">
            save changes
          </button>
        </form>
      </div>
    </div>
  );
}
