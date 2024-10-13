import { Book } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";


export default async function CreateBook(server: FastifyInstance) {
     server.get("/book", async (request, reply) => {
          const { title, category, author, rating, reserved } = request.body as Book

          const existBook = await prisma.book.findUnique({ where: { title } })

          if (existBook) {
               return reply.status(401).send({
                    Message: "Ja existe um livro com esse nome"
               })
          }

          const book = await prisma.book.create({
               data: {
                    title,
                    category,
                    author,
                    rating,
                    reserved
               }
          })

          return reply.status(201).send({
               Message: `O livro ${book.title} foi criado com sucesso`,
               Book: book
          })
     })
}