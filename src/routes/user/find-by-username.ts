import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { userRepository } from "../../repository/userRepository";

export async function FindUserByUsername(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get('/users/:username', {
               schema: {
                    params: z.object({
                         username: z.string()
                    })
               }
          }, async (request, reply) => {
               const { username } = request.params

               const user = await userRepository.findByUsername(username)

               if (!user) return reply.status(400).send({ Message: "O username informado não existe" })

               return reply.status(200).send({
                    Message: "Foi possivel listar com sucesso o usuario",
                    User: user
               })
          })
}