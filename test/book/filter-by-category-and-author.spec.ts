import { describe, expect, test } from "vitest"
import server from "../../src/server"

describe('Book Routes', () => {
describe('Filter Books by Category and Author', async () => {
     test('Deve ser possível listar todos os livros de um autor em uma categoria específica', async () => {

          const response = await server.inject({
               method: 'GET',
               url: '/books?author=danilo&category=suporte',
          })

          const { Message, Books } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`Foi possível listar todos os livros do autor "danilo" na categoria "suporte".`)
          expect(Array.isArray(Books)).toBe(true)
          expect(Books).toHaveLength(1)
     })
})
})