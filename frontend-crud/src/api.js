import axios from "axios";

const baseURL = "http://localhost:8000";

const api = axios.create({
    baseURL,
});

export const getUsers = () => api.get("/");
export const getUser = (id) => api.get(`/getUser/${id}`);
export const updateUser = (id, data) => api.put(`/updateUser/${id}`, data);
export const deleteUser = (id) => api.delete(`/deleteUser/${id}`);
export const createUser = (data) => api.post("/createUser", data);

export default api;
