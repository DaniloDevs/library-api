import fastify from "fastify";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { RegisterRoutes } from "./routes/seutp-routes";


const server = fastify()

// Configurando compiladores
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// Configurando Rotas
RegisterRoutes(server);


export default server