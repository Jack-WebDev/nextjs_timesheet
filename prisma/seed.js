import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
async function main() {
  const department_id = await prisma.department.create({
    data: {
      Department_Name: "H.R",
    },
  });

  await prisma.user.create({
    data: {
      Name: faker.person.firstName(),
      Surname: faker.person.lastName(),
      Email: faker.internet.email(),
      Position: "Administrator",
      departmentId: department_id.id,
      departmentName: "HR",
      Password: null,
      Role: "Admin",
      Address: faker.location.streetAddress(),
      City: faker.location.city(),
      ZipCode: faker.location.zipCode(),
      Province: "Gauteng",
      DateOfBirth: null,
      MaritalStatus: "Single",
      Gender: faker.person.gender(),
      Nationality: "South African",
      EmployeeType: "Full-Time",
      NDTEmail: "james@ndt.co.za",
      IdNumber: "1234567890123",
      MobileNumber: "1234567890",
      OfficeLocation: faker.location.streetAddress(),
      StartDate: faker.date.past(),
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
