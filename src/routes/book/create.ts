import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from '../../lib/prisma';
import { CreateSlug } from '../../utils/create-slug';
import { bookRespository } from "../../repository/bookRepository";


export async function CreateBook(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post('/books', {
               schema: {
                    body: z.object({
                         title: z.string(),
                         author: z.string().min(3),
                         category: z.string().min(3),
                         ISBN: z.string().min(3),
                         rating: z.coerce.number().int(),
                    })
               }
          }, async (request, reply) => {
               const data = request.body

               const existBook = await prisma.books.findUnique({ where: { ISBN: data.ISBN } })

               if (existBook) return reply.code(401).send({ Message: "O livro cadastrado ja existe no sistema" })

               const book = await bookRespository.create(data)

               return reply.code(201).send({
                    Message: `O livro ${data.title} foi cadastrado com sucesso!`,
                    Book: book
               })
          })
}