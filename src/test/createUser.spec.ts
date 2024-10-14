import { afterAll, beforeAll, expect, test } from "vitest";
import { prisma } from "../lib/prisma";
import { server } from "..";


beforeAll(() => server.listen({ port: 0 }))

afterAll(async () => {
     server.close()
     await prisma.user.delete({ where: { email: "create@exemple.com" } })
})

test('Deveria ser possivel criar um usuario', async () => {
     const response = await server.inject({
          method: "POST",
          url: "/user",
          body: {
               name: "Test Teste",
               email: "create@exemple.com"
          }
     })

     const { Message, User } = JSON.parse(response.body)

     expect(response.statusCode).toBe(201)
     expect(Message).toBe("Usuario criado com suucesso")
     expect(User.name).toBe("Test Teste")
})

test('Não deveria ser possivel criar um usuario com um email ja cadastrado', async () => {
     const response = await server.inject({
          method: "POST",
          url: "/user",
          body: {
               name: "Test da silva",
               email: "create@exemple.com"
          }
     })

     const { Message } = JSON.parse(response.body)

     expect(response.statusCode).toBe(400)
     expect(Message).toBe("Ja exsite um usuario com esse email")
})
