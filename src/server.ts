import fastify, { FastifyInstance } from "fastify";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { RegisterRoutes } from "./routes";
import JWT from '@fastify/jwt'
import COOKIE from '@fastify/cookie'


export async function buildServer() {

     const server = fastify()
     setupCompilers(server);
     setupPlugins(server)
     await RegisterRoutes(server);

     return server;
}

function setupCompilers(server: FastifyInstance) {
     server.setValidatorCompiler(validatorCompiler);
     server.setSerializerCompiler(serializerCompiler);
}

function setupPlugins(server: FastifyInstance) {
     server.register(JWT, {
          secret: "abcdefghijklmnopqrstuvwxyz",
          cookie: {
               cookieName: 'token',
               signed: false
          }
     })

     server.register(COOKIE)
}