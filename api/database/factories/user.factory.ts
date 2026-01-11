import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient();

export const createUser = async (): Promise<User> => {
    return prisma.user.create({
        data: {
            uuid: uuidv4(),
            email: faker.internet.email(),
            name: faker.person.fullName(),
        },
    });
};
