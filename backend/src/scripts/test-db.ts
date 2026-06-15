import { prisma } from "../config/db.js";

async function main() {
  const participants = await prisma.participant.findMany();
  console.log("participants:", participants);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
