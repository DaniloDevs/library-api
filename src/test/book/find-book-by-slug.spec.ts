import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../lib/prisma'
import { setupTestServer } from '../setup'


describe('Find Book by Slug Routes', () => {
     afterAll(async () => { await prisma.books.deleteMany({ where: { isValid: false } }) })

     const { getServer } = setupTestServer();

     test('Deve ser possivel buscar um livro por uma slug valida', async () => {
          await getServer().inject({
               method: 'POST',
               url: '/create-book',
               body: {
                    title: 'smartia',
                    author: 'danilo',
                    category: 'tecnologia',
                    ISBN: '0000100',
                    rating: 5,
                    isValid: false
               }
          })


          const response = await getServer().inject({
               method: 'get',
               url: '/book/smartia',
          })

          const { Message, Book } = JSON.parse(response.body)
          expect(Message).toBe(`Foi possivel retornar o livro com sucesso!`)
          expect(Book.title).toBe('smartia')
     })

     test('Não deve ser posivel buscar um livro por uma slug invalida', async () => {
          const response = await getServer().inject({
               method: 'get',
               url: '/book/ihels',
          })

          const { Message } = JSON.parse(response.body)

          expect(Message).toBe(`Não foi possivel encontrar um livro com essa slug`)
     })
})