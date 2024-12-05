import fastify, { FastifyInstance } from "fastify";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { RegisterRoutes } from "./routes";

export async function buildServer() {
     const server = fastify()

     setupCompilers(server);


     await RegisterRoutes(server);

     return server;
}

function setupCompilers(server: FastifyInstance) {
     server.setValidatorCompiler(validatorCompiler);
     server.setSerializerCompiler(serializerCompiler);
}


