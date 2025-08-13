import axios from "axios";

const api = axios.create({
  baseURL: "https://productmanagement-6y49.onrender.com/api",
});

export default api;
