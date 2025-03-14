import fastify from "fastify";
import { routes } from "./routes";
import fastifyCors from "@fastify/cors";

const app = fastify();

app.register(fastifyCors, {
  origin: "http://localhost:3000", // Permite apenas a URL do seu front-end (ex: Next.js rodando em http://localhost:3000)
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  credentials: true, // Permite enviar cookies junto com a requisição
});

app.register(routes);

app
  .listen({
    port: 8080,
  })
  .then(() => console.log("Servidor rodando na porta http://localhost:8080 🚀"))
  .catch((err) => {
    console.error("Error ao criar servidor ❌", err);
  });
