import { describe, expect, test } from 'vitest'
import server from '../../src/server'


describe('Reservation Routes', async () => {
     describe('Filter Reservations by Book', async () => {
          test('Deve ser poissivel listar todos os livros de um usuário com um filtro valido', async () => {
               const response = await server.inject({
                    method: 'GET',
                    url: '/reservations?book=ihelp-front',
               })

               const { Message, Reservations } = JSON.parse(response.body)

               expect(response.statusCode).toBe(200)
               expect(Message).toBe(`Foi possível listar todas as reservas do livro "ihelp-front".`)
               expect(Reservations[0]).toBeDefined()
          })

          test('Não deve ser poissivel listar todos os livros de um usuário com um filtro invalido', async () => {
               const response = await server.inject({
                    method: 'GET',
                    url: '/reservations?book=uri',
               })

               const { Message, Reservations } = JSON.parse(response.body)

               expect(response.statusCode).toBe(400)
               expect(Message).toBe(`Livro "uri" não existe.`)
          })
     })
})