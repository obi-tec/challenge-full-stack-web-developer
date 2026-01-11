import { PrismaClient } from '@prisma/client';
import { createUser } from '../factories/user.factory';

const prisma = new PrismaClient();

const main = async () => {
  console.log('Seeding database...');

  for (let i = 0; i < 10; i++) {
    await createUser();
  }

  console.log('Seeding finished.');
};

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
