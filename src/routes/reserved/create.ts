import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import 'dayjs/locale/pt-br';
import { reservationRepository } from "../../repository/reservationRepository";
import FormatDate from "../../utils/format-date";


export async function CreateReservation(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post('/reservations', {
               schema: {
                    body: z.object({
                         bookId: z.string(),
                         userId: z.string(),
                    })
               }
          }, async (request, reply) => {
               const data = request.body

               const [book, user] = await prisma.$transaction([
                    prisma.books.findUnique({ where: { id: data.bookId } }),
                    prisma.users.findUnique({ where: { id: data.userId } }),
               ])

               if (!book) return reply.status(400).send({ Message: "O livro informado não existe" })
               if (!user) return reply.status(400).send({ Message: "O usuario informado não existe" })

               if (book.status === "RESERVED") return reply.status(400).send({ Message: "Não e possivel reservar esse livro, pois outro usuario já o reservou" })

               const reserved = await reservationRepository.create(data)

               const formattedExpiresDate = FormatDate(reserved.expiresAt) 
               
               return reply.status(201).send({
                    Message: `Foi possível realizar a reserva com sucesso para o livro "${book.title}". Sua reserva é válida até ${formattedExpiresDate}.`,
                    LoanCode: reserved.loanCode,
                    ReservedId: reserved.id,
               })
          })
}