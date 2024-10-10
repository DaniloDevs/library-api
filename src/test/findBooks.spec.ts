import { afterAll, beforeAll, expect, test } from "vitest";
import { server } from "..";
import { prisma } from "../lib/prisma";


server.listen({ port: 0 })

beforeAll(async () => {
     await server.inject({
          method: "POST",
          url: "/book",
          body: {
               name: "Exp.: find book",
               author: "desconhecido",
               category: "livre"
          }
     })

})


afterAll(async () => {
     await server.close()
     await prisma.book.deleteMany({ where: { name: "Exp.: find book" } })
})

test('GET /book', async () => {

     const response = await server.inject({
          method: "GET",
          url: "/book",
     })

     const { Message, Books } = JSON.parse(response.payload)

     expect(response.statusCode).toBe(200)
     expect(Message).toBe("Todos os livros foram retornados com sucesso")
     expect(Books[0].name).toBe("Exp.: find book")
})

test('GET /book?author', async () => {

     const response = await server.inject({
          method: "GET",
          url: "/book?author=desconhecido",
     })

     const { Message, Books } = JSON.parse(response.payload)

     expect(response.statusCode).toBe(200)
     expect(Message).toBe(`Todos os livros do autor ${Books[0].author} foram listados com suceso`)
     expect(Books[0].name).toBe("Exp.: find book")
})

test('GET /book?category', async () => {

     const response = await server.inject({
          method: "GET",
          url: "/book?category=livre",
     })

     const { Message, Books } = JSON.parse(response.payload)

     expect(response.statusCode).toBe(200)
     expect(Message).toBe(`Todos os livros da categoria ${Books[0].category} foram listados com suceso`)
     expect(Books[0].name).toBe("Exp.: find book")
})
