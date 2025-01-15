import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { userRepository } from "../../repository/userRepository";

export async function CreateUser(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post('/users', {
               schema: {
                    body: z.object({
                         name: z
                              .string(),
                         email: z.string().email(),
                         password: z.string(),
                         username: z.string().toLowerCase()
                    })
               }
          }, async (request, reply) => {
               const data = request.body

               const [existEmail, existUsername] = await prisma.$transaction([
                    prisma.users.findUnique({ where: { email: data.email } }),
                    prisma.users.findUnique({ where: { username: data.username } }),
               ])

               if (existEmail) return reply.status(400).send({ Message: "Esse email já esta sendo utilizado" })
               if (existUsername) return reply.status(400).send({ Message: "Esse username já esta sendo utilizado" })


               const user = await userRepository.create(data)

               return reply.status(201).send({
                    Message: "O usuario foi criado com sucesso",
                    UserId: user.id
               })
          })
}