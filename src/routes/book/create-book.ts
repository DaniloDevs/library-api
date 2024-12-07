import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from '../../lib/prisma';
import { CreateSlug } from '../../utils/create-slug';


export async function CreateBook(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post('/create-book', {
               schema: {
                    body: z.object({
                         title: z.string(),
                         author: z.string().min(3),
                         category: z.string().min(3),
                         ISBN: z.string().min(3),
                         isValid: z.boolean().optional(),
                         rating: z.coerce.number().int(),
                    })
               }
          }, async (request, reply) => {
               const { title, author, category, ISBN, rating, isValid } = request.body

               const existBook = await prisma.books.findUnique({ where: { ISBN } })

               if (existBook) return reply.code(401).send({ Message: "O livro cadastrado ja existe no sistema" })

               const book = await prisma.books.create({
                    data: {
                         title,
                         slug: CreateSlug(title),
                         author,
                         category,
                         ISBN,
                         rating,
                         isValid
                    }
               })

               return reply.code(201).send({
                    Message: `O livro ${title} foi cadastrado com sucesso!`,
                    Book: book
               })
          })
}