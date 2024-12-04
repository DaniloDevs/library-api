import { afterAll, describe, expect, test } from "vitest";
import { server } from "..";
import { prisma } from "../lib/prisma";


afterAll(async () => {
     await prisma.books.delete({ where: { ISBN: "898853267780" } })
})

describe('Book Routes', () => {
     test('Deve ser possivel criar um livro valido', async () => {
          const response = await server.inject({
               method: 'POST',
               url: '/book',
               body: {
                    title: "iHelp",
                    author: "Danilo",
                    category: "fantasia",
                    ISBN: "898853267780",
                    rating: 5,
               }
          })

          const {Message, Book} =  JSON.parse(response.body)

          expect(response.statusCode).toBe(201)
     })
})