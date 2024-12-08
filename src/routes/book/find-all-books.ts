import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";


export async function FindAllBooks(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get('/book', async (request, reply) => {
               const books = await prisma.books.findMany()

               if (books.length === 0) return reply.send({ Message: "Não existe nenhum livro para retorna!" })

               return reply.code(200).send({
                    Message: "Todos os livros foram retornados com sucesso",
                    Books: books
               })
          })
}