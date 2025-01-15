import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { reservationRepository } from "../../repository/reservationRepository";

// adicionar status como query
export async function FindAllReservertion(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get('/reservations', {
               schema: {
                    querystring: z.object({
                         username: z.string().optional(),
                         book: z.string().optional(),
                    })
               }
          }, async (request, reply) => {
               const { username, book } = request.query

               const filters: any = {};
               let Message = "Foi possível listar todas as reservas.";

               if (username) {
                    const existUsername = await prisma.users.findUnique({ where: { username } });

                    if (!existUsername) return reply.status(400).send({ Message: `O usuario "${username}" não existe.` })

                    filters.username = { username: username };
                    Message = `Foi possível listar todas as reservas do usuario "${username}".`;
               }

               if (book) {
                    const existBook = await prisma.books.findUnique({ where: { slug: book } });

                    if (!existBook) return reply.status(400).send({ Message: `O livro "${book}" não existe.` });

                    filters.book = { slug: book };
                    Message = `Foi possível listar todas as reservas do livro "${book}".`;
               }


               if (book && username) {
                    Message = `Foi possível listar todas as reservas de ${username} no livro "${book}" .`
               }

               const Reservations = await reservationRepository.findAllByFilter(filters)

               return reply.code(200).send({
                    Message,
                    Reservations,
               });
          })
}