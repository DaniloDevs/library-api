import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";


export async function FindBookByCategory(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get('/book/category/:category', {
               schema: {
                    params: z.object({
                         category: z.string()
                    })
               }
          }, async (request, reply) => {
               const { category } = request.params

               const [categorys, books] = await prisma.$transaction([
                    prisma.categorys.findUnique({ where: { slug: category } }),
                    prisma.books.findMany({
                         where: { category: { slug: category } },
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

               if (!categorys) return reply.code(401).send({ Message: 'A categoria informada não existe', category })


               return reply.code(200).send({
                    Message: 'Foi possivel listar todos os livros dessa categoria',
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