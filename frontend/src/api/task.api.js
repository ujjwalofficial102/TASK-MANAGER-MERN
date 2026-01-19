import api from "./axios";

export const createTask = (data) => api.post("/tasks", data);

export const getTasks = ({ search = "", status = "", priority = "" } = {}) =>
  api.get(
    `/tasks?search=${encodeURIComponent(
      search
    )}&status=${status}&priority=${priority}`
  );

export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);
