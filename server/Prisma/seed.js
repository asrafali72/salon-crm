const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const roles = [
    {
      name: "OWNER",
      description: "Full business access",
    },
    {
      name: "ADMIN",
      description: "Business administration",
    },
    {
      name: "RECEPTIONIST",
      description: "Front desk and customer operations",
    },
    {
      name: "STYLIST",
      description: "Service execution and schedule",
    },
    {
      name: "ASSISTANT",
      description: "Assigned operational tasks",
    },
    {
      name: "CUSTOMER",
      description: "Customer portal access",
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role.name,
      },
      update: {
        description: role.description,
      },
      create: role,
    });
  }

  console.log("Roles seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });