import { describe, expect, test } from 'vitest'
import server from '../../src/server'


describe('Find Reservation By Id Routes', async () => {
     const res = await server.inject({
          method: 'GET',
          url: '/reservations',
     })

     const { Reservations } = JSON.parse(res.body)
     const reservationId = Reservations[0].id

     test('Deve ser possivel poder listar uma reservar por um ID ', async () => {
          const response = await server.inject({
               method: 'GET',
               url: `/reservations/${reservationId}`,
          })
          const { Message, Reservation } = JSON.parse(response.body)

          expect(Message).toBe("Foi possivel listar a reserva com sucesso!")
          expect(response.statusCode).toBe(200)
          expect(Reservation.id).toBe(reservationId)
     })

     test('Não deve ser possivel poder listar uma reservar que não existe', async () => {
          const response = await server.inject({
               method: 'GET',
               url: `/reservations/001010`,
          })
          const { Message } = JSON.parse(response.body)

          expect(Message).toBe("O ID informado não corresponde a nenhuma reserva")
          expect(response.statusCode).toBe(400)
     })
})