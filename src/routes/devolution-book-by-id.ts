import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"

export default async function DevolutionBookById(server: FastifyInstance) {
     server.post("/book/:id/devolution", async (request, reply) => {
          const { id } = request.params as { id: string }

          const book = await prisma.book.findUnique({ where: { id } })

          if (!book) {
               return reply.code(400).send({
                    Message: `Não foi achado nenhum livro com o id - ${id}`,
               })
          }

          if (!book.reserved) {
               return reply.code(400).send({
                    Message: `O livro ${book?.name} esta disponivel para reserva`,
               })
          }

          await prisma.book.update({
               where: { id },
               data: {
                    reserved: false
               }
          })

          return reply.code(200).send({
               Message: `O livro ${book?.name} foi devolvido com sucesso`,
          })
     })
}