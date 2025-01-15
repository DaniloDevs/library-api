import { prisma } from "../lib/prisma"

interface IUserRepository {
     create(data: userData): Promise<any>
     findByUsername(username: string): Promise<any>
}

interface userData {
     name: string
     email: string
     password: string
     username: string
}

class UserRepository implements IUserRepository {

     async create(data: userData): Promise<any> {
          return await prisma.users.create({
               data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    username: data.username
               }
          })
     }

     async findByUsername(username: string): Promise<any> {
          return await prisma.users.findUnique({ where: {  username } })
     }
}

export const userRepository = new UserRepository