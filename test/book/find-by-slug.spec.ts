import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../src/lib/prisma'
import server from '../../src/server'


describe('Find Book by Slug Routes', () => {
     afterAll(async () => {
          await prisma.$transaction([
               prisma.books.deleteMany({ where: { slug: 'smartia' } }),
               prisma.authors.deleteMany({ where: { name: 'ana' } }),
               prisma.categorys.deleteMany({ where: { name: 'redes' } }),
          ])
     })


     test('Deve ser possivel buscar um livro por uma slug valida', async () => {
          await server.inject({
               method: 'POST',
               url: '/books',
               body: {
                    title: 'smartia',
                    author: 'ana',
                    category: 'redes',
                    ISBN: '0000100',
                    rating: 5,
                    isValid: false
               }
          })

          const response = await server.inject({
               method: 'get',
               url: '/books/smartia',
          })

          const { Message, Book } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`Foi possivel retornar o livro com sucesso!`)
          expect(Book.title).toBe('smartia')
     })

     test('Não deve ser posivel buscar um livro por uma slug invalida', async () => {
          const response = await server.inject({
               method: 'get',
               url: '/books/ihels',
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(401)
          expect(Message).toBe(`Não foi possivel encontrar um livro com essa slug`)
     })
})