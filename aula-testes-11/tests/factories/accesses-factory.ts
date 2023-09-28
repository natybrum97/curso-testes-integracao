import prisma from "../../src/database"
import { UserInput } from "../../src/repository";

export async function createUser(email: string, password:string){
    
    return await prisma.user.create({
        data: {
          email,
          password
        }
      });
}

export function testeUser(email: string, password: string) {
    const user: UserInput = {
        email,
        password
    };
    return user;
}

export async function createManyUsers (userData: UserInput, email: string) {
    
    return await prisma.user.createMany({
        data: [{
          ...userData
        }, {
          ...userData, email
        }]
      });
}
