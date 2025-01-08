import { afterAll, describe, expect, test } from "vitest";
import { prisma } from "../../src/lib/prisma";
import { setupTestServer } from "../setup";


describe('Find Books By Author - Routes', async () => {
     afterAll(async () => {
          await prisma.$transaction([
               prisma.books.deleteMany({ where: { title: 'Data Pro' } }),
               prisma.authors.deleteMany({ where: { name: 'Gustavo' } }),
               prisma.categorys.deleteMany({ where: { name: 'futebol' } }),
          ])
     })


     const { getServer } = setupTestServer();

     test('Deve ser possivel listar todos os livros de um author', async () => {
          await getServer().inject({
               method: 'POST',
               url: '/book/creating',
               body: {
                    title: 'Data Pro',
                    author: 'Gustavo',
                    category: 'futebol',
                    ISBN: '1010100',
                    rating: 5,
                    isValid: false
               }
          })


          const response = await getServer().inject({
               method: 'get',
               url: '/book/author/gustavo',
          })

          const { Message, Books } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`Foi possivel listar todos os livros desse autor`)
          expect(Books).toBeDefined()
     })

     test('Não deve ser possivel listar os livros de um author que não existe', async () => {
          const response = await getServer().inject({
               method: 'get',
               url: '/book/author/aspas',
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(401)
          expect(Message).toBe(`O autor informada não existe`)
     })
})