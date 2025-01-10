import { describe, expect, test } from 'vitest'
import server from '../../src/server'


describe('Find All Books Routes', () => {
    test('Deve ser poissivel listar todos os livros', async () => {
       
          const response = await server.inject({
               method: 'GET',
               url: '/books',
          })

          const { Message, Books } = JSON.parse(response.body)

          expect(Message).toBe("Foi possível listar todos os livros.")
          expect(Books[0]).toBeDefined()
     })
})