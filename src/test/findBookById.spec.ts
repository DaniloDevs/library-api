import { afterAll, beforeAll, expect, test } from "vitest";
import { server } from "..";
import { prisma } from "../lib/prisma";


server.listen({ port: 0 })

let bookId: string

beforeAll(async () => {
     const response = await server.inject({
          method: "POST",
          url: "/book",
          body: {
               name: "Exp.: find book by id",
               author: "desconhecido",
               category: "livre"
          }
     })

     const { Message, Book } = JSON.parse(response.payload)

     bookId = Book.id
})


afterAll(async () => {
     await server.close()
     await prisma.book.deleteMany({ where: { name: "Exp.: find book by id" } })
})

test('GET /book/:id', async () => {

     const response = await server.inject({
          method: "GET",
          url: `/book/${bookId}`,
     })

     const { Message, Book } = JSON.parse(response.payload)

     expect(response.statusCode).toBe(200)
     expect(Message).toBe(`O livro ${Book.name} foi retornado com sucesso`)
     expect(Book.name).toBe("Exp.: find book by id")
})
