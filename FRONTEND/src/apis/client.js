// src/apis/client.js
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000/api", // /api lagana na bhulo agar backend me prefix hai
  withCredentials: true, // 👈 cookie automatically send hogi
});

export default client;
