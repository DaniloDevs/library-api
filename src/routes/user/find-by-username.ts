import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function FindUserByUsername(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get('/users/:slug', {
               schema: {
                    params: z.object({
                         slug: z.string()
                    })
               }
          }, async (request, reply) => {
               const { slug } = request.params

               const user = await prisma.users.findUnique({ where: { username: slug } })

               if (!user) return reply.status(400).send({ Message: "O username informado não existe" })

               return reply.status(200).send({
                    Message: "Foi possivel listar com sucesso o usuario",
                    User: user
               })
          })
}