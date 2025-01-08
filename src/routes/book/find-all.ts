import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import z from "zod";

export async function FindAllBooks(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get('/books', {
               schema: {
                    querystring: z.object({
                         category: z.string().optional(),
                         author: z.string().optional(),
                    }),
               },
          }, async (request, reply) => {
               const { category, author } = request.query;

               const filters: any = {};
               let Message = "Foi possível listar todos os livros.";


               if (category) {
                    const existCategory = await prisma.categorys.findUnique({ where: { slug: category } });

                    if (!existCategory) {
                         return reply.status(400).send({
                              Message: `A categoria "${category}" informada não existe.`
                         });
                    }

                    filters.category = { slug: category };
                    Message = `Foi possível listar todos os livros da categoria "${category}".`;
               }

               if (author) {
                    const existAuthor = await prisma.authors.findUnique({ where: { slug: author }, });

                    if (!existAuthor) {
                         return reply.status(400).send({
                              Message: `O autor "${author}" informado não existe.`,
                         });
                    }

                    filters.author = { slug: author };
                    Message = `Foi possível listar todos os livros do autor "${author}".`;
               }

               if (category && author) {
                    Message = `Foi possível listar todos os livros do autor "${author}" na categoria "${category}".`;
               }

               // Consulta ao banco com os filtros aplicados
               const Books = await prisma.books.findMany({
                    where: filters,
               });

               return reply.code(200).send({
                    Message,
                    Books,
               });

          });
}
