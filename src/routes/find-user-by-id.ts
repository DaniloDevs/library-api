import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export default async function FindUserById(server: FastifyInstance) {
     server.get('/user/:id', async (request, reply) => {
          const { id } = request.params as { id: string }

          const user = await prisma.user.findUnique({ where: { id } })

          if (!user) {
               return reply.status(400).send({
                    Message: "Não foi encontrado nenhum usuario com o ID informado"
               })
          }

          return reply.status(200).send({
               Message: `Foi possivel listar o usuario ${user.name}`,
               User: user
          })
     })
}