import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";


export default async function FindBookById(server: FastifyInstance) {
     server.get("/book/:id", async (request, reply) => {
          const { id } = request.params as { id: string }

          const book = await prisma.book.findUnique({ where: { id } })

          if(!book) {
               return reply.code(400).send({
                    Message: "Não foi encontrado nenhum livro com o ID informado"
               })
          }

          return reply.code(200).send({
               Message: `O livro ${book.title} foi encontrado com sucesso`,
               Book: book
          })
     })
}