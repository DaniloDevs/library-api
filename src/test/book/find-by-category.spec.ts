import { afterAll, describe, expect, test } from "vitest";
import { prisma } from "../../lib/prisma";
import { setupTestServer } from "../setup";


describe('Find Books By Category Routes', async () => {
     afterAll(async () => {
          await prisma.$transaction([
               prisma.books.deleteMany({ where: { title: 'power tech' } }),
               prisma.authors.deleteMany({ where: { name: 'bruno' } }),
               prisma.categorys.deleteMany({ where: { name: 'energia' } }),
          ])
     })


     const { getServer } = setupTestServer();
     
     test('Deve ser possivel listar todos os livros de uma category', async () => {
          await getServer().inject({
               method: 'POST',
               url: '/book/creating',
               body: {
                    title: 'power tech',
                    author: 'bruno',
                    category: 'energia',
                    ISBN: '0010100',
                    rating: 5,
                    isValid: false
               }
          })


          const response = await getServer().inject({
               method: 'get',
               url: '/book/category/energia',
          })

          const { Message, Books } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`Foi possivel listar todos os livros dessa categoria`)
          expect(Books).toBeDefined()
     })

     test('Não deve ser possivel listar os livros de uma categoria que não existe', async () => {
          const response = await getServer().inject({
               method: 'get',
               url: '/book/category/aspas',
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(401)
          expect(Message).toBe(`A categoria informada não existe`)
     })
})