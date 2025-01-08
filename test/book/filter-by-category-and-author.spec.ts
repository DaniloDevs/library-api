import { afterAll, describe, expect, test } from "vitest"
import { prisma } from "../../src/lib/prisma"
import server from "../../src/server" 

describe('Filter Books by Category and Author', async () => {
     afterAll(async () => {
          await prisma.$transaction([
               prisma.books.deleteMany({ where: { title: 'Microsoft.eds' } }),
               prisma.authors.deleteMany({ where: { name: 'Naruto' } }),
               prisma.categorys.deleteMany({ where: { name: 'Vilas' } }),
          ])
     })

     test('Deve ser possível listar todos os livros de um autor em uma categoria específica', async () => {
          await server.inject({
               method: 'POST',
               url: '/books/creating',
               body: {
                    title: 'Microsoft.eds',
                    author: 'Naruto',
                    category: 'Vilas',
                    ISBN: '1011100',
                    rating: 5,
               },
          })

          // Fazer a requisição
          const response = await server.inject({
               method: 'GET',
               url: '/books?author=naruto&category=vilas',
          })

          const { Message, Books } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`Foi possível listar todos os livros do autor "naruto" na categoria "vilas".`)
          expect(Array.isArray(Books)).toBe(true)
          expect(Books).toHaveLength(1)
     })
})
