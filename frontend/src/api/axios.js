import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-mern-4znz.onrender.com/api", // "http://localhost:3000/api"
  withCredentials: true,
});

export default api;
