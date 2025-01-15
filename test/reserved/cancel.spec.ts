import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../src/lib/prisma'
import server from '../../src/server'


describe('Reservation Routes', async () => {
     describe('Cancel Reservation Routes', async () => {
          afterAll(async () => {
               await prisma.reservations.update({
                    where: { id: reservationId },
                    data: {
                         status: 'ACTIVE',
                         Books: {
                              update: {
                                   status: 'RESERVED'
                              }
                         }
                    }
               })
          })

          const res = await server.inject({
               method: 'GET',
               url: '/reservations',
          })

          const { Reservations } = JSON.parse(res.body)

          const reservationId = Reservations[0].id

          test('Deve ser possivel poder cancelar a reservar de um livro', async () => {
               const response = await server.inject({
                    method: 'DELETE',
                    url: `/reservations/${reservationId}`,
               })
               const { Message } = JSON.parse(response.body)

               expect(Message).toBe("O cancelamento da reservar foi feito com sucesso")
               expect(response.statusCode).toBe(200)
          })

          test('Não deve ser possivel poder cancelar uma reserva já cancelada', async () => {
               const response = await server.inject({
                    method: 'DELETE',
                    url: `/reservations/${reservationId}`,
               })
               const { Message } = JSON.parse(response.body)

               expect(Message).toBe("A reserva do ID informado já foi cancelada")
               expect(response.statusCode).toBe(400)
          })

          test('Não deve ser possivel poder cancelar uma reserva que não existe', async () => {
               const response = await server.inject({
                    method: 'DELETE',
                    url: `/reservations/36780413-3410413`,
               })
               const { Message } = JSON.parse(response.body)

               expect(Message).toBe("O ID informado não refere a nenhuma reservar do sistema")
               expect(response.statusCode).toBe(400)
          })
     })
})