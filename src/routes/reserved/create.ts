import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat'

dayjs.locale('pt-br')
dayjs.extend(LocalizedFormat)

export async function CreateReservation(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post('/reservations', {
               schema: {
                    body: z.object({
                         bookId: z.string(),
                         userId: z.string(),
                         expiresAt: z.coerce.date()
                    })
               }
          }, async (request, reply) => {
               const { bookId, userId, expiresAt } = request.body

               if (dayjs(expiresAt).isBefore(new Date())) {
                    return reply.status(400).send({ Message: "O livro deve ser reservado ate uma data maior que hoje" })
               }

               const [book, user] = await prisma.$transaction([
                    prisma.books.findUnique({ where: { id: bookId } }),
                    prisma.users.findUnique({ where: { id: userId } }),
               ])

               if (!book) return reply.status(400).send({ Message: "O livro informado não existe" })
               if (!user) return reply.status(400).send({ Message: "O usuario informado não existe" })

               if (book.status === "RESERVED") return reply.status(400).send({ Message: "Não e possivel reservar esse livro, pois outro usuario já o reservou" })

               const [reserved] = await prisma.$transaction([
                    prisma.reservations.create({
                         data: {
                              expiresAt,
                              status: "ACTIVE",
                              Users: {
                                   connect: { id: userId }
                              },
                              Books: {
                                   connect: {
                                        id: bookId,
                                   },

                              }
                         },
                    }),
                    prisma.books.update({
                         where: { id: bookId },
                         data: { status: "RESERVED" }
                    })
               ])
               const formattedExpiresDate = dayjs(expiresAt).format('LL')
               return reply.status(201).send({
                    Message: `Foi possivel reservar com sucesso o livro ${book.title} ate a data ${formattedExpiresDate}`,
                    ReservedId: reserved.id,
               })
          })
}