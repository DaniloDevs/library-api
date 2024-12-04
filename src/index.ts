import fastify from "fastify";
import JWT from "@fastify/jwt";
import Cookie from "@fastify/cookie";
import { env } from "../env";
import { serializerCompiler, validatorCompiler, } from 'fastify-type-provider-zod';
import { CreateBook } from "./routes/book/create-book";


export const server = fastify()

// --> Configurações
server.register(JWT, {
     secret: env.SECRET_JWT,
     cookie: { cookieName: 'token', signed: false }
})

server.register(Cookie)

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);


// --> Rotas
server.get("/", (req, res) => { return res.send("Server in Running!!") })

server.register(CreateBook)

// --> Inicialização
server.listen({
     port: 3031,
     host: "0.0.0.0"
}).then(() => {
     console.log("Server Running!")
})

