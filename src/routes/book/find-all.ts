import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";


export async function FindAllBooks(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get('/books', async (request, reply) => {
               const books = await prisma.books.findMany()


               return reply.code(200).send({
                    Message: "Todos os livros foram retornados com sucesso",
                    Books: books
               })
          })
}