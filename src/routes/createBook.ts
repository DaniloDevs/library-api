import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export default async function CreateBook(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post('/book', {
               schema: {
                    body: z.object({
                         title: z.string(),
                         author: z.string(),
                         category: z.string(),
                         ISBN: z.string(),
                         rating: z.number().int(),
                    })
               }
          }, async (request, reply) => {
               const { title, author, category, ISBN, rating } = request.body

               const existBook = await prisma.books.findUnique({ where: { title } })

               if (existBook) { return reply.code(401).send({ Message: "Livro ja existe" }) }

               const book = await prisma.books.create({
                    data: { title, author, category, ISBN, rating }
               })

               return reply.code(201).send({
                    Message: 'Foi possivel criar o livro com sucesso',
                    Book: book
               })
          })
}