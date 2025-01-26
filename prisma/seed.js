import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

async function main() {
  const testUser = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@admin.com",
      password: await bcryptjs.hash("pppppppp", SALT_ROUNDS),
    },
  });

  console.log({ testUser });
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
