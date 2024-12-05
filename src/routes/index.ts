import { FastifyInstance } from "fastify";
import { CreateBook } from "./book/create-book";
import { FindBookBySlug } from "./book/find-book-by-slug";

export async function registerRoutes(app: FastifyInstance) {
  // Rota de health check
  app.get("/", (req, res) => { 
    return res.send("Server is Running!") 
  });

  // Registra rotas dos livros
  await app.register(CreateBook);
  await app.register(FindBookBySlug);
} 