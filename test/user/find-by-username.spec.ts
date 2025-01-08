import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../src/lib/prisma'
import server from '../../src/server'


describe('Find User By Username Routes', () => {
     afterAll(async () => {
          await prisma.$transaction([
               prisma.users.deleteMany({ where: { email: 'ihelp-front' } }),
          ])
     })

     test('Deve ser possivel listar um usuario pelo username', async () => {
         await server.inject({
               method: 'POST',
               url: '/users',
               body: {
                    name: 'Murilo Romão',
                    email: 'Murilo.exp@gmail.com',
                    password: '123',
                    username: 'mumumu',
               }
          })

          const response = await server.inject({
               method: 'GET',
               url: '/users/mumumu',
          })

          const { Message, User } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`Foi possivel listar com sucesso o usuario`)
          expect(User.name).toBe('Murilo Romão')
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