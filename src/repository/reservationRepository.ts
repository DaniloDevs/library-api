import { prisma } from "../lib/prisma";
import { Reservations } from "@prisma/client";

// Tipos para dados de reserva
interface IReservationRepository {
     create(data: ReservationData): Promise<any>;
     cancel(id: string): Promise<any>;
     findAll(): Promise<any>;
     findAllByFilter(filters: ReservationFilter): Promise<any>;
     findById(id: string): Promise<any>;
}

interface ReservationData {
     bookId: string;
     userId: string;
     expiresAt: Date;
}

interface ReservationFilter {
     usersId?: string;
     booksId?: string;
}

// Classe de repositório
class ReservationRepository implements IReservationRepository {
     async create(data: ReservationData): Promise<any> {
          const [reservation] = await prisma.$transaction([
               prisma.reservations.create({
                    data: {
                         expiresAt: data.expiresAt,
                         status: "ACTIVE",
                         Users: {
                              connect: { id: data.userId },
                         },
                         Books: {
                              connect: { id: data.bookId },
                         },
                    },
               }),
               prisma.books.update({
                    where: { id: data.bookId },
                    data: { status: "RESERVED" },
               }),
          ]);

          return reservation;
     }

     async cancel(id: string): Promise<any> {
          return await prisma.reservations.update({
               where: { id },
               data: {
                    status: "CANCELLED",
                    Books: {
                         update: {
                              status: "AVAILABLE"
                         }
                    }
               }
          })
     } 

     async findAll(): Promise<any> {
          return await prisma.reservations.findMany({
               include: {
                    Users: true,
                    Books: true,
               },
          });
     }

     async findAllByFilter(filters: ReservationFilter): Promise<any> {
          return await prisma.reservations.findMany({
               where: filters,
               include: {
                    Users: true,
                    Books: true,
               },
          });
     }

     async findById(id: string): Promise<any> {
          return await prisma.reservations.findUnique({
               where: { id },
               include: {
                    Users: true,
                    Books: true,
               },
          });
     }
}

// Exporta o repositório
export const reservationRepository = new ReservationRepository();
