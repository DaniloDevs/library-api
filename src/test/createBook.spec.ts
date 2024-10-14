import { afterAll, beforeAll, expect, test } from "vitest";
import { prisma } from "../lib/prisma";
import { server } from "..";


beforeAll(() => server.listen({ port: 0 }))

afterAll(async () => {
     server.close()
     await prisma.book.delete({ where: { title: "Exemple: create book" } })
})


test('Deveria ser possivel criar um livro', async () => {
     const response = await server.inject({
          method: "POST",
          url: "/book",
          body: {
               title: "Exemple: create book",
               category: "livre",
               author: "desconhecido",
               rating: 5,
               reserved: false
          }
     })

     const { Message, Book } = JSON.parse(response.body)

     expect(response.statusCode).toBe(201)
     expect(Message).toBe(`O livro ${Book.title} foi criado com sucesso`)
     expect(Book.rating).toBe(5)
})

test('Não deveria ser possivel criar um livro com um nome ja utilizado', async () => {
     const response = await server.inject({
          method: "POST",
          url: "/book",
          body: {
               title: "Exemple: create book",
               category: "Misterio",
               author: "desconhecido",
               rating: 6,
               reserved: false
          }
     })

     const { Message } = JSON.parse(response.body)

     expect(response.statusCode).toBe(400)
     expect(Message).toBe("Ja existe um livro com esse nome")
})

