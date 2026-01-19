import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createTask, deleteTask, getTasks, updateTask } from "../api/task.api";
import { getMe } from "../api/user.api";
import Alert from "../components/Alert";
import EditTaskModal from "../components/EditTaskModal";

export default function Dashboard() {
  const [me, setMe] = useState(null);

  const [tasks, setTasks] = useState([]);

  // create task form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  // filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  // ui states
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const fetchMe = async () => {
    try {
      const res = await getMe();
      setMe(res.data.user);
    } catch (err) {
      setError(err?.response?.data?.message || "failed to fetch profile");
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      clearMessages();

      const res = await getTasks({
        search,
        status,
        priority: filterPriority,
      });

      setTasks(res.data.tasks || []);
    } catch (err) {
      setError(err?.response?.data?.message || "failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!title.trim()) {
      setError("title is required");
      return;
    }

    try {
      setCreateLoading(true);
      await createTask({ title, description, priority });

      setTitle("");
      setDescription("");
      setPriority("medium");

      setSuccess("task created successfully");
      fetchTasks();
    } catch (err) {
      setError(err?.response?.data?.message || "failed to create task");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    clearMessages();

    const ok = window.confirm("delete this task?");
    if (!ok) return;

    try {
      await deleteTask(id);
      setSuccess("task deleted");
      fetchTasks();
    } catch (err) {
      setError(err?.response?.data?.message || "failed to delete task");
    }
  };

  const handleToggleStatus = async (task) => {
    clearMessages();

    try {
      const newStatus = task.status === "pending" ? "completed" : "pending";
      await updateTask(task._id, { status: newStatus });
      setSuccess("task updated");
      fetchTasks();
    } catch (err) {
      setError(err?.response?.data?.message || "failed to update task");
    }
  };

  const handleOpenEdit = (task) => {
    clearMessages();
    setSelectedTask(task);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedTask(null);
  };

  const handleSaveEdit = async (data) => {
    if (!selectedTask?._id) return;

    clearMessages();

    try {
      await updateTask(selectedTask._id, data);
      setSuccess("task updated successfully");
      handleCloseEdit();
      fetchTasks();
    } catch (err) {
      setError(err?.response?.data?.message || "failed to update task");
    }
  };

  const handleApplyFilters = () => {
    fetchTasks();
  };

  const handleClearFilters = async () => {
    clearMessages();

    setSearch("");
    setStatus("");
    setFilterPriority("");

    try {
      setLoading(true);
      const res = await getTasks({ search: "", status: "", priority: "" });
      setTasks(res.data.tasks || []);
      setSuccess("filters cleared");
    } catch (err) {
      setError(err?.response?.data?.message || "failed to refetch tasks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Top Card */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-xl font-bold">dashboard</h2>
          <p className="text-sm text-gray-600 mt-1">
            {me
              ? `logged in as ${me.name} (${me.email})`
              : "loading profile..."}
          </p>

          <div className="mt-4">
            <Alert type="error" message={error} />
            <div className="mt-2">
              <Alert type="success" message={success} />
            </div>
          </div>
        </div>

        {/* Create Task */}
        <div className="bg-white rounded-2xl shadow p-5 mt-6">
          <h3 className="font-semibold text-lg">create task</h3>

          <form onSubmit={handleCreateTask} className="mt-4 grid gap-3">
            <input
              className="border rounded-xl px-3 py-2"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="border rounded-xl px-3 py-2 min-h-22.5"
              placeholder="description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              className="border rounded-xl px-3 py-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>

            <button
              disabled={createLoading}
              className="bg-black text-white rounded-xl py-2 font-medium disabled:opacity-60"
            >
              {createLoading ? "adding..." : "add task"}
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow p-5 mt-6">
          <h3 className="font-semibold text-lg">search & filter</h3>

          <div className="mt-4 grid md:grid-cols-4 gap-3">
            <input
              className="border rounded-xl px-3 py-2"
              placeholder="search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border rounded-xl px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">all status</option>
              <option value="pending">pending</option>
              <option value="completed">completed</option>
            </select>

            <select
              className="border rounded-xl px-3 py-2"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">all priority</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>

            <button
              type="button"
              onClick={handleApplyFilters}
              className="bg-black text-white rounded-xl py-2 font-medium"
            >
              apply
            </button>

            <button
              type="button"
              onClick={handleClearFilters}
              className="md:col-span-4 border rounded-xl py-2 font-medium"
            >
              clear filters
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-2xl shadow p-5 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">your tasks</h3>
            <p className="text-sm text-gray-500">{tasks.length} tasks</p>
          </div>

          {loading ? (
            <p className="mt-4 text-gray-600">loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="mt-4 text-gray-600">no tasks found</p>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                >
                  <div>
                    <h4 className="font-semibold text-base">{task.title}</h4>

                    {task.description ? (
                      <p className="text-sm text-gray-600 mt-1">
                        {task.description}
                      </p>
                    ) : null}

                    <div className="flex gap-2 mt-2 text-xs">
                      <span className="px-2 py-1 rounded-full bg-gray-100">
                        {task.status}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-gray-100">
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleToggleStatus(task)}
                      className="border rounded-xl px-3 py-2 text-sm"
                    >
                      {task.status === "pending"
                        ? "mark completed"
                        : "mark pending"}
                    </button>

                    <button
                      onClick={() => handleOpenEdit(task)}
                      className="border rounded-xl px-3 py-2 text-sm"
                    >
                      edit
                    </button>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="border rounded-xl px-3 py-2 text-sm text-red-600"
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditTaskModal
        open={editOpen}
        task={selectedTask}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
