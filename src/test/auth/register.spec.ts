import { afterAll, describe, expect, test } from "vitest";
import { prisma } from "../../lib/prisma";
import { setupTestServer } from "../setup";


describe('Register Auth Routes', () => {
     afterAll(async () => { await prisma.users.deleteMany({ where: { isValid: false } }) })

     const { getServer } = setupTestServer();

     test('Deve ser possivel se registrar com dados valido', async () => {
          const response = await getServer().inject({
               method: 'POST',
               url: '/register',
               body: {
                    name: 'danilo',
                    email: 'danilo@gmail.com',
                    isValid: false
               }
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(201)
          expect(Message).toBe('Foi possivel se cadastrar com sucesso!')
     })

     test('Não deve ser possivel se resgistrar com o mesmo email', async () => {
          const response = await getServer().inject({
               method: 'POST',
               url: '/register',
               body: {
                    name: 'danilo',
                    email: 'danilo@gmail.com',
                    isValid: false
               }
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(401)
          expect(Message).toBe('O email escolhido já esta cadastrado')
     })

     test('Não deve ser possivel se resgistrar com dados invalidos', async () => {
          const response = await getServer().inject({
               method: 'POST',
               url: '/register',
               body: {
                    name: 'danilo',
                    email: 'danilo@gmail.com',
                    isValid: false
               }
          })

          expect(response.statusCode).toBe(401)
     })
})