import { describe, expect, test } from 'vitest'
import server from '../../src/server'


describe('Reservation Routes', async () => {
     describe('Find All Rersevation Routes', () => {
          test('Deve ser poissivel listar todos os livros', async () => {
               const response = await server.inject({
                    method: 'GET',
                    url: '/reservations',
               })

               const { Message, Reservations } = JSON.parse(response.body)

               expect(Message).toBe("Foi possível listar todas as reservas.")
               expect(Reservations[0]).toBeDefined()
          })
     })
})