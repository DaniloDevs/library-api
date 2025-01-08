import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../src/lib/prisma'
import { setupTestServer } from '../setup'


describe('Create Book Routes', () => {
     afterAll(async () => {
          await prisma.$transaction([
               prisma.books.deleteMany({ where: { slug: 'ihelp-front' } }),
               prisma.authors.deleteMany({ where: { name: 'danilo' } }),
               prisma.categorys.deleteMany({ where: { name: 'suporte' } }),
          ])
     })

     const { getServer } = setupTestServer();

     test('Deve ser poissivel criar um livro com dados invalidos', async () => {
          const response = await getServer().inject({
               method: 'POST',
               url: '/book/creating',
               body: {
                    title: 'iHelp Front',
                    author: 'danilo',
                    category: 'suporte',
                    ISBN: '010001000',
                    rating: 5,
               }
          })

          const { Message, Book } = JSON.parse(response.body)

          expect(response.statusCode).toBe(201)
          expect(Message).toBe(`O livro iHelp Front foi cadastrado com sucesso!`)
          expect(Book.title).toBe('iHelp Front')
     })

     test('Não deve ser possivel criar um livro que já existe', async () => {
          const response = await getServer().inject({
               method: 'POST',
               url: '/book/creating',
               body: {
                    title: 'iHelp',
                    author: 'danilo',
                    category: 'suporte',
                    ISBN: '010001000',
                    rating: 5,
                    isValid: false
               }
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(401)
          expect(Message).toBe("O livro cadastrado ja existe no sistema")
     })

     test('Não deve ser possivel criar um livro com dados invaalidos', async () => {
          const response = await getServer().inject({
               method: 'POST',
               url: '/book/creating',
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