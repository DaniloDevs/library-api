import fastify from "fastify";

export const server = fastify()

try {
     // Rotas
     server.get("/", (req, res) => { return res.send("Server in Running!!") })

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