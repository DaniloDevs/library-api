import { prisma } from '../lib/prisma';
import { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from "zod";


export async function RegisterUser(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post("/register/student", {
               schema: {
                    body: z.object({
                         name: z.string(),
                         email: z.string(),
                         gender: z.string(),
                         type: z.enum(["student", "teacher"]),
                         classRoom: z.string(),
                         wallet: z.number().int(),
                         registration: z.string(),
                    })
               }
          }, async (request, reply) => {
               const {
                    name, email, gender, classRoom, wallet, registration, type,
               } = request.body

               const existStudent = await prisma.students.findUnique({ where: { registration } })

               if (existStudent) {
                    return reply.status(400).send({
                         Message: "Ja existe um aluno com essa matricula"
                    })
               }

               await prisma.users.create({
                    data: {
                         name,
                         email,
                         gender,
                         Students: {
                              create: {
                                   classRoom,
                                   wallet,
                                   registration
                              }
                         }
                    },
               })

               return reply.status(201).send({
                    Message: "O registro de aluno foi feito com sucesso",
                    Student: {
                         name,
                         email,
                         gender,
                         classRoom,
                         wallet,
                         registration
                    }
               })

          })

          .post("/register/teacher", {
               schema: {
                    body: z.object({
                         name: z.string(),
                         email: z.string(),
                         gender: z.string(),
                         type: z.enum(["student", "teacher"]),
                         teacherType: z.string(),
                         cpf: z.string(),
                    })
               }
          }, async (request, reply) => {
               const {
                    name, email, gender, type, teacherType, cpf
               } = request.body



               const existTeacher = await prisma.teachers.findUnique({ where: { cpf } })


               if (existTeacher) {
                    return reply.status(400).send({
                         Message: "Ja existe um professor cadastrado"
                    })
               }



               await prisma.users.create({
                    data: {
                         name,
                         email,
                         gender,
                         Teachers: {
                              create: {
                                   teacherType,
                                   cpf
                              }
                         }
                    },
               })

               return reply.status(201).send({
                    Message: "O registro do professor foi feito com sucesso",
                    Teacher: {
                         name,
                         email,
                         gender,
                         teacherType,
                         cpf
                    }
               })
          })
}