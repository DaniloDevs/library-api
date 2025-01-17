import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../src/lib/prisma'
import server from '../../src/server'
import FormatDate from '../../src/utils/format-date'


describe('Reservation Routes', async () => {
     describe('Create Reservation Routes', async () => {
          afterAll(async () => {
               await prisma.$transaction([
                    prisma.reservations.deleteMany({
                         where: {
                              Books: {
                                   id: booksId,
                              },
                         },
                    }),
                    prisma.books.update({
                         where: { id: booksId },
                         data: {
                              status: 'AVAILABLE'
                         }
                    })
               ])
          })


          const responseUser = await server.inject({
               method: 'GET',
               url: '/users/danidani',
          })

          const responseBook = await server.inject({
               method: 'get',
               url: '/books/ihelp-backends',
          })


          const { Book } = JSON.parse(responseBook.body)
          const { User } = JSON.parse(responseUser.body)

          let booksId: string
          booksId = Book.id

          test('Deve ser possivel poder reservar um livro disponivel', async () => {
               const response = await server.inject({
                    method: 'POST',
                    url: '/reservations',
                    body: {
                         bookId: Book.id,
                         userId: User.id,
                    }
               })

               const { Message, ReservedId } = JSON.parse(response.body)
               const currentDate = new Date();
               const expiresAt = new Date();
               expiresAt.setDate(currentDate.getDate() + 30);
               const formattedExpiresDate = FormatDate(expiresAt)
               expect(Message).toBe(`Foi possível realizar a reserva com sucesso para o livro "${Book.title}". Sua reserva é válida até ${formattedExpiresDate}.`)
               expect(response.statusCode).toBe(201)
               expect(ReservedId).toBeDefined()
          })
       
          test('Não deve ser possivel reservar um livro ja reservado', async () => {
               const response = await server.inject({
                    method: 'POST',
                    url: '/reservations',
                    body: {
                         expiresAt: "3025-02-09T20:49:50.960Z",
                         bookId: Book.id,
                         userId: User.id,
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
                         userId: User.id,
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
                         userId: "11",
                    }
               })

               const { Message } = JSON.parse(response.body)

               expect(response.statusCode).toBe(400)
               expect(Message).toBe("O usuario informado não existe")
          })
     })
})