import { FastifyInstance } from "fastify";
import { CreateBook } from "./book/create-book";
import { FindBookBySlug } from "./book/find-book-by-slug";
import { RegisterUser } from "./auth/register";
import { LoginUser } from "./auth/login";

export async function RegisterRoutes(server: FastifyInstance) {

	server.get("/", (req, res) => {
		return res.send("Server is Running!")
	});

	// Books
	server.register(CreateBook)
	server.register(FindBookBySlug)

	// Auth
	server.register(RegisterUser)
	server.register(LoginUser)
}