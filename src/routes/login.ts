import { FastifyInstance } from "fastify";
import z from "zod";
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from "../lib/prisma";

export async function LoginUser(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post("/login", {
               schema: {
                    body: z.object({
                         email: z.string().email(),
                         type: z.enum(["student", "teacher"]),
                    })
               }
          }, async (request, reply) => {
               const { email, type, } = request.body


               const existUser= await prisma.users.findUnique({ where: { email } })

               if (!existUser) {
                    return reply.status(400).send({
                         Message: "Não existem nenhum usuario com esse email"
                    })
               }


               switch (type) {
                    case "student":
                         const student_Token = await reply.jwtSign({
                              email,
                              type
                         })

                         return reply
                              .status(200)
                              .setCookie('token', student_Token, {
                                   secure: true, // send cookie over HTTPS only
                                   httpOnly: true,
                                   sameSite: true // alternative CSRF protection
                              })
                              .send({
                                   Message: `Você logou com sucesso`,
                                   Token: student_Token
                              })
                    case "teacher":
                         const teacher_token = await reply.jwtSign({
                              email,
                              type
                         })

                         return reply
                              .status(200)
                              .setCookie('token', teacher_token, {
                                   secure: true, // send cookie over HTTPS only
                                   httpOnly: true,
                                   sameSite: true // alternative CSRF protection
                              })
                              .send({
                                   Message: `Você logou com sucesso`,
                                   Token: teacher_token
                              })
               }
          })
}