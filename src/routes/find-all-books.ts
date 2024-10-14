import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";


export default async function FindAllBooks(server: FastifyInstance) {
     server.get("/book", async (request, reply) => {
          const { category, author } = request.query as { category: string, author: string }

          if (category) {
               const books = await prisma.book.findMany({ where: { category } })

               return reply.status(200).send({
                    Message: `Todos os livros da categoria ${category} foram listados com sucesso`,
                    Category: category,
                    Books: books
               })
          }

          if (author) {
               const books = await prisma.book.findMany({ where: { author } })

               return reply.status(200).send({
                    Message: `Todos os livros do author ${author} foram listados com sucesso`,
                    Author: author,
                    Books: books
               })
          }

          const books = await prisma.book.findMany()

          return reply.code(200).send({
               Message: "Todos os livros foram listados com sucesso",
               Books: books
          })
     })
}