import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";

interface UserInterface {
  name: string;
  email: string;
  status: boolean;
}

export async function routes(app: FastifyInstance) {
  app.get("/users", async (_, reply) => {
    return reply.status(200).send(
      await prisma.user.findMany({
        orderBy: {
          id: "desc",
        },
      })
    );
  });

  app.post("/users", async (request, reply) => {
    const { name, email, status } = request.body as UserInterface;

    if (!name || !email) {
      return reply
        .status(400)
        .send({ error: "Todos os campos são obrigatórios" });
    }

    try {
      const emailUnico = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (emailUnico) {
        return reply
          .status(409)
          .send({ error: "Este email já está registrado" });
      }

      const createUser = await prisma.user.create({
        data: {
          name,
          email,
          status: status ?? true,
        },
      });

      return reply.status(201).send(createUser);
    } catch (err) {
      return reply.status(500).send({ error: "Erro ao criar usuário" });
    }
  });

  app.delete("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const DeleteUser = await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });

      return reply
        .status(200)
        .send({ message: "Usuário deletado com sucesso", DeleteUser });
    } catch (err) {
      return reply.status(500).send({ error: "Erro ao deletar usuário" });
    }
  });
}
