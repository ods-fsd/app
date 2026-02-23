import axios from "axios";

export const nextServer = axios.create({
  baseURL: "http://localhost:3000", // Адреса твого бекенду (підстав свою, якщо інша)
  withCredentials: true,
});

export const api = nextServer;
