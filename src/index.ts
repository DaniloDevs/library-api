import fastify from "fastify";
import CreateBook from "./routes/create-book";
import FindAllBooks from "./routes/find-all-books";
import FindBookById from "./routes/find-book-by-id";
import CreateUser from "./routes/create-user";
import FindUserById from "./routes/find-user-by-id";

export const server = fastify()

try {
     // Rotas
     server.get("/", (req, res) => { return res.send("Server in Running!!") })

     server.register(CreateBook)
     server.register(FindAllBooks)
     server.register(FindBookById)
     server.register(CreateUser)
     server.register(FindUserById)

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