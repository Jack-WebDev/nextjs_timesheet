import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const department_id = await prisma.department.create({
    data: {
      Department_Name: "H.R",
    },
  });

  await prisma.user.create({
    data: {
      Name: "James",
      Surname: "Dunn",
      Email: "james@ndt.co.za",
      Position: "Admin",
      departmentId: department_id.id,
      departmentName: "H.R",
      Status: "Active",
      Password: "",
      Role: "Admin",
    },
  });
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
