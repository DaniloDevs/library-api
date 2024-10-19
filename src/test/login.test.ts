import { afterAll, describe, expect, test } from "vitest"
import { server } from ".."
import { prisma } from "../lib/prisma"

server.listen({ port: 0 })

afterAll(async () => {
     const student = await prisma.students.findUnique({ where: { registration: "2023101234" } })
     if (student) {
          await prisma.students.delete({ where: { registration: "2023101234" } })
          await prisma.users.delete({ where: { email: "maria.souza@example.com" } })
     }

     const teacher = await prisma.teachers.findUnique({ where: { cpf: "12345678900" } })
     if (teacher) {
          await prisma.teachers.delete({ where: { cpf: "12345678900" } })
          await prisma.users.delete({ where: { email: "joao.pereira@example.com" } })
     }
})

describe('Login Routes', () => {

     test('deve ser possivel fazer o login como aluno', async () => {
          await server.inject({
               method: "POST",
               url: "/register/student",
               body: {
                    name: "Maria Souza",
                    email: "maria.souza@example.com",
                    gender: "female",
                    type: "student",
                    classRoom: "2B",
                    wallet: 120,
                    registration: "2023098765"
               }
          })

          const response = await server.inject({
               method: "POST",
               url: "/login",
               body: {
                    email: "maria.souza@example.com",
                    type: "student",
               }
          })

          const { Message, Token } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe("Você logou com sucesso")
          expect(Token).toBeDefined()
          expect(response.headers["set-cookie"]).toBeDefined()
     })


     test('deve ser possivel fazer o login como professor', async () => {
          await server.inject({
               method: "POST",
               url: "/register/teacher",
               body: {
                    name: "João Pereira",
                    email: "joao.pereira@example.com",
                    gender: "male",
                    type: "teacher",
                    teacherType: "Matemática",
                    cpf: "12345678900"
               }
          })

          const response = await server.inject({
               method: "POST",
               url: "/login",
               body: {
                    email: "joao.pereira@example.com",
                    type: "teacher",
               }
          })

          const { Message, Token } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe("Você logou com sucesso")
          expect(Token).toBeDefined()
          expect(response.headers["set-cookie"]).toBeDefined()
     })

     test('Não deve ser possivel logar com um email inexistente ', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/login",
               body: {
                    email: "pereira@example.com",
                    type: "teacher",
               }
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(400)
          expect(Message).toBe("Não existem nenhum usuario com esse email")
     })
})
