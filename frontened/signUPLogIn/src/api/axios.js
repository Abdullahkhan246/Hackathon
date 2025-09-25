import axios from "axios";   // sirf package import karo

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export default api;
