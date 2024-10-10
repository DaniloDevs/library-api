import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";


export default async function FindBooks(server: FastifyInstance) {
     server.get("/book", async (request, reply) => {
          const books = await prisma.book.findMany()
          
          const { author, category } = request.query as { author: string, category: string }

          if (author) {
               return reply.code(200).send({
                    Message: `Todos os livros do autor ${author} foram listados com suceso`,
                    Books: books
               })
          }

          if (category) {
               return reply.code(200).send({
                    Message: `Todos os livros da categoria ${category} foram listados com suceso`,
                    Books: books
               })
          }

          return reply.code(200).send({
               Message: "Todos os livros foram retornados com sucesso",
               Books: books
          })
     })
}