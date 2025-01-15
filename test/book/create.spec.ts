import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../src/lib/prisma'
import server from '../../src/server'

describe('Book Routes', () => {
     describe('Create Book Routes', () => {
          afterAll(async () => {
               await prisma.$transaction([
                    prisma.books.deleteMany({ where: { title: 'Uez Company' } }),
                    prisma.authors.deleteMany({ where: { name: 'Roberto' } }),
                    prisma.categorys.deleteMany({ where: { slug: 'servico' } }),
               ])
          })

          test('Deve ser poissivel criar um livro com dados invalidos', async () => {
               const response = await server.inject({
                    method: 'POST',
                    url: '/books',
                    body: {
                         title: 'Uez Company',
                         author: 'Roberto',
                         category: 'Servico',
                         ISBN: '110101001',
                         rating: 5,
                    }
               })

               const { Message, Book } = JSON.parse(response.body)

               expect(response.statusCode).toBe(201)
               expect(Message).toBe(`O livro Uez Company foi cadastrado com sucesso!`)
               expect(Book.title).toBe('Uez Company')
          })

          test('Não deve ser possivel criar um livro que já existe', async () => {
               const response = await server.inject({
                    method: 'POST',
                    url: '/books',
                    body: {
                         title: 'Uez Company',
                         author: 'Roberto',
                         category: 'Suporte',
                         ISBN: '110101001',
                         rating: 5,
                    }
               })

               const { Message } = JSON.parse(response.body)

               expect(response.statusCode).toBe(401)
               expect(Message).toBe("O livro cadastrado ja existe no sistema")
          })

          test('Não deve ser possivel criar um livro com dados invaalidos', async () => {
               const response = await server.inject({
                    method: 'POST',
                    url: '/books',
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
})