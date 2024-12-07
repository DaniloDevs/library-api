import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function LoginUser(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post('/login', {
               schema: {
                    body: z.object({
                         email: z.string().email()
                    })
               }
          }, async (request, reply) => {
               const { email } = request.body

               const user = await prisma.users.findUnique({ where: { email } })

               if (!user) return reply.code(401).send({ Message: "Não existe nenhum usuario com esse email" })

               const token = await server.jwt.sign({ email })

               return reply
                    .setCookie('token', token, {
                         path: '/',
                         secure: true,
                         httpOnly: true,
                    })
                    .code(200)
                    .send({
                         Message: 'Você esta logado com sucesso'
                    })

          })
}