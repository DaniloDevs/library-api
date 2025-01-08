import { afterAll, describe, expect, test } from "vitest";
import { prisma } from "../../src/lib/prisma";
import server from "../../src/server";


describe('Filter Books by Author ', async () => {
     afterAll(async () => {
          await prisma.$transaction([
               prisma.books.deleteMany({ where: { title: 'Data Pro' } }),
               prisma.authors.deleteMany({ where: { name: 'Gustavo' } }),
               prisma.categorys.deleteMany({ where: { name: 'futebol' } }),
          ])
     })
     
     test('Deve ser possivel listar todos os livros de um author', async () => {
          await server.inject({
               method: 'POST',
               url: '/books',
               body: {
                    title: 'Data Pro',
                    author: 'Gustavo',
                    category: 'futebol',
                    ISBN: '1010100',
                    rating: 5,
                    isValid: false
               }
          })

          const response = await server.inject({
               method: 'get',
               url: '/books?author=gustavo',
          })

          const { Message, Books } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`Foi possível listar todos os livros do autor "gustavo".`)
          expect(Books).toBeDefined()
     })

     test('Não deve ser possivel listar os livros de um author que não existe', async () => {
          const response = await server.inject({
               method: 'get',
               url: '/books?author=aspas',
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(400)
          expect(Message).toBe(`O autor "aspas" informado não existe.`)
     })
})