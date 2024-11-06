import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_PASSWORD || 'defaultpassword';
  const hashedPassword = await bcrypt.hash(password, 10);

  const alice = await prisma.user.upsert({
    where: { username: 'drhazem' },
    update: {},
    create: {
      username: 'drhazem',
      password: hashedPassword,
    },
  });

  // Replace console.log with a logging library if needed
  console.info('User created:', alice);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
