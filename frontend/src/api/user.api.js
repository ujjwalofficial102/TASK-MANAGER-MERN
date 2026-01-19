import api from "./axios";

export const getMe = () => api.get("/user/me");
export const updateMe = (data) => api.put("/user/update", data);
