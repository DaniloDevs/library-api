import { afterAll, describe, expect, test } from "vitest";
import { prisma } from "../../lib/prisma";
import { setupTestServer } from "../setup";


describe('Register Auth Routes', () => {
     afterAll(async () => { await prisma.users.deleteMany({ where: { isValid: false } }) })

     const { getServer } = setupTestServer();

     test('Deve ser possivel se registrar com um email valido', async () => {
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
          expect(Message).toBe( 'Foi possivel se cadastrar com sucesso!')
     })
})