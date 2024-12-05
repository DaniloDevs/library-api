import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../lib/prisma'
import server from '../..'

afterAll(async () => { await prisma.books.deleteMany({ where: { isValid: false } }) })

describe('Create Book Routes', () => {
     test('Deve ser poissivel criar um livro valido', async () => {
          const response = await server.inject({
               method: 'POST',
               url: '/create-book',
               body: {
                    title: 'iHelp',
                    author: 'danilo',
                    category: 'tecnologia',
                    ISBN: '00000000',
                    rating: 5,
                    isValid: false
               }
          })

          const { Message, Book } = JSON.parse(response.body)

          expect(Message).toBe(`O livro iHelp foi cadastrado com sucesso!`)
          expect(Book.title).toBe('iHelp')
     })
})