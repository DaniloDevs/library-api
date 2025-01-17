import { prisma } from "../src/lib/prisma";
import { CreateSlug } from "../src/utils/create-slug";
import { randomUUID } from "node:crypto";
import CreateUniqueCode from "../src/utils/create-unique-id";

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
            prisma.users.create({
                data: {
                    name: "Jhon Sena",
                    email: "sena.exp@gmail.com",
                    password: "123",
                    username: "sesese",
                },
            }),
            prisma.users.create({
                data: {
                    name: "Carlos Silva",
                    email: "carlos.exp@gmail.com",
                    password: "123",
                    username: "carlcarl",
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
            prisma.books.create({
                data: {
                    title: "iHelp Mobile",
                    ISBN: "010011111",
                    slug: CreateSlug("iHelp Mobile"),
                    status: "AVAILABLE",
                    rating: 5,
                    author: {
                        connectOrCreate: {
                            where: { name: "Carlos" },
                            create: {
                                name: "Carlos",
                                slug: CreateSlug("Carlos"),
                            },
                        },
                    },
                    category: {
                        connectOrCreate: {
                            where: { name: "Aplicativos" },
                            create: {
                                name: "Aplicativos",
                                slug: CreateSlug("Aplicativos"),
                            },
                        },
                    },
                },
            }),
        ]);
        console.log("  Books created successfully.\n");

        // Criando reservas
        console.log("\u2022 Creating reservations...");
        const [user1, user2, user3, user4] = await prisma.$transaction([
            prisma.users.findFirst({ where: { email: "murilo.exp@gmail.com" } }),
            prisma.users.findFirst({ where: { email: "danilo.exp@gmail.com" } }),
            prisma.users.findFirst({ where: { email: "sena.exp@gmail.com" } }),
            prisma.users.findFirst({ where: { email: "carlos.exp@gmail.com" } }),
        ]);

        const [book1, book2, book3, book4] = await prisma.$transaction([
            prisma.books.findFirst({ where: { ISBN: "010001011" } }),
            prisma.books.findFirst({ where: { ISBN: "010011011" } }),
            prisma.books.findFirst({ where: { ISBN: "010001000" } }),
            prisma.books.findFirst({ where: { ISBN: "010011111" } }),
        ]);

        if (user1 && book1 && user2 && book2 && user3 && book3 && user4 && book4) {
            const currentDate = new Date();
            const expiresAt = new Date();
            expiresAt.setDate(currentDate.getDate() + 30);

            await prisma.$transaction([
                prisma.reservations.create({
                    data: {
                        expiresAt,
                        status: "ACTIVE",
                        loanCode: CreateUniqueCode(randomUUID()),
                        Users: {
                            connect: { id: user1.id },
                        },
                        Books: {
                            connect: { id: book1.id },
                        },
                    },
                }),
                prisma.reservations.create({
                    data: {
                        expiresAt,
                        status: "ACTIVE",
                        loanCode: CreateUniqueCode(randomUUID()),
                        Users: {
                            connect: { id: user2.id },
                        },
                        Books: {
                            connect: { id: book2.id },
                        },
                    },
                }),
                prisma.reservations.create({
                    data: {
                        expiresAt,
                        status: "ACTIVE",
                        loanCode: CreateUniqueCode(randomUUID()),
                        Users: {
                            connect: { id: user4.id },
                        },
                        Books: {
                            connect: { id: book4.id },
                        },
                    },
                }),
            ]);
            console.log("  Reservations created successfully.\n");
        } else {
            console.warn("  Unable to create reservations: Some users or books not found.\n");
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
