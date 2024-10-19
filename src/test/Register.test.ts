import { afterAll, describe, expect, test } from "vitest"
import { server } from ".."
import { prisma } from "../lib/prisma"

server.listen({ port: 0 })

afterAll(async () => {
     const student = await prisma.students.findUnique({ where: { registration: "2023105678" } })
     if (student) {
          await prisma.students.delete({ where: { registration: "2023105678" } })
          await prisma.users.delete({ where: { email: "lucas.martins@example.com" } })
     }

     const teacher = await prisma.teachers.findUnique({ where: { cpf: "98765432100" } })
     if (teacher) {
          await prisma.teachers.delete({ where: { cpf: "98765432100" } })
          await prisma.users.delete({ where: { email: "carla.pereira@example.com" } })
     }
})

describe('Register Routes', () => {


     test('deve ser possivel criar um aluno valido', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/register/student",
               body: {
                    name: "Lucas Martins",
                    email: "lucas.martins@example.com",
                    gender: "male",
                    type: "student",
                    classRoom: "5B",
                    wallet: 200,
                    registration: "2023105678"
               }
          })
          const { Message, Student } = JSON.parse(response.body)

          expect(response.statusCode).toBe(201)
          expect(Message).toBe("O registro de aluno foi feito com sucesso")
          expect(Student).toHaveProperty('name', "Lucas Martins")
          expect(Student).toHaveProperty('email', "lucas.martins@example.com")
          expect(Student).toHaveProperty('registration', "2023105678")
     })

     test('deve ser possivel criar um professor valido', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/register/teacher",
               body: {
                    name: "Carla Pereira",
                    email: "carla.pereira@example.com",
                    gender: "female",
                    type: "teacher",
                    teacherType: "Ciências",
                    cpf: "98765432100"
               }
          })

          const { Message, Teacher } = JSON.parse(response.body)

          expect(response.statusCode).toBe(201)
          expect(Message).toBe("O registro do professor foi feito com sucesso")
          expect(Teacher).toHaveProperty('name', "Carla Pereira")
          expect(Teacher).toHaveProperty('teacherType', "Ciências")
          expect(Teacher).toHaveProperty('cpf', "98765432100")
     })



     test('deve ser possivel criar um aluno valido', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/register/student",
               body: {
                    name: "Lucas Martins",
                    email: "lucas.martins@example.com",
                    gender: "male",
                    type: "student",
                    classRoom: "5B",
                    wallet: 200,
                    registration: "2023105678"
               }
          })
          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(400)
          expect(Message).toBe("Ja existe um aluno com essa matricula")
     })

})