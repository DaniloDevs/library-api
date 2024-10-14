import { afterAll, beforeAll, expect, test } from "vitest"
import { server } from ".."
import { prisma } from "../lib/prisma"


beforeAll(() => server.listen({ port: 0 }))

beforeAll(async () => {
     await server.inject({
          method: "POST",
          url: "/book",
          body: {
               title: "Exemple: find all books",
               category: "livre",
               author: "desconhecido",
               rating: 5,
               reserved: false
          }
     })
})

afterAll(async () => {
     server.close()
     await prisma.book.delete({ where: { title: "Exemple: find all books" } })
})


test('Deveria ser possivel listar todos os livros', async () => {
     const response = await server.inject({
          method: "GET",
          url: "/book",
     })

     const { Message, Books } = JSON.parse(response.body)

     expect(response.statusCode).toBe(200)
     expect(Message).toBe("Todos os livros foram listados com sucesso")
     expect(Books[0].rating).toBe(5)
})

test('Deveria ser possivel listar todos os livros de uma categoria', async () => {
     const response = await server.inject({
          method: "GET",
          url: "/book?category=livre",
     })

     const { Message, Category, Books } = JSON.parse(response.body)

     expect(response.statusCode).toBe(200)
     expect(Message).toBe(`Todos os livros da categoria ${Books[0].category} foram listados com sucesso`)
     expect(Category).toBe(Books[0].category)
     expect(Books[0].title).toBe("Exemple: find all books")
})

test('Deveria ser possivel listar todos os livros de um author', async () => {
     const response = await server.inject({
          method: "GET",
          url: "/book?author=desconhecido",
     })

     const { Message, Author, Books } = JSON.parse(response.body)

     expect(response.statusCode).toBe(200)
     expect(Message).toBe(`Todos os livros do author ${Books[0].author} foram listados com sucesso`)
     expect(Author).toBe(Books[0].author)
     expect(Books[0].title).toBe("Exemple: find all books")
})

