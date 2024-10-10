import { afterAll, beforeAll, expect, test } from "vitest";
import { server } from "..";
import { prisma } from "../lib/prisma";


server.listen({ port: 0 })

let bookId: string
let bookName: string
let bookReservad: string

beforeAll(async () => {
     const response = await server.inject({
          method: "POST",
          url: "/book",
          body: {
               name: "Exp.: reservation book",
               author: "desconhecido",
               category: "livre"
          }
     })

     const { Message, Book } = JSON.parse(response.payload)
     
     bookId = Book.id
     bookName = Book.name
})


afterAll(async () => {
     await server.close()
     await prisma.book.deleteMany({ where: { name: "Exp.: reservation book" } })
})

test('POST /book/:id/reservation', async () => {
     const response = await server.inject({
          method: "POST",
          url: `/book/${bookId}/reservation`,
     })

     const { Message } = JSON.parse(response.payload)

     expect(response.statusCode).toBe(200)
     expect(Message).toBe(`O livro ${bookName} foi reservado com sucesso`)
})

test('POST /book/:id/reservation', async () => {
     const response = await server.inject({
          method: "POST",
          url: `/book/${bookId}/reservation`,
     })

     const { Message } = JSON.parse(response.payload)

     expect(response.statusCode).toBe(400)
     expect(Message).toBe(`O livro ${bookName} ja foi reservado por outra pessoa`)
})
