import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../lib/prisma'
import server from '../..'

afterAll(async () => { await prisma.books.deleteMany({ where: { isValid: false } }) }) 

describe('Find Book by Slug Routes',  () => {
     test('Deve ser poissivel criar um livro valido', async () => {
          await server.inject({
               method: 'POST',
               url: '/create-book',
               body: {
                    title: 'smartia',
                    author: 'danilo',
                    category: 'tecnologia',
                    ISBN: '00000000',
                    rating: 5,
                    isValid: false
               }
          })
          
          const response = await server.inject({
               method: 'get',
               url: '/book/smartia',
          })

          const { Message, Book } = JSON.parse(response.body)

          expect(Message).toBe(`Foi possivel retornar o livro com sucesso!`)
          expect(Book.title).toBe('smartia')
     })
})