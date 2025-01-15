import { prisma } from "../lib/prisma"
import { CreateSlug } from "../utils/create-slug"

interface IBookRepository {
     create(data: bookData): Promise<any>
     findAll(): Promise<any>
     findAllByFilter(filters: {}): Promise<any>
     findBySlug(slug: string): Promise<any>
}

interface bookData {
     title: string
     author: string
     category: string
     ISBN: string
     rating: number
}

class BookRespository implements IBookRepository {

     async create(data: bookData): Promise<any> {
          return await prisma.books.create({
               data: {
                    title: data.title,
                    slug: CreateSlug(data.title),
                    ISBN: data.ISBN,
                    rating: data.rating,
                    status: "AVAILABLE",
                    author: {
                         connectOrCreate: {
                              where: { name: data.author },
                              create: {
                                   name: data.author,
                                   slug: CreateSlug(data.author),
                              }
                         }
                    },
                    category: {
                         connectOrCreate: {
                              where: { name: data.category },
                              create: {
                                   name: data.category,
                                   slug: CreateSlug(data.category),
                              }
                         }
                    },
               }
          })
     }

     async findAll(): Promise<any> {
          return await prisma.books.findMany()
     }

     async findAllByFilter(filters: {}): Promise<any> {
          return await prisma.books.findMany({
               where: filters,
          });
     }

     async findBySlug(slug: string): Promise<any> {
          return await prisma.books.findUnique({ where: { slug } })
     }
}

export const bookRespository = new BookRespository()