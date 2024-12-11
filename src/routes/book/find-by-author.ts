

import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { CreateSlug } from "../../utils/create-slug";


export async function FindBookByAuthor(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get('/book/author/:author', {
               schema: {
                    params: z.object({
                         author: z.string().toLowerCase()
                    })
               }
          }, async (request, reply) => {
               const { author } = request.params

               const [authors, books] = await prisma.$transaction([
                    prisma.authors.findUnique({ where: { slug: CreateSlug(author) } }),
                    prisma.books.findMany({
                         where: { author: { slug: CreateSlug(author) } },
                         select: {
                              title: true,
                              rating: true,
                              reserved: true,
                              ISBN: true,
                              category: { select: { name: true } },
                              author: { select: { name: true } }
                         }
                    })
               ])

               if (!authors) return reply.code(401).send({ Message: 'O autor informada não existe' })


               return reply.code(200).send({
                    Message: 'Foi possivel listar todos os livros desse autor',
                    Books: books.map(book => {
                         return {
                              title: book.title,
                              rating: book.rating,
                              reserved: book.reserved,
                              category: book.category.name,
                              author: book.author.name,
                              ISBN: book.ISBN,
                         }
                    })

               })
          })
}