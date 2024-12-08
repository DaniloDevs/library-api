import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../lib/prisma'
import { setupTestServer } from '../setup'


describe('Find All Books Routes', () => {
     afterAll(async () => { await prisma.books.deleteMany({ where: { isValid: false } }) })

     const { getServer } = setupTestServer();

     test('Não deve ser poissivel listar todos os livros se não existir nenhum', async () => {

          const response = await getServer().inject({
               method: 'GET',
               url: '/book',
          })

          const { Message } = JSON.parse(response.body)

          expect(Message).toBe("Não existe nenhum livro para retorna!")
     })

     test('Deve ser poissivel listar todos os livros', async () => {

          await getServer().inject({
               method: 'POST',
               url: '/create-book',
               body: {
                    title: 'iHelp',
                    author: 'danilo',
                    category: 'tecnologia',
                    ISBN: '00001000',
                    rating: 5,
                    isValid: false
               }
          })

          const response = await getServer().inject({
               method: 'GET',
               url: '/book',
          })

          const { Message, Books } = JSON.parse(response.body)

          expect(Message).toBe("Todos os livros foram retornados com sucesso")
          expect(Books[0].title).toBe('iHelp')
     })
})