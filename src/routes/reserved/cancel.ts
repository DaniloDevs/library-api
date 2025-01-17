import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { reservationRepository } from "../../repository/reservationRepository";


export async function CancelReservertion(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .delete('/reservations/:reservationId', {
               schema: {
                    params: z.object({
                         reservationId: z.string()
                    })
               }
          }, async (request, reply) => {
               const { reservationId } = request.params

               const existReserverd = await prisma.reservations.findUnique({ where: { id: reservationId } })

               if (!existReserverd) return reply.status(400).send({ Message: "O ID informado não refere a nenhuma reservar do sistema" })

               if (existReserverd.status === "CANCELLED") return reply.status(400).send({
                    Message: "A reserva do ID informado já foi cancelada"
               })

               await reservationRepository.cancel(reservationId)

               return reply.status(200).send({
                    Message: "O cancelamento da reservar foi feito com sucesso",
                    ReservationId: existReserverd.id
               })
          })
}