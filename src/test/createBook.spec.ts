import { afterAll, expect, test } from "vitest";
import { server } from "..";
import { prisma } from "../lib/prisma";

server.listen({ port: 0 })

afterAll(async () => {
     await server.close()
     await prisma.book.deleteMany({ where: { name: "Exp.: create book" } })
})

test('POST /book', async () => {
     const response = await server.inject({
          method: "POST",
          url: "/book",
          body: {
               name: "Exp.: create book",
               author: "Generico Donato",
               category: "Generico" 
          }
     })

     const { Message, Book } = JSON.parse(response.payload)

     expect(response.statusCode).toBe(201)
     expect(Message).toBe("O livro Exp.: create book foi criado com sucesso")
     expect(Book.name).toBe("Exp.: create book")
})