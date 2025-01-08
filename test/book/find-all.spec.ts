import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../src/lib/prisma'
import { setupTestServer } from '../setup'


describe('Find All Books Routes', () => {
     afterAll(async () => {
          await prisma.$transaction([
               prisma.books.deleteMany({ where: { slug: 'uez' } }),
               prisma.authors.deleteMany({ where: { name: 'renato' } }),
               prisma.categorys.deleteMany({ where: { name: 'tecnologia' } }),
          ])
     })

     const { getServer } = setupTestServer();

     test('Deve ser poissivel listar todos os livros', async () => {
          await getServer().inject({
               method: 'POST',
               url: '/book/creating',
               body: {
                    title: 'uez',
                    author: 'renato',
                    category: 'tecnologia',
                    ISBN: '000011000',
                    rating: 5,
                    isValid: false
               }
          })

          const response = await getServer().inject({
               method: 'GET',
               url: '/book',
          })

          const { Message, Books } = JSON.parse(response.body)

          expect(Message).toBe("Todos os livros foram retornados com sucesso")
          expect(Books).toBeDefined()
     })
})