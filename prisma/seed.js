import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const department_id = await prisma.department.create({
    data: {
      Department_Name: "I.T",
    },
  });

  await prisma.user.create({
    data: {
      Name: "Jack",
      Surname: "Mabaso",
      Email: "jack@ndt.co.za",
      Position: "Employee",
      departmentId: department_id.id,
      departmentName: "I.T",
      Status: "Active",
      Password: "",
      Role: "Employee",
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
