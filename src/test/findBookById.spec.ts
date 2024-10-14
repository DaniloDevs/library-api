import { afterAll, beforeAll, expect, test } from "vitest"
import { server } from ".."
import { prisma } from "../lib/prisma"



let bookId: string

beforeAll(async () => {
     server.listen({ port: 0 })

     const response = await server.inject({
          method: "POST",
          url: "/book",
          body: {
               title: "Exemple: find book by id",
               category: "livre",
               author: "desconhecido",
               rating: 5,
               reserved: false
          }
     })

     const { Book } = JSON.parse(response.body)

     bookId = Book.id
})

afterAll(async () => {
     server.close()
     await prisma.book.delete({ where: { title: "Exemple: find book by id" } })
})


test('Deveria ser possivel listar um livro pelo id', async () => {
     const response = await server.inject({
          method: "GET",
          url: `/book/${bookId}`,
     })

     const { Message, Book } = JSON.parse(response.body)

     expect(response.statusCode).toBe(200)
     expect(Message).toBe(`O livro ${Book.title} foi encontrado com sucesso`)
     expect(Book.title).toBe("Exemple: find book by id")
})

test('Não deveria ser possivel listar um livro por um id invalido', async () => {
     const response = await server.inject({
          method: "GET",
          url: `/book/12431324`,
     })

     const { Message } = JSON.parse(response.body)

     expect(response.statusCode).toBe(400)
     expect(Message).toBe("Não foi encontrado nenhum livro com o ID informado")
})