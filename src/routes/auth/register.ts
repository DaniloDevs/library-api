import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";


export async function RegisterUser(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post('/register', {
               schema: {
                    body: z.object({
                         name: z.string().min(3),
                         email: z.string().email(),
                         isValid: z.boolean().optional()
                    })
               }
          }, async (request, reply) => {
               const { name, email, isValid } = request.body

               const existUser = await prisma.users.findUnique({ where: { email } })

               if (existUser) return reply.code(401).send({ Message: 'O email escolhido já esta cadastrado' })

               await prisma.users.create({ data: { name, email, isValid } })

               return reply.code(201).send({ Message: 'Foi possivel se cadastrar com sucesso!' })
          })
}