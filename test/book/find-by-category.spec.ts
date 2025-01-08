import { afterAll, describe, expect, test } from "vitest";
import { prisma } from "../../src/lib/prisma";
import { setupTestServer } from "../setup";


describe('Find Books By Category Routes', async () => {
     afterAll(async () => {
          await prisma.$transaction([
               prisma.books.deleteMany({ where: { title: 'Power Tech' } }),
               prisma.authors.deleteMany({ where: { name: 'Bruno' } }),
               prisma.categorys.deleteMany({ where: { name: 'Energia' } }),
          ])
     })


     const { getServer } = setupTestServer();
     
     test('Deve ser possivel listar todos os livros de uma category', async () => {
          await getServer().inject({
               method: 'POST',
               url: '/book/creating',
               body: {
                    title: 'Power Tech',
                    author: 'Bruno',
                    category: 'Energia',
                    ISBN: '0010100',
                    rating: 5,
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