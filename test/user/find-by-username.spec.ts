import { describe, expect, test } from 'vitest'
import server from '../../src/server'


describe('User Routes', () => {
     describe('Find User By Username Routes', () => {
          test('Deve ser possivel listar um usuario pelo username', async () => {
               const response = await server.inject({
                    method: 'GET',
                    url: '/users/danidani',
               })

               const { Message, User } = JSON.parse(response.body)

               expect(response.statusCode).toBe(200)
               expect(Message).toBe(`Foi possivel listar com sucesso o usuario`)
               expect(User.name).toBe('Danilo Romão')
          })

          test('Deve ser possivel listar um usuario pelo username', async () => {

               const response = await server.inject({
                    method: 'GET',
                    url: '/users/mu',
               })

               const { Message } = JSON.parse(response.body)

               expect(response.statusCode).toBe(400)
               expect(Message).toBe(`O username informado não existe`)
          })

     })
})