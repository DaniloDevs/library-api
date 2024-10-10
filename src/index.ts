import fastify from "fastify";
import FindBookById from "./routes/find-book-by-id";
import FindBooks from "./routes/find-books";
import CreateBook from "./routes/create-book";
import ReservetionBookById from "./routes/reservation-book-by-id";
import DevolutionBookById from "./routes/devolution-book-by-id";

export const server = fastify()

try {
     // Rotas
     server.get("/", (req, res) => { return res.send("Server in Running!!") })

     server.register(CreateBook)
     server.register(FindBooks)
     server.register(FindBookById)
     server.register(ReservetionBookById)
     server.register(DevolutionBookById)

     // Inicialização do server
     server.listen({
          port: 3031,
          host: "0.0.0.0"
     }).then(() => {
          console.log("Server Running!")
     })

} catch (error ) {
     console.log(error)
     process.exit(1)
}