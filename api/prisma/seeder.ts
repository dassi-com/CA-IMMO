import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const SALT_ROUNDS = 12;

const ADMIN_EMAIL = 'admin@immo.com';
const ADMIN_PASSWORD = 'Admin@2026';
const ADMIN_NAME = 'Administrateur Principal';

async function main() {
  console.log(' Début du seeder admin...');

  const existing = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existing) {
    console.log(`ℹ  L'administrateur "${ADMIN_EMAIL}" existe déjà.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);

  const admin = await prisma.user.create({
    data: {
      full_name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: Role.ADMIN,
      is_verified: true,
    },
  });

  console.log(` Administrateur créé avec succès :`);
  console.log(`   Email    : ${admin.email}`);
  console.log(`   Mot de passe : ${ADMIN_PASSWORD}`);
  console.log(`   Rôle    : ${admin.role}`);
}

main()
  .catch((e) => {
    console.error(' Erreur lors du seeder :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
