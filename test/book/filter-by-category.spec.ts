import { describe, expect, test } from "vitest";
import server from "../../src/server";


describe('Book Routes', () => {
describe('Filter Books by Category', async () => {
     test('Deve ser possivel listar todos os livros de uma category', async () => {
          const response = await server.inject({
               method: 'get',
               url: '/books?category=suporte',
          })

          const { Message, Books } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`Foi possível listar todos os livros da categoria "suporte".`)
          expect(Array.isArray(Books)).toBe(true)
     })

     test('Não deve ser possivel listar os livros de uma categoria que não existe', async () => {
          const response = await server.inject({
               method: 'get',
               url: '/books?category=aspas',
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(400)
          expect(Message).toBe(`A categoria "aspas" informada não existe.`)
     })
})
})