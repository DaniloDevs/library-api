import {  describe, expect, test } from "vitest";
import server from "../../src/server";


describe('Filter Books by Author ', async () => {     
     test('Deve ser possivel listar todos os livros de um author', async () => {
          const response = await server.inject({
               method: 'get',
               url: '/books?author=danilo',
          })

          const { Message, Books } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`Foi possível listar todos os livros do autor "danilo".`)
          expect(Array.isArray(Books)).toBe(true)
     })

     test('Não deve ser possivel listar os livros de um author que não existe', async () => {
          const response = await server.inject({
               method: 'get',
               url: '/books?author=aspas',
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(400)
          expect(Message).toBe(`O autor "aspas" informado não existe.`)
     })
})