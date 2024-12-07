import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../lib/prisma'
import { setupTestServer } from '../setup'


describe('Create Book Routes', () => {
     afterAll(async () => { await prisma.books.deleteMany({ where: { isValid: false } }) })

     const { getServer } = setupTestServer();

     test('Deve ser poissivel criar um livro com dados invalidos', async () => {
          const response = await getServer().inject({
               method: 'POST',
               url: '/create-book',
               body: {
                    title: 'iHelp',
                    author: 'danilo',
                    category: 'tecnologia',
                    ISBN: '00001000',
                    rating: 5,
                    isValid: false
               }
          })

          const { Message, Book } = JSON.parse(response.body)

          expect(Message).toBe(`O livro iHelp foi cadastrado com sucesso!`)
          expect(Book.title).toBe('iHelp')
     })

     test('Não deve ser possivel criar um livro que já existe', async () => {
          const response = await getServer().inject({
               method: 'POST',
               url: '/create-book',
               body: {
                    title: 'iHelp',
                    author: 'danilo',
                    category: 'tecnologia',
                    ISBN: '00001000',
                    rating: 5,
                    isValid: false
               }
          })

          const { Message } = JSON.parse(response.body)

          expect(Message).toBe("O livro cadastrado ja existe no sistema")
     })

     test('Não deve ser possivel criar um livro com dados invaalidos', async () => {
          const response = await getServer().inject({
               method: 'POST',
               url: '/create-book',
               body: {
                    title: 'i2',
                    author: 'da',
                    category: 't',
                    ISBN: '2134',
                    rating: -1,
                    isValid: false
               }
          })

          expect(response.statusCode).toBe(400)
     })
})