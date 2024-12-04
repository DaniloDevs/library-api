import { afterAll, describe, expect, test } from 'vitest'
import { server } from '../..'
import { prisma } from '../../lib/prisma'

afterAll(async () => { await prisma.books.deleteMany({ where: { isValid: false } }) })

describe('Create Book Routes', () => {
     test('Deve ser poissivel criar um livro valido', async () => {
          const response = await server.inject({
               method: 'POST',
               url: '/create-book',
               body: {
                    title: 'iHelp',
                    author: '',
                    category: '',
                    ISBN: '',
                    rating: 5,
                    isValid: false
               }
          })

          const { Message, Book } = JSON.parse(response.body)

          expect(Message).toBe(`O livro iHelp foi cadastrado com sucesso!`)
          expect(Book.title).toBe('iHelp')
     })
})