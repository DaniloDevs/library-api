import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../src/lib/prisma'
import server from '../../src/server'


describe('User Routes', () => {
     describe('Create User Routes', () => {
          afterAll(async () => {
               await prisma.$transaction([
                    prisma.users.deleteMany({ where: { email: "re.exp@gmail.com" } })
               ])
          })

          test('Deve ser possivel criar um usuario com dados invalidos', async () => {
               const response = await server.inject({
                    method: 'POST',
                    url: '/users',
                    body: {
                         name: 'Renato Romão',
                         email: 're.exp@gmail.com',
                         password: '123',
                         username: 'rerere',
                    }
               })

               const { Message, UserId } = JSON.parse(response.body)

               expect(response.statusCode).toBe(201)
               expect(Message).toBe(`O usuario foi criado com sucesso`)
               expect(UserId).toBeDefined()
          })

          test('Não deve ser possivel criar um usuario com um email já utilizado', async () => {
               const response = await server.inject({
                    method: 'POST',
                    url: '/users',
                    body: {
                         name: 'Danilo Romão',
                         email: 're.exp@gmail.com',
                         password: '123',
                         username: 'danidani',
                    }
               })

               const { Message } = JSON.parse(response.body)

               expect(response.statusCode).toBe(400)
               expect(Message).toBe(`Esse email já esta sendo utilizado`)
          })

          test('Não deve ser possivel criar um usuario com um username já utilizado', async () => {
               const response = await server.inject({
                    method: 'POST',
                    url: '/users',
                    body: {
                         name: 'Danilo Romão',
                         email: 'romao.exp@gmail.com',
                         password: '123',
                         username: 'rerere',
                    }
               })

               const { Message } = JSON.parse(response.body)

               expect(response.statusCode).toBe(400)
               expect(Message).toBe(`Esse username já esta sendo utilizado`)
          })
     })
})