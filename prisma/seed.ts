import { prisma } from "../src/lib/prisma";
import { CreateSlug } from "../src/utils/create-slug";

async function main() {
    console.log("\n=== Starting Development Data Seeding ===\n");

    try {
        // Criando usuários
        console.log("\u2022 Creating users...");
        await prisma.$transaction([
            prisma.users.create({
                data: {
                    name: "Danilo Romão",
                    email: "danilo.exp@gmail.com",
                    password: "123",
                    username: "danidani",
                },
            }),
            prisma.users.create({
                data: {
                    name: "Murilo Romão",
                    email: "murilo.exp@gmail.com",
                    password: "123",
                    username: "mumumuri",
                },
            }),
        ]);
        console.log("  Users created successfully.\n");

        // Criando livros
        console.log("\u2022 Creating books...");
        await prisma.$transaction([
            prisma.books.create({
                data: {
                    title: "iHelp Backends",
                    ISBN: "010001000",
                    slug: CreateSlug("iHelp Backends"),
                    status: "AVAILABLE",
                    rating: 5,
                    author: {
                        connectOrCreate: {
                            where: { name: "Danilo" },
                            create: {
                                name: "Danilo",
                                slug: CreateSlug("Danilo"),
                            },
                        },
                    },
                    category: {
                        connectOrCreate: {
                            where: { name: "Suporte" },
                            create: {
                                name: "Suporte",
                                slug: CreateSlug("Suporte"),
                            },
                        },
                    },
                },
            }),
            prisma.books.create({
                data: {
                    title: "iHelp Front",
                    ISBN: "010001011",
                    slug: CreateSlug("iHelp Front"),
                    status: "AVAILABLE",
                    rating: 5,
                    author: {
                        connectOrCreate: {
                            where: { name: "Gabriel" },
                            create: {
                                name: "Gabriel",
                                slug: CreateSlug("Gabriel"),
                            },
                        },
                    },
                    category: {
                        connectOrCreate: {
                            where: { name: "Suporte" },
                            create: {
                                name: "Suporte",
                                slug: CreateSlug("Suporte"),
                            },
                        },
                    },
                },
            }),
            prisma.books.create({
                data: {
                    title: "iHelp FullStack",
                    ISBN: "010011011",
                    slug: CreateSlug("iHelp FullStack"),
                    status: "AVAILABLE",
                    rating: 5,
                    author: {
                        connectOrCreate: {
                            where: { name: "Danilo" },
                            create: {
                                name: "Danilo",
                                slug: CreateSlug("Danilo"),
                            },
                        },
                    },
                    category: {
                        connectOrCreate: {
                            where: { name: "Tecnologia" },
                            create: {
                                name: "Tecnologia",
                                slug: CreateSlug("Tecnologia"),
                            },
                        },
                    },
                },
            }),
        ]);
        console.log("  Books created successfully.\n");

        // Criando reservas
        console.log("\u2022 Creating reservations...");
        const user = await prisma.users.findFirst({ where: { email: "murilo.exp@gmail.com" } });
        const book = await prisma.books.findFirst({ where: { ISBN: "010001011" } });

        if (user && book) {
            await prisma.reservations.create({
                data: {
                    expiresAt: "3025-02-09T20:49:50.960Z",
                    status: "ACTIVE",
                    Users: {
                        connect: { id: user.id },
                    },
                    Books: {
                        connect: { id: book.id },
                    },
                },
            });
            console.log("  Reservations created successfully.\n");
        } else {
            console.warn("  Unable to create reservation: User or Book not found.\n");
        }

        console.log("\n=== Development Data Seeding Complete! ===\n");
    } catch (error) {
        console.error("\nError during seeding:\n", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
