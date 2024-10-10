import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { Book } from "@prisma/client";


export default async function CreateBook(server: FastifyInstance) {
     server.post("/book", async (request, reply) => {
          const { name, author, category } = request.body as Book

          const book = await prisma.book.create({
               data: {
                    name,
                    author,
                    category,
                    reserved: false
               }
          })

          return reply.code(201).send({
               Message: `O livro ${book?.name} foi criado com sucesso`,
               Book: book
          })
     })
}