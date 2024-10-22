"use client";
import axios from "axios";

//http://localhost:3000
//console.log(window.location.origin, "lop");

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
