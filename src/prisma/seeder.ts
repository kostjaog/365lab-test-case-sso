import { PrismaClient } from '@prisma/client';

const seeder = async () => {
  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: {
      email: 'user@user.com',
      name: 'Test User',
      password: 'qwertyt',
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      name: 'Test Admin',
      password: 'qwertyt',
    },
  });

  console.log({ user, admin });
};

seeder();
