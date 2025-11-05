import axios from "axios";   // sirf package import karo

const api = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "http://hackathon-production-27d1.up.railway.app",
});

export default api;
