import { afterAll, describe, expect, test } from "vitest";
import { prisma } from "../../lib/prisma";
import { setupTestServer } from "../setup";


describe('Login Auth Routes', () => {
     afterAll(async () => { await prisma.users.deleteMany({ where: { isValid: false } }) })

     const { getServer } = setupTestServer();


     test('Deve ser possivel logar com um email valido', async () => {
          await getServer().inject({
               method: 'POST',
               url: '/register',
               body: {
                    name: 'joao',
                    email: 'joao@gmail.com',
                    isValid: false
               }
          })

          const response = await getServer().inject({
               method: 'POST',
               url: '/login',
               body: {
                    email: 'joao@gmail.com',
               }
          })

          const { Message } = JSON.parse(response.body)
          const token = response.cookies

          expect(response.statusCode).toBe(200)
          expect(Message).toBe('Você esta logado com sucesso')
          expect(token).toBeDefined()
     })
})