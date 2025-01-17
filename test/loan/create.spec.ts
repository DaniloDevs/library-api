import { afterAll, describe, expect, test } from 'vitest'
import { prisma } from '../../src/lib/prisma'
import server from '../../src/server'


describe('Loan Routes', async () => {
     describe('Create Loan Routes', async () => {
          afterAll(async () => {
               await prisma.$transaction([
                    prisma.loans.deleteMany({
                         where: { code: Reservations[2].loanCode as string }
                    }),
                    prisma.books.update({
                         where: { id: Reservations[2].booksId as string },
                         data: { status: "RESERVED" }
                    })
               ])
          })

          const res = await server.inject({
               method: 'GET',
               url: '/reservations',
          })

          const { Reservations } = JSON.parse(res.body)

          test('Deve ser possivel poder reservar um livro disponivel', async () => {
               const response = await server.inject({
                    method: 'POST',
                    url: '/loan',
                    body: {
                         code: Reservations[2].loanCode,
                         loanAt: new Date(),
                    }
               })

               const { Message } = JSON.parse(response.body)

               expect(response.statusCode).toBe(201)
               expect(Message).toBe("O emprestimo foi realizado com sucesso!")
          })
     })
})