import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat';
import { prisma } from "../../lib/prisma";

dayjs.locale('pt-br')
dayjs.extend(LocalizedFormat)
export default async function CreateLoan(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post('/loan', {
               schema: {
                    body: z.object({
                         code: z.string(),
                         loanAt: z.coerce.date()
                    })
               }
          }, async (request, reply) => {
               const { code, loanAt } = request.body

               const reserved = await prisma.reservations.findFirst({ where: { loanCode: code } })
               if (!reserved) reply.status(400).send({ Message: "Você não pode pegar um livro sem um codigo de reserva." })

               if (dayjs(reserved?.expiresAt).isBefore(loanAt)) return reply.status(400).send({ Message: "Você não pode pegar um livro sem uma reserva valida, sua reserva jã expirou" })

              await prisma.$transaction([
                    prisma.loans.create({
                         data: {
                              code,
                              Books: { connect: { id: reserved?.booksId as string } },
                              Users: { connect: { id: reserved?.usersId as string } },
                              Reservations: { connect: { id: reserved?.id as string } }
                         }
                    }),
                    prisma.books.update({
                         where: { id: reserved?.booksId as string },
                         data: { status: "BORROWED" }
                    })
               ])

               return reply.status(201).send({ Message: "O emprestimo foi realizado com sucesso!" })
          })
}