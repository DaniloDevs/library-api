import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";


export async function FindBookBySlug(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get('/book/:slug', {
               schema: {
                    params: z.object({
                         slug: z.string()
                    })
               }
          }, async (request, reply) => {
               const { slug } = request.params

               const book = await prisma.books.findUnique({ where: { slug } })

               if(!book) return reply.code(401).send({Message: 'Não foi possivel encontrar um livro com essa slug'})

               return reply.code(200).send({
                    Message: "Foi possivel retornar o livro com sucesso!",
                    Book: book
               })
          })
}