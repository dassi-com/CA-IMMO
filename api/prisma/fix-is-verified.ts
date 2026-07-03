import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.user.updateMany({
    where: {
      is_verified: false,
      password: { not: null },
    },
    data: { is_verified: true },
  });

  console.log(`${result.count} utilisateur(s) mis à jour avec is_verified = true`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
