import { afterAll, describe, expect, test } from "vitest"
import { server } from ".."
import { prisma } from "../lib/prisma"


server.listen({ port: 0 })

afterAll(async () => {
     await server.close()
     await prisma.book.deleteMany({ where: { name: "Exp.: test book" } })
})

describe('Book Routes', () => {
     let bookId: string

     test('POST /book', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/book",
               body: {
                    name: "Exp.: test book",
                    author: "desconhecido",
                    category: "livre"
               }
          })

          const { Message, Book } = JSON.parse(response.payload)

          bookId = Book.id

          expect(response.statusCode).toBe(201)
          expect(Message).toBe("O livro Exp.: test book foi criado com sucesso")
          expect(Book.name).toBe("Exp.: test book")
     })

     test('GET /book', async () => {

          const response = await server.inject({
               method: "GET",
               url: "/book",
          })
     
          const { Message, Books } = JSON.parse(response.payload)
     
          expect(response.statusCode).toBe(200)
          expect(Message).toBe("Todos os livros foram retornados com sucesso")
          expect(Books[0].name).toBe("Exp.: test book")
     })
     
     test('GET /book?author', async () => {
     
          const response = await server.inject({
               method: "GET",
               url: "/book?author=desconhecido",
          })
     
          const { Message, Books } = JSON.parse(response.payload)
     
          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`Todos os livros do autor ${Books[0].author} foram listados com suceso`)
          expect(Books[0].name).toBe("Exp.: test book")
     })
     
     test('GET /book?category', async () => {
     
          const response = await server.inject({
               method: "GET",
               url: "/book?category=livre",
          })
     
          const { Message, Books } = JSON.parse(response.payload)
     
          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`Todos os livros da categoria ${Books[0].category} foram listados com suceso`)
          expect(Books[0].name).toBe("Exp.: test book")
     })
     

     test('GET /book/:id', async () => {

          const response = await server.inject({
               method: "GET",
               url: `/book/${bookId}`,
          })
     
          const { Message, Book } = JSON.parse(response.payload)
     
          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`O livro ${Book.name} foi retornado com sucesso`)
          expect(Book.name).toBe("Exp.: test book")
     })

     test('POST /book/:id/reservation', async () => {
          const response = await server.inject({
               method: "POST",
               url: `/book/${bookId}/reservation`,
          })
     
          const { Message } = JSON.parse(response.payload)
     
          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`O livro Exp.: test book foi reservado com sucesso`)
     })

     test('POST /book/:id/reservation', async () => {
          const response = await server.inject({
               method: "POST",
               url: `/book/${bookId}/reservation`,
          })
     
          const { Message } = JSON.parse(response.payload)
     
          expect(response.statusCode).toBe(400)
          expect(Message).toBe(`O livro Exp.: test book ja foi reservado por outra pessoa`)
     })

     test('POST /book/:id/devolution', async () => {
          const response = await server.inject({
               method: "POST",
               url: `/book/${bookId}/devolution`,
          })
     
          const { Message } = JSON.parse(response.payload)
          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`O livro Exp.: test book foi devolvido com sucesso`)
     })

     test('POST /book/:id/devolution', async () => {
          const response = await server.inject({
               method: "POST",
               url: `/book/${bookId}/devolution`,
          })
     
          const { Message } = JSON.parse(response.payload)
          expect(response.statusCode).toBe(400)
          expect(Message).toBe(`O livro Exp.: test book esta disponivel para reserva`)
     })
})