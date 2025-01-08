import { FastifyInstance } from "fastify";
import { CreateBook } from "./book/create";
import { FindAllBooks } from "./book/find-all";
import { FindBookBySlug } from "./book/find-by-slug";
import { CreateUser } from "./user/create";
import { FindUserByUsername } from "./user/find-by-username";


export async function RegisterRoutes(server: FastifyInstance) {

	server.get("/", (req, res) => {
		return res.send("Server is Running!")
	});

	// Books
	server.register(CreateBook)
	server.register(FindBookBySlug)
	server.register(FindAllBooks)

	// User
	server.register(CreateUser)
	server.register(FindUserByUsername)
}