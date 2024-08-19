import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const SEED_MARKER_EMAIL = "seeded@marker.com";

async function main() {
  const seedMarker = await prisma.user.findUnique({
    where: { email: SEED_MARKER_EMAIL },
  });

  if (seedMarker) {
    console.log("Seed alread run");
    return;
  }

  const [pwd1, pwd2, pwd3] = await Promise.all([
    bcrypt.hash("iknownothing", 10),
    bcrypt.hash("something", 10),
    bcrypt.hash("anotheronebytes", 10),
  ]);

  const users = [
    {
      name: "John Snow",
      email: "johnsnow@email.com",
      password: pwd1,
    },
    {
      name: "Daenerys Targaryen",
      email: "dracarys@email.com",
      password: pwd2,
    },
    {
      name: "Mark Seeder",
      email: SEED_MARKER_EMAIL,
      password: pwd3,
    },
  ];

  await prisma.user.createMany({
    data: users,
  });

  const user = await prisma.user.findUnique({
    where: { email: users.at(0)?.email },
  });

  if (!user) {
    return;
  }

  await prisma.group.createMany({
    data: [
      {
        name: "Work",
        userId: user.id,
      },
      {
        name: "School",
        userId: user.id,
      },
      {
        name: "Church",
        userId: user.id,
      },
      {
        name: "Gym",
        userId: user.id,
      },
    ],
  });

  const groups = await prisma.group.findMany({ select: { id: true } });
  const groupsList = [null, ...groups.map((item) => item.id)];

  const today = new Date();
  const contactsData = Array.from({ length: 10 }).map((value, index) => {
    const birthday = faker.date.past({ years: 50 });
    birthday.setMonth(today.getMonth());
    birthday.setDate(today.getDate() + index);

    const groupIndex = Math.trunc(Math.random() * groupsList.length);
    const groupId = groupsList[groupIndex];

    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: faker.string.numeric("##########"),
      birthday: birthday.toISOString(), // Format as yyyy-mm-dd
      email: Math.random() > 0.5 ? faker.internet.email() : null, // Randomly assign email or leave as null
      ownerId: user.id,
      groupId,
    };
  });

  await prisma.contact.createMany({
    data: contactsData,
  });

  const contacts = await prisma.contact.findMany({
    orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
    take: 3,
  });

  const imagesFolder = path.resolve(__dirname, "..", "static", "images");
  const imageData = await Promise.all(
    contacts.map((contact, index) => {
      const imagePath = path.resolve(imagesFolder, `profile-${index}.webp`);
      return fs.readFile(imagePath);
    })
  );

  const contactPhotoData = contacts.map((contact, index) => ({
    mimeType: "image/webp",
    photoData: imageData[index],
    contactId: contact.id,
  }));

  await prisma.contactPhoto.createMany({
    data: contactPhotoData,
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
