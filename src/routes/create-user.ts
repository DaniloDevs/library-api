import { User } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';


export default async function CreateUser(server: FastifyInstance) {
     server.post("/user", async (request, reply) => {
          const { name, email } = request.body as User

          const existUser = await prisma.user.findUnique({ where: { email } })

          if (existUser) {
               return reply.status(400).send({ Message: "Ja exsite um usuario com esse email" })
          }

          const user = await prisma.user.create({
               data: {
                    name,
                    email
               }
          })

          return reply.status(201).send({
               Message: "Usuario criado com suucesso",
               User: user
          })
     })
}