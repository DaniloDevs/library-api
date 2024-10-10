import { afterAll, beforeAll, expect, test } from "vitest";
import { server } from "..";
import { prisma } from "../lib/prisma";


server.listen({ port: 0 })

let bookId: string
let bookName: string

beforeAll(async () => {
     const response = await server.inject({
          method: "POST",
          url: "/book",
          body: {
               name: "Exp.: devolution book",
               author: "desconhecido",
               category: "livre",
          }
     })

     const { Message, Book } = JSON.parse(response.payload)

     bookId = Book.id
     bookName = Book.name

     await server.inject({
          method: "POST",
          url: `/book/${bookId}/reservation`,
     })
})


afterAll(async () => {
     await server.close()
     await prisma.book.deleteMany({ where: { name: "Exp.: devolution book" } })
})

test('POST /book/:id/devolution', async () => {
     const response = await server.inject({
          method: "POST",
          url: `/book/${bookId}/devolution`,
     })

     const { Message } = JSON.parse(response.payload)
     expect(response.statusCode).toBe(200)
     expect(Message).toBe(`O livro ${bookName} foi devolvido com sucesso`)
})

test('POST /book/:id/devolution', async () => {
     const response = await server.inject({
          method: "POST",
          url: `/book/${bookId}/devolution`,
     })

     const { Message } = JSON.parse(response.payload)
     expect(response.statusCode).toBe(400)
     expect(Message).toBe(`O livro ${bookName} esta disponivel para reserva`)
})
