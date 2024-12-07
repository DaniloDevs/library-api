import fastify, { FastifyInstance } from "fastify";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { RegisterRoutes } from "./routes";
import JWT from '@fastify/jwt'
import COOKIE from '@fastify/cookie'


export async function buildServer() {

     const server = fastify()

     // Configurando compiladores
     server.setValidatorCompiler(validatorCompiler);
     server.setSerializerCompiler(serializerCompiler);

     // Configurando Plugins
     server.register(JWT, {
          secret: "abcdefghijklmnopqrstuvwxyz",
          cookie: {
               cookieName: 'token',
               signed: false
          }
     })

     server.register(COOKIE)

     // Configurando Rotas
     await RegisterRoutes(server);

     return server;
}