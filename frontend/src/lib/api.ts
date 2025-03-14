import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080", // URL da API Fastify
  timeout: 5000, // Tempo máximo da requisição
  headers: { "Content-Type": "application/json" },
});
