import { FastifyInstance } from "fastify";
import { CreateBook } from "./book/create";
import { FindAllBooks } from "./book/find-all";
import { FindBookBySlug } from "./book/find-by-slug";
import { CreateUser } from "./user/create";
import { FindUserByUsername } from "./user/find-by-username";
import { CreateReservation } from "./reserved/create";
import { CancelReservertion } from "./reserved/cancel";
import { FindAllReservertion } from "./reserved/find-all";
import { FindReservertionById } from "./reserved/find-by-id";
import CreateLoan from "./loan/create";


export async function RegisterRoutes(server: FastifyInstance) {

	server.get("/", (req, res) => {
		return res.status(200).send({
			Message: "The server is up and running correctly",
			Status: "healthy",
			Status_Code: 200,
		})
	});

	// Books
	server.register(CreateBook)
	server.register(FindBookBySlug)
	server.register(FindAllBooks)

	// User
	server.register(CreateUser)
	server.register(FindUserByUsername)

	// Rerserved
	server.register(CreateReservation)
	server.register(CancelReservertion)
	server.register(FindAllReservertion)
	server.register(FindReservertionById)

	// Loan 
	server.register(CreateLoan)
}