import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../src/lib/prisma'
import server from '../../src/server'


describe('Create Register Routes', async () => {
     afterAll(async () => {
          await prisma.$transaction([
               prisma.books.deleteMany({ where: { slug: 'trivago-com' } }),
               prisma.authors.deleteMany({ where: { slug: 'zeze' } }),
               prisma.categorys.deleteMany({ where: { slug: 'hotel' } }),
               prisma.users.deleteMany({ where: { email: "dada.exp@gmail.com" } }),
               prisma.reservations.deleteMany({ where: { id: reserverdId } })
          ])
     })

     let reserverdId: string

     const responseUser = await server.inject({
          method: 'POST',
          url: '/users',
          body: {
               name: 'Danilo Romão',
               email: 'dada.exp@gmail.com',
               password: '123',
               username: 'dadadada',
          }
     })

     expect(responseUser.statusCode).toBe(201)

     const responseBook = await server.inject({
          method: 'POST',
          url: '/books',
          body: {
               title: 'Trivago Com',
               author: 'zeze',
               category: 'hotel',
               ISBN: '0100010110',
               rating: 5,
          }
     })

     expect(responseBook.statusCode).toBe(201)

     const { Book } = JSON.parse(responseBook.body)
     const { UserId } = JSON.parse(responseUser.body)


     test('Deve ser possivel poder reservar um livro disponivel', async () => {
          const response = await server.inject({
               method: 'POST',
               url: '/reservations',
               body: {
                    expiresAt: "3025-02-09T20:49:50.960Z",
                    bookId: Book.id,
                    userId: UserId,
               }
          })

          const { Message, ReservedId } = JSON.parse(response.body)
          reserverdId = ReservedId

          expect(Message).toBe("Foi possivel reservar com sucesso o livro Trivago Com ate a data 9 de fevereiro de 3025")
          expect(response.statusCode).toBe(201)
          expect(ReservedId).toBeDefined()
     })
     test('não deve ser possivel poder reservar um livro para um dia anterior a hoje', async () => {
          const response = await server.inject({
               method: 'POST',
               url: '/reservations',
               body: {
                    expiresAt: "1025-02-08T20:49:50.960Z",
                    bookId: Book.id,
                    userId: UserId,
               }
          })

          const { Message, ReservedId } = JSON.parse(response.body)
          reserverdId = ReservedId

          expect(Message).toBe("O livro deve ser reservado ate uma data maior que hoje")
          expect(response.statusCode).toBe(400)
     })

     test('Não deve ser possivel reservar um livro ja reservado', async () => {
          const response = await server.inject({
               method: 'POST',
               url: '/reservations',
               body: {
                    expiresAt: "3025-02-09T20:49:50.960Z",
                    bookId: Book.id,
                    userId: UserId,
               }
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(400)
          expect(Message).toBe("Não e possivel reservar esse livro, pois outro usuario já o reservou")
     })

     test('Não deve ser possivel reservar um livro para um livro que não existe', async () => {
          const response = await server.inject({
               method: 'POST',
               url: '/reservations',
               body: {
                    expiresAt: "3025-02-09T20:49:50.960Z",
                    bookId: "11",
                    userId: UserId,
               }
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(400)
          expect(Message).toBe("O livro informado não existe")
     })
     test('Não deve ser possivel reservar um livro para um usuario que não existe', async () => {
          const response = await server.inject({
               method: 'POST',
               url: '/reservations',
               body: {
                    expiresAt: "3025-02-09T20:49:50.960Z",
                    bookId: Book.id,
                    userId:"11",
               }
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(400)
          expect(Message).toBe("O usuario informado não existe")
     })
})