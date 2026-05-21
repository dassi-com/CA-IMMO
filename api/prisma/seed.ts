import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "superadmin@immo-platform.com";

  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existing) {
    console.log("Super admin already exists, skipping seed.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@12345", 12);

  await prisma.user.create({
    data: {
      full_name: "Super Admin",
      email: adminEmail,
      phone: "+237600000000",
      password: hashedPassword,
      role: "ADMIN",
      is_verified: true,
    },
  });

  console.log("Super admin created successfully.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
