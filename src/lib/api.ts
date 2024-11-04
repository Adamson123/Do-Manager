import axios from "axios";

//http://localhost:3000
//console.log(window.location.origin, "lop");

const staticUrl = "http://localhost:3000/api";
const dynamicUrl = globalThis.window
  ? window.location.origin + "/api"
  : staticUrl;

const api = axios.create({
  baseURL: dynamicUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
