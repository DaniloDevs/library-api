import { FastifyInstance } from "fastify";
import { CreateBook } from "./book/create";
import { FindAllBooks } from "./book/find-all";
import { FindBookByCategory } from "./book/find-by-category";
import { FindBookBySlug } from "./book/find-by-slug";
import { FindBookByAuthor } from "./book/find-by-author";


export async function RegisterRoutes(server: FastifyInstance) {

	server.get("/", (req, res) => {
		return res.send("Server is Running!")
	});

	// Books
	server.register(CreateBook)
	server.register(FindBookBySlug)
	server.register(FindAllBooks)
	server.register(FindBookByCategory)
	server.register(FindBookByAuthor)
}