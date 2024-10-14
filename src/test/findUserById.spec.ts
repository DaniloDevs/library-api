import { afterAll, beforeAll, expect, test } from "vitest";
import { prisma } from "../lib/prisma";
import { server } from "..";

server.listen({ port: 0 })

let userId: string

afterAll(async () => await prisma.user.delete({ where: { email: "findById@exemple.com" } }))

beforeAll( async () => {
     const response = await server.inject({
          method: "POST",
          url: "/user",
          body: {
               name: "Test Teste",
               email: "findById@exemple.com"
          }
     })
 
     const { User } = JSON.parse(response.body)

     userId= User.id
})

test('Deveria ser possivel criar um usuario', async () => {
     const response = await server.inject({
          method: "GET",
          url: `/user/${userId}`,
     })
     
     const { Message, User } = JSON.parse(response.body)

     expect(response.statusCode).toBe(200)
     expect(Message).toBe( `Foi possivel listar o usuario ${User.name}`)
     expect(User.name).toBe("Test Teste")
})
test('Deveria ser possivel criar um usuario', async () => {
     const response = await server.inject({
          method: "GET",
          url: '/user/12314',
     })
     
     const { Message, User } = JSON.parse(response.body)

     expect(response.statusCode).toBe(400)
     expect(Message).toBe("Não foi encontrado nenhum usuario com o ID informado")
})