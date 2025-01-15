import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { reservationRepository } from "../../repository/reservationRepository";
import { prisma } from "../../lib/prisma";

export async function FindAllReservertion(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get('/reservations', {
               schema: {
                    querystring: z.object({
                         username: z.string().optional(),
                         book: z.string().optional(),
                    }),
               },
          }, async (request, reply) => {
               const { username, book } = request.query;

               try {
                    // Construção do filtro
                    const filters: any = {};

                    // Adiciona o filtro pelo nome de usuário, se fornecido
                    if (username) {
                         const user = await prisma.users.findUnique({ where: { username } });

                         if (!user) {
                              return reply.status(400).send({
                                   Message: `Usuário "${username}" não existe.`,
                              });
                         }

                         filters.usersId = user.id;
                    }

                    // Adiciona o filtro pelo slug do livro, se fornecido
                    if (book) {
                         const bookRecord = await prisma.books.findUnique({ where: { slug: book } });

                         if (!bookRecord) {
                              return reply.status(400).send({
                                   Message: `Livro "${book}" não existe.`,
                              });
                         }

                         filters.booksId = bookRecord.id;
                    }

                    // Busca as reservas com base nos filtros
                    const Reservations = await reservationRepository.findAllByFilter(filters);

                    // Mensagem dinâmica baseada nos filtros
                    let Message = "Foi possível listar todas as reservas.";
                    if (username && book) {
                         Message = `Foi possível listar todas as reservas de "${username}" no livro "${book}".`;
                    } else if (username) {
                         Message = `Foi possível listar todas as reservas do usuário "${username}".`;
                    } else if (book) {
                         Message = `Foi possível listar todas as reservas do livro "${book}".`;
                    }

                    return reply.code(200).send({
                         Message,
                         Reservations,
                    });
               } catch (error) {
                    console.error("Erro ao buscar reservas:", error);
                    return reply.status(500).send({
                         Message: "Ocorreu um erro ao buscar as reservas.",
                    });
               }
          });
}
