import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { reservationRepository } from "../../repository/reservationRepository";


export async function FindReservertionById(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get('/reservations/:reservationId', {
               schema: {
                    params: z.object({
                         reservationId: z.string()
                    })
               }
          }, async (request, reply) => {
               const { reservationId } = request.params

               const Reservation = await reservationRepository.findById(reservationId)

               if (!Reservation) return reply.status(400).send({ Message: "O ID informado não corresponde a nenhuma reserva" })

               return reply.status(200).send({
                    Message: "Foi possivel listar a reserva com sucesso!",
                    Reservation
               })
          })
}