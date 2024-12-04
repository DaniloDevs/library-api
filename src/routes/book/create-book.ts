import { Books } from './../../../node_modules/.pnpm/@prisma+client@5.20.0_prisma@5.20.0/node_modules/.prisma/client/index.d';
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z, { isValid } from "zod";
import { prisma } from '../../lib/prisma';


export async function CreateBook(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post('/create-book', {
               schema: {
                    body: z.object({
                         title: z.string(),
                         author: z.string(),
                         category: z.string(),
                         ISBN: z.string(),
                         isValid: z.boolean().optional(),
                         rating: z.coerce.number(),
                    })
               }
          }, async (request, reply) => {
               const { title, author, category, ISBN, rating, isValid } = request.body

               const existBook = await prisma.books.findUnique({ where: { ISBN } })

               if (existBook) return reply.code(401).send({ Message: "O livro cadastrado ja existe no sistema" })

               const book = await prisma.books.create({
                    data: {
                         title, author, category, ISBN, rating, isValid
                    }
               })

               return reply.code(201).send({
                    Message: `O livro ${title} foi cadastrado com sucesso!`,
                    Book: book
               })
          })
}