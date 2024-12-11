import { FastifyInstance } from "fastify";
import { CreateBook } from "./book/create-book";
import { FindBookBySlug } from "./book/find-book-by-slug";
import { FindAllBooks } from "./book/find-all-books";
import { FindBookByCategory } from "./book/find-book-by-category";


export async function RegisterRoutes(server: FastifyInstance) {

	server.get("/", (req, res) => {
		return res.send("Server is Running!")
	});

	// Books
	server.register(CreateBook)
	server.register(FindBookBySlug)
	server.register(FindAllBooks)
	server.register(FindBookByCategory)
}