import { describe, expect, test } from 'vitest'
import server from '../../src/server'


describe('Find Book by Slug Routes', () => {
     test('Deve ser possivel buscar um livro por uma slug valida', async () => {
          const response = await server.inject({
               method: 'get',
               url: '/books/ihelp-fullstack',
          })

          const { Message, Book } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe(`Foi possivel retornar o livro com sucesso!`)
          expect(Book.title).toBe('iHelp FullStack')
     })

     test('Não deve ser posivel buscar um livro por uma slug invalida', async () => {
          const response = await server.inject({
               method: 'get',
               url: '/books/ihels',
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(401)
          expect(Message).toBe(`Não foi possivel encontrar um livro com essa slug`)
     })
})