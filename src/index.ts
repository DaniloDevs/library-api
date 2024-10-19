import fastify from "fastify";
import JWT from "@fastify/jwt";
import Cookie from "@fastify/cookie";
import { env } from "../env";
import { serializerCompiler, validatorCompiler, } from 'fastify-type-provider-zod';
import { LoginUser } from "./routes/login";
import { RegisterUser } from "./routes/register";

export const server = fastify()

try {
     // Configurações
     server.register(JWT, {
          secret: env.SECRET_JWT,
          cookie: {
               cookieName: 'token',
               signed: false
          }
     })

     server.register(Cookie)

     server.setValidatorCompiler(validatorCompiler);
     server.setSerializerCompiler(serializerCompiler);

     // Rotas
     server.get("/", (req, res) => { return res.send("Server in Running!!") })

     server.register(RegisterUser)
     server.register(LoginUser)

     // Inicialização do server
     server.listen({
          port: 3031,
          host: "0.0.0.0"
     }).then(() => {
          console.log("Server Running!")
     })

} catch (error) {
     console.log(error)
     process.exit(1)
}


server.ready()