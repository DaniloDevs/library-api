import { prisma } from "../lib/prisma"

interface IReservationRepository {
     create(data: reservationData): Promise<any>
     cancel(id: string): Promise<any>
     findAll(): Promise<any>
     findAllByFilter(filters: {}): Promise<any>
     findById(id: string): Promise<any>
}

interface reservationData {
     bookId: string
     userId: string
     expiresAt: Date
}


class ReservationRepository implements IReservationRepository {

     async create(data: reservationData): Promise<any> {
          const [reserved] = await prisma.$transaction([
               prisma.reservations.create({
                    data: {
                         expiresAt: data.expiresAt,
                         status: "ACTIVE",
                         Users: {
                              connect: { id: data.userId }
                         },
                         Books: {
                              connect: {
                                   id: data.bookId,
                              },

                         }
                    },
               }),
               prisma.books.update({
                    where: { id: data.bookId },
                    data: { status: "RESERVED" }
               })
          ])

          return reserved
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
          return await prisma.reservations.findMany()
     }

     async findAllByFilter(filters: {}): Promise<any> {
          return await prisma.reservations.findMany({
               where: filters,
          })
     }

     async findById(id: string): Promise<any> {
          return await prisma.reservations.findUnique({ where: { id } })
     }
}

export const reservationRepository = new ReservationRepository()